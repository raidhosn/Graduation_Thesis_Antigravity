import React from "react";
import { chapterSubsections } from "./useTocNavigation";
import { ensureAnchorTarget } from "./tocAnchorUtils";

// Debug mode flag - set to true for verbose console logging
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// All expected anchor IDs with their chapter mapping
export interface AnchorDefinition {
  id: string;
  type: 'chapter' | 'subsection';
  chapterId: number;
  labelKey: string;
}

/**
 * Build the complete registry of expected anchors from chapterSubsections.
 * If chapterId is provided, only includes that chapter + its subsections.
 */
export const buildAnchorRegistry = (chapterId?: number): AnchorDefinition[] => {
  const registry: AnchorDefinition[] = [];

  // Chapter anchors
  if (chapterId) {
    registry.push({
      id: `chapter-${chapterId}`,
      type: "chapter",
      chapterId,
      labelKey: `thesis:chapters.chapter${chapterId}.title`,
    });
  } else {
    for (let i = 1; i <= 8; i++) {
      registry.push({
        id: `chapter-${i}`,
        type: "chapter",
        chapterId: i,
        labelKey: `thesis:chapters.chapter${i}.title`,
      });
    }
  }

  // Subsection anchors from chapterSubsections
  const entries = chapterId
    ? ([[String(chapterId), chapterSubsections[chapterId] ?? []]] as const)
    : (Object.entries(chapterSubsections) as [string, { id: string; labelKey: string }[]][]);

  for (const [chapterIdStr, subs] of entries) {
    const chId = parseInt(chapterIdStr);
    for (const sub of subs) {
      registry.push({
        id: sub.id,
        type: "subsection",
        chapterId: chId,
        labelKey: sub.labelKey,
      });
    }
  }

  return registry;
};

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  anchorCount: number;
  missingAnchors: string[];
  duplicateAnchors: string[];
  orphanedAnchors: string[];
}

export interface ValidationError {
  type: 'MISSING_ANCHOR' | 'DUPLICATE_ANCHOR' | 'ORPHANED_TOC' | 'SCROLL_FAILED';
  anchorId: string;
  message: string;
}

export interface ValidationWarning {
  type: 'ANCHOR_NOT_VISIBLE' | 'SCROLL_RETRY';
  anchorId: string;
  message: string;
}

/**
 * Validate all anchors exist in the DOM
 * Call this after chapter content has rendered
 */
export const validateAnchors = (
  containerRef?: React.RefObject<HTMLElement>,
  chapterId?: number
): ValidationResult => {
  const registry = buildAnchorRegistry(chapterId);
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const missingAnchors: string[] = [];
  const duplicateAnchors: string[] = [];
  const orphanedAnchors: string[] = [];
  
  // Check each expected anchor exists (and eagerly bind deterministic IDs when possible)
  const containerEl = containerRef?.current ?? null;

  for (const anchor of registry) {
    if (containerEl && !document.getElementById(anchor.id)) {
      ensureAnchorTarget(anchor.id, containerEl);
    }

    const elements = document.querySelectorAll(`#${CSS.escape(anchor.id)}`);

    if (elements.length === 0) {
      missingAnchors.push(anchor.id);
      errors.push({
        type: 'MISSING_ANCHOR',
        anchorId: anchor.id,
        message: `Anchor "${anchor.id}" (${anchor.type} in chapter ${anchor.chapterId}) not found in DOM`,
      });
    } else if (elements.length > 1) {
      duplicateAnchors.push(anchor.id);
      errors.push({
        type: 'DUPLICATE_ANCHOR',
        anchorId: anchor.id,
        message: `Duplicate anchor "${anchor.id}" found ${elements.length} times`,
      });
    }
  }
  
  // Find orphaned anchors (IDs in DOM that don't match our registry)
  const container = containerRef?.current || document;
  const allIdsInContainer = container.querySelectorAll('[id]');
  const registryIds = new Set(registry.map(a => a.id));
  
  allIdsInContainer.forEach((el) => {
    const id = el.id;
    // Only check thesis-related IDs (chapter-* or X-Y-* pattern)
    if ((id.startsWith('chapter-') || /^\d+-\d+/.test(id)) && !registryIds.has(id)) {
      orphanedAnchors.push(id);
      warnings.push({
        type: 'ANCHOR_NOT_VISIBLE',
        anchorId: id,
        message: `Orphaned anchor "${id}" found in DOM but not in registry`,
      });
    }
  });
  
  const result: ValidationResult = {
    valid: errors.length === 0,
    errors,
    warnings,
    anchorCount: registry.length,
    missingAnchors,
    duplicateAnchors,
    orphanedAnchors,
  };
  
  if (DEBUG_MODE) {
    if (result.valid) {
      console.log(`[TOC Validation] ✅ All ${result.anchorCount} anchors validated successfully`);
    } else {
      console.error('[TOC Validation] ❌ Validation failed:', result);
      result.errors.forEach(err => console.error(`  - ${err.type}: ${err.message}`));
    }
  }
  
  return result;
};

/**
 * Verify a target heading is visible within the reading panel viewport
 * Returns true if the heading is within acceptable bounds
 */
export const verifyScrollPosition = (
  anchorId: string,
  containerRef: React.RefObject<HTMLElement>,
  tolerance: number = 30
): { visible: boolean; offset: number } => {
  const element = document.getElementById(anchorId);
  const container = containerRef.current;
  
  if (!element || !container) {
    return { visible: false, offset: Infinity };
  }
  
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  // Calculate offset from where the heading should be (top of container + header offset)
  const expectedTop = containerRect.top + 100; // HEADER_OFFSET
  const actualTop = elementRect.top;
  const offset = actualTop - expectedTop;
  
  // Visible if within tolerance of expected position
  const visible = Math.abs(offset) <= tolerance;
  
  if (DEBUG_MODE && !visible) {
    console.warn(`[TOC Validation] Scroll position check for "${anchorId}": offset=${offset}px (tolerance: ±${tolerance}px)`);
  }
  
  return { visible, offset };
};

/**
 * Assert scroll succeeded, throw if not
 */
export const assertScrollSuccess = (
  anchorId: string,
  containerRef: React.RefObject<HTMLElement>
): void => {
  const { visible, offset } = verifyScrollPosition(anchorId, containerRef);
  
  if (!visible) {
    const error = new Error(
      `[TOC Navigation Critical Error] Scroll to "${anchorId}" failed. Target heading not visible at expected position (offset: ${offset}px). This is a critical navigation bug.`
    );
    
    if (DEBUG_MODE) {
      console.error(error);
    }
    
    // In production, we log but don't throw to avoid breaking UX
    // In development, we throw to catch bugs early
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
  }
};

/**
 * Log navigation event for debugging
 */
export const logNavigationEvent = (
  type: 'chapter' | 'subsection' | 'deeplink',
  anchorId: string,
  success: boolean
): void => {
  if (DEBUG_MODE) {
    const icon = success ? '✅' : '❌';
    console.log(`[TOC Navigation] ${icon} ${type} navigation to "${anchorId}" ${success ? 'succeeded' : 'failed'}`);
  }
};

/**
 * Get the chapter ID from any anchor ID
 */
export const getChapterFromAnchor = (anchorId: string): number | null => {
  // Check if it's a chapter anchor
  const chapterMatch = anchorId.match(/^chapter-(\d+)$/);
  if (chapterMatch) {
    return parseInt(chapterMatch[1]);
  }
  
  // Check subsections
  for (const [chapterIdStr, subs] of Object.entries(chapterSubsections)) {
    if (subs.some(sub => sub.id === anchorId)) {
      return parseInt(chapterIdStr);
    }
  }
  
  return null;
};

export default {
  buildAnchorRegistry,
  validateAnchors,
  verifyScrollPosition,
  assertScrollSuccess,
  logNavigationEvent,
  getChapterFromAnchor,
};
