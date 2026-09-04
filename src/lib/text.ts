/**
 * Text helpers for rendering CMS prose.
 *
 * Kept here rather than beside the content loaders on purpose: these are pure
 * functions with no data imports, so `npm test` can exercise them directly in
 * plain Node. Anything importing a .json file can't be tested that way without
 * an import attribute Vite doesn't use.
 */

/**
 * Split a text field into paragraphs on blank lines, so an editor can write
 * more than one paragraph in a single CMS box without needing Markdown.
 */
export const paragraphs = (text: string): string[] =>
  text
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Convert *asterisks* to italics, and nothing else.
 *
 * This exists for one reason: album and magazine titles belong in italics, and
 * the About page names several — *DownBeat*, *JazzTimes*, *Double or Nothing*.
 * Plain text can't express that, and pulling in a Markdown renderer to
 * italicise three words would be a dependency this site would carry for a
 * decade.
 *
 * HTML is escaped FIRST, so content coming from the CMS can never inject markup
 * — only the emphasis this function adds survives. It deliberately supports no
 * other syntax: an editor can't break the layout with a stray character, and
 * there's exactly one rule to explain at handoff.
 */
export const inlineEmphasis = (text: string): string =>
  escapeHtml(text).replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
