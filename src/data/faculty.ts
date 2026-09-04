/**
 * J&CM faculty.
 *
 * SOURCE: the official UNLV School of Music directory,
 * https://www.unlv.edu/music/faculty-staff — read 2026-09-03. Titles and
 * instrument assignments are as UNLV lists them.
 *
 * WHY THERE ARE NO BIOS HERE
 * Bios link out to that directory rather than being copied in. This is
 * deliberate (Jaxon's call): one authoritative source that UNLV maintains beats
 * a copy of ours that quietly drifts out of date. The old Weebly site linked
 * bios to Google Drive documents, which was fragile and inconsistent — the fix
 * for two sources that disagree is not a third one. Do not "improve" this by
 * pasting bios in.
 *
 * NO INDIVIDUAL EMAIL ADDRESSES, either. UNLV publishes them, but republishing
 * them here just adds another surface for address harvesters and another thing
 * to maintain. General enquiries go to jazz@unlv.edu; anyone needing a specific
 * person can reach them through the directory.
 */

export interface FacultyMember {
  name: string;
  /** Post-nominals as UNLV lists them, e.g. "M.M." */
  credentials?: string;
  /** Title, or the instruments and ensembles they teach. */
  role: string;
}

export const professors: FacultyMember[] = [
  {
    name: 'David Loeb',
    credentials: 'M.M.',
    role: 'David Mulkey MD and Laura Taylor Mulkey Endowed Chair of Jazz and Commercial Music',
  },
  {
    name: 'Nathan Tanouye',
    credentials: 'M.M.',
    role: 'Professor of Jazz and Commercial Music, Studio Trombone · Area Co-coordinator',
  },
  {
    name: 'Adam Schroeder',
    credentials: 'M.M.',
    role: 'Associate Professor · Area Co-coordinator · Saxophone, Improvisation, Jazz Combos',
  },
];

/**
 * Tom Warrington (Professor Emeritus) was removed 2026-09-03: he appears on the
 * UNLV directory but is no longer active with the program, per Jaxon. Emeritus
 * faculty are not listed for that reason — don't re-add from the directory
 * without checking.
 *
 * Gabriel Carpenter is also deliberately absent. He is a DMA student in the
 * program hired as a Part-Time Instructor to direct Jazz Ensemble II, so he is
 * credited as a director on the Ensembles page, which is accurate. He is not on
 * the UNLV faculty directory that this page's bio link points to, and he is not
 * in the program's own concert-program faculty listing either.
 */

export const adjunct: FacultyMember[] = [
  // Confirmed by Jaxon 2026-09-03. Appears in the program's own concert-program
  // faculty listing but not under J&CM on the UNLV directory, so the bio link
  // may not resolve to him.
  { name: 'James Anderson', role: 'Jazz Violin' },
  { name: 'Steve Flora', credentials: 'B.M.', role: 'Jazz Bass' },
  { name: 'Gary Fowler', role: 'Jazz Voice, Vocal Jazz Ensembles' },
  { name: 'Uli Geissendoerfer', role: 'Jazz Piano' },
  { name: 'Jose “Pepe” Jimenez', role: 'Jazz Drums and Percussion, Latin Jazz Ensemble' },
  { name: 'Rick Keller', role: 'Music Technology, Jazz Saxophone, Jazz Composition' },
  { name: 'Jake Langley', role: 'Jazz Guitar' },
  { name: 'Peter Margulies', role: 'Jazz Trumpet' },
  { name: 'Carlos Mata', role: 'Jazz Composition, Jazz Saxophone' },
  { name: 'Lara Vivian Smith', role: 'Jazz Voice, Vocal Jazz Ensembles' },
  {
    name: 'Julian Tanaka',
    role: 'Jazz Composition, Jazz Saxophone, Contemporary Jazz Ensemble',
  },
  { name: 'JoBelle Yonely', role: 'Jazz Voice' },
];

/** Where full bios live. Single authoritative source, maintained by UNLV. */
export const DIRECTORY_URL = 'https://www.unlv.edu/music/faculty-staff';
