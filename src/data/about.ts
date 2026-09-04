/**
 * About page content.
 *
 * DATA LIVES IN `src/content/about.json`, edited from the CMS. This file only
 * supplies types and loads it.
 *
 * WHY IT'S SHAPED THIS WAY
 * The prose is plain text fields, not Markdown. Markdown would need a renderer
 * dependency, and almost nothing here needs formatting — it's paragraphs and
 * name lists. Plain text keeps the site dependency-light and means an editor
 * cannot accidentally break the layout with stray syntax.
 *
 * The long name lists stay structured rather than folded into prose, for two
 * reasons: they render in columns behind a disclosure toggle (the original 2025
 * press release had all fifty names in one paragraph, which the audit flagged
 * as a wall of text), and structured entries are easy to add one at a time.
 *
 * `downbeatAwards` is its own number field on purpose. It was 52 in the 2025
 * press release and is 53 after the 2026 win — so when the program wins again,
 * updating it is changing one number in a form rather than hunting through a
 * sentence.
 *
 * Any text field may contain blank lines to make multiple paragraphs, and
 * *asterisks* for italics. Both are handled by src/lib/text.ts.
 */

import data from '../content/about.json';

export interface Degree {
  level: string;
  programs: string;
}

export interface AboutContent {
  lede: string;
  degrees: Degree[];
  curriculumNote: string;
  downbeatAwards: number;
  downbeatNote: string;
  otherRecognition: string;
  touringNote: string;
  stages: string[];
  guestArtistsNote: string;
  guestArtists: string[];
  vegasNote: string;
  vegasArtists: string[];
  alumniNote: string;
  alumni: string[];
  alumniClosing: string;
}

export const about: AboutContent = data;
