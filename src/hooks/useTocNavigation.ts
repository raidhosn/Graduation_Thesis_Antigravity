import React from "react";
import { useNavigate } from "react-router-dom";
import { ensureAnchorTarget } from "./tocAnchorUtils";

// Debug mode flag
const DEBUG_MODE = process.env.NODE_ENV === 'development';

// Subsection definitions with stable anchor IDs for all chapters
export const chapterSubsections: Record<number, { id: string; labelKey: string }[]> = {
  1: [
    { id: "1-1-cyberspace", labelKey: "indice.chapter1.s1" },
    { id: "1-2-space", labelKey: "indice.chapter1.s2" },
    { id: "1-3-cybertime", labelKey: "indice.chapter1.s3" },
  ],
  2: [
    { id: "2-1-brief-history", labelKey: "indice.chapter2.s1" },
    { id: "2-2-definitions", labelKey: "indice.chapter2.s2" },
    // NOTE: The current chapter content only contains a single 2.2.1 subsection.
    // We map it to the existing body heading to keep a strict one-to-one contract.
    { id: "2-2-1-immersion", labelKey: "indice.chapter2.s3" },
  ],
  3: [
    { id: "3-1-simulation-vr", labelKey: "indice.chapter3.s1" },
    { id: "3-2-projection-vr", labelKey: "indice.chapter3.s2" },
    { id: "3-3-augmented-reality", labelKey: "indice.chapter3.s3" },
    { id: "3-4-physical-devices", labelKey: "indice.chapter3.s4" },
    { id: "3-5-telepresence", labelKey: "indice.chapter3.s5" },
    { id: "3-6-visually-coupled-displays", labelKey: "indice.chapter3.s6" },
    { id: "3-7-desktop-vr", labelKey: "indice.chapter3.s7" },
    { id: "3-8-hypertext", labelKey: "indice.chapter3.s8" },
    // Current content uses 3.9 for Cyborg; we keep deterministic anchor IDs.
    { id: "3-9-cyborg", labelKey: "indice.chapter3.s10" },
  ],
  4: [
    { id: "4-1-visual-devices", labelKey: "indice.chapter4.s1" },
    { id: "4-2-tracking-systems", labelKey: "indice.chapter4.s2" },
    { id: "4-3-image-processing", labelKey: "indice.chapter4.s3" },
    { id: "4-4-input-devices", labelKey: "indice.chapter4.s4" },
  ],
  5: [
    { id: "5-1-biopsychosocial", labelKey: "indice.chapter5.s1" },
    { id: "5-2-medicine", labelKey: "indice.chapter5.s2" },
    { id: "5-3-architecture", labelKey: "indice.chapter5.s3" },
    { id: "5-4-art", labelKey: "indice.chapter5.s4" },
    { id: "5-5-business", labelKey: "indice.chapter5.s5" },
    { id: "5-6-disabilities", labelKey: "indice.chapter5.s6" },
    { id: "5-7-education", labelKey: "indice.chapter5.s7" },
    { id: "5-8-engineering", labelKey: "indice.chapter5.s8" },
    { id: "5-9-entertainment", labelKey: "indice.chapter5.s9" },
    { id: "5-10-marketing", labelKey: "indice.chapter5.s10" },
    { id: "5-11-military", labelKey: "indice.chapter5.s11" },
    { id: "5-12-religion", labelKey: "indice.chapter5.s12" },
    { id: "5-13-sex", labelKey: "indice.chapter5.s13" },
    { id: "5-14-virtual-communities", labelKey: "indice.chapter5.s14" },
    { id: "5-15-virtual-cycling", labelKey: "indice.chapter5.s15" },
  ],
};

// Offset for sticky header (in pixels)
const HEADER_OFFSET = 100;

// Maximum scroll retries
const MAX_RETRIES = 3;

// Tolerance for scroll position verification (pixels)
const SCROLL_TOLERANCE = 30;

export interface ScrollResult {
  success: boolean;
  anchorId: string;
  retries: number;
  finalOffset: number;
}

/**
 * Scroll to an element within a container with offset for sticky header.
 * Uses container-aware scrolling for split-view layouts.
 * Returns a promise that resolves with the scroll result.
 */
export const scrollToAnchorWithOffset = (
  anchorId: string,
  containerRef?: React.RefObject<HTMLElement>,
  options?: { skipHashUpdate?: boolean; skipFocus?: boolean }
): Promise<ScrollResult> => {
  return new Promise((resolve) => {
    const container = containerRef?.current;

    // STRICT: window-level scrolling is forbidden.
    if (!container) {
      if (DEBUG_MODE) {
        console.error(
          `[TOC Navigation] ❌ CRITICAL: No reading panel container ref provided for "${anchorId}" (window scroll forbidden)`
        );
      }
      resolve({ success: false, anchorId, retries: 0, finalOffset: Infinity });
      return;
    }

    // If the anchor is missing, try to deterministically bind it to its heading (by numeric prefix).
    let element = document.getElementById(anchorId);
    if (!element) {
      element = ensureAnchorTarget(anchorId, container);
    }

    if (!element) {
      if (DEBUG_MODE) {
        console.error(`[TOC Navigation] ❌ CRITICAL: Anchor "${anchorId}" not found in DOM`);
      }
      resolve({ success: false, anchorId, retries: 0, finalOffset: Infinity });
      return;
    }

    let totalRetries = 0;

    const scrollWithRetry = (retries = MAX_RETRIES) => {
      // Container-aware scrolling for split-view
      const containerRect = container.getBoundingClientRect();
      const elementRect = element!.getBoundingClientRect();
      const currentScroll = container.scrollTop;
      const targetScroll =
        currentScroll + (elementRect.top - containerRect.top) - HEADER_OFFSET;

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });

      // Verify scroll position after animation
      setTimeout(() => {
        const newElementRect = element!.getBoundingClientRect();
        const expectedTop = containerRect.top + HEADER_OFFSET;
        const offset = newElementRect.top - expectedTop;
        const diff = Math.abs(offset);

        if (diff > SCROLL_TOLERANCE && retries > 0) {
          totalRetries++;
          if (DEBUG_MODE) {
            console.warn(
              `[TOC Navigation] ⚠️ Scroll to "${anchorId}" off by ${offset.toFixed(
                0
              )}px, retrying (${retries - 1} left)`
            );
          }
          scrollWithRetry(retries - 1);
        } else {
          const success = diff <= SCROLL_TOLERANCE;
          if (DEBUG_MODE) {
            if (success) {
              console.log(
                `[TOC Navigation] ✅ Scroll to "${anchorId}" successful (offset: ${offset.toFixed(
                  0
                )}px, retries: ${totalRetries})`
              );
            } else {
              console.error(
                `[TOC Navigation] ❌ Scroll to "${anchorId}" failed after ${MAX_RETRIES} retries (final offset: ${offset.toFixed(
                  0
                )}px)`
              );
            }
          }
          resolve({
            success,
            anchorId,
            retries: totalRetries,
            finalOffset: offset,
          });
        }
      }, 350);
    };

    scrollWithRetry();

    // Update URL hash without jumping (unless skipped)
    if (!options?.skipHashUpdate) {
      window.history.replaceState(null, "", `#${anchorId}`);
    }

    // Focus the element for accessibility (unless skipped)
    if (!options?.skipFocus) {
      try {
        element.focus({ preventScroll: true });
      } catch {
        // If not focusable, silently ignore; strict focusability is enforced by ensureAnchorTarget.
      }
    }
  });
};

/**
 * Hook for TOC navigation
 */
export const useTocNavigation = (currentLang: string) => {
  const navigate = useNavigate();

  /**
   * Navigate to a chapter's top
   */
  const navigateToChapter = (chapterId: number) => {
    navigate(`/${currentLang}/thesis#chapter-${chapterId}`);
  };

  /**
   * Navigate to a specific subsection within a chapter
   */
  const navigateToSubsection = (chapterId: number, anchorId: string) => {
    navigate(`/${currentLang}/thesis#${anchorId}`);
  };

  /**
   * Handle in-page anchor scroll (when already on thesis page)
   */
  const scrollToAnchor = (anchorId: string) => {
    scrollToAnchorWithOffset(anchorId);
  };

  return {
    navigateToChapter,
    navigateToSubsection,
    scrollToAnchor,
    chapterSubsections,
  };
};

export default useTocNavigation;
