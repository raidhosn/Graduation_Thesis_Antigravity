// Utilities for deterministic TOC anchor enforcement inside a scroll container

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Converts an anchor id like "2-2-1-interaction" into a numeric prefix like "2.2.1".
 * Returns null for non-numeric anchors like "chapter-2".
 */
export const getNumericPrefixFromAnchorId = (anchorId: string): string | null => {
  const parts = anchorId.split("-");
  const numericParts: string[] = [];

  for (const part of parts) {
    if (/^\d+$/.test(part)) numericParts.push(part);
    else break;
  }

  // We only treat subsection-style anchors as numeric prefixes (e.g. 2-1-..., 3-4-...)
  if (numericParts.length < 2) return null;
  return numericParts.join(".");
};

export const findHeadingByNumericPrefix = (
  container: HTMLElement,
  numericPrefix: string
): HTMLElement | null => {
  const headings = Array.from(
    container.querySelectorAll<HTMLElement>("h2,h3,h4,h5,h6")
  );

  const re = new RegExp(`^${escapeRegExp(numericPrefix)}(\\.|\\b)`);

  const matches = headings.filter((h) => re.test((h.textContent ?? "").trim()));
  if (matches.length !== 1) return null;

  return matches[0];
};

/**
 * If a heading exists for the numeric prefix, ensure it has the expected id + is focusable.
 * Never overwrites an existing, different id.
 */
export const ensureAnchorTarget = (
  anchorId: string,
  container: HTMLElement
): HTMLElement | null => {
  const numericPrefix = getNumericPrefixFromAnchorId(anchorId);
  if (!numericPrefix) return null;

  const heading = findHeadingByNumericPrefix(container, numericPrefix);
  if (!heading) return null;

  if (heading.id && heading.id !== anchorId) {
    // Duplicate / conflicting IDs are treated as a hard error upstream.
    return null;
  }

  heading.id = anchorId;
  if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");

  return heading;
};
