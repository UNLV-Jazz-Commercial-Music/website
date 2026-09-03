/**
 * Organizations that support the program, recognized on the Support page.
 *
 * INCOMPLETE — Jaxon is supplying the full list. The two below are the only ones
 * confirmed so far. Add the rest as they come in; the page handles any number.
 *
 * Get these names exactly right. A recognition page that misspells a donor's
 * name is worse than no recognition page. Where an organization has a website,
 * add it — linking out is a courtesy donors notice.
 */

export interface Supporter {
  name: string;
  url?: string;
  /** Optional one-line description of what they support. */
  note?: string;
}

export const supporters: Supporter[] = [
  {
    // Spelling per Jaxon 2026-09-03. Worth double-checking against the
    // foundation's own materials — it may render as "Every Day" (two words),
    // after the Joe Williams recording "Every Day I Have the Blues".
    name: 'Joe Williams Everyday Foundation',
  },
  {
    name: 'UNLV Friends of Jazz',
  },
];
