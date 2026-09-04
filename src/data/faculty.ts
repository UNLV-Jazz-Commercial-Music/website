/**
 * J&CM faculty.
 *
 * DATA LIVES IN `src/content/faculty.json`, not here. That file is what the CMS
 * reads and writes. This file only supplies types and loads it.
 *
 * SOURCE: the official UNLV School of Music directory,
 * https://www.unlv.edu/music/faculty-staff — read 2026-09-03, plus corrections
 * from Jaxon. Titles and instrument assignments are as UNLV lists them.
 *
 * WHY THERE ARE NO BIOS
 * Bios link out to that directory rather than being copied in. This is
 * deliberate: one authoritative source that UNLV maintains beats a copy of ours
 * that quietly drifts out of date. The old Weebly site linked bios to Google
 * Drive documents, which was fragile and inconsistent — the fix for two sources
 * that disagree is not a third one. Do not "improve" this by pasting bios in.
 *
 * NO INDIVIDUAL EMAIL ADDRESSES, either. UNLV publishes them, but republishing
 * them here just adds another surface for address harvesters and another thing
 * to maintain. General enquiries go to jazz@unlv.edu.
 *
 * DELIBERATE OMISSIONS — do not re-add without checking:
 * - **Tom Warrington** (Professor Emeritus) is on the UNLV directory but is no
 *   longer active with the program.
 * - **Gil Kaupp** appears in the program's own concert-program faculty listing
 *   but is under Audio Production, not J&CM.
 * - **Gabriel Carpenter** is a DMA student in the program hired as a Part-Time
 *   Instructor to direct Jazz Ensemble II. He is credited as a director on the
 *   Ensembles page, which is accurate, but he is not on the UNLV faculty
 *   directory this page's bio link points to.
 *
 * James Anderson (Jazz Violin) IS faculty — confirmed by Jaxon — though he
 * appears under the program's own listing rather than under J&CM on the UNLV
 * directory, so the bio link may not resolve to him.
 */

import data from '../content/faculty.json';

export interface FacultyMember {
  name: string;
  /** Post-nominals as UNLV lists them, e.g. "M.M." */
  credentials?: string;
  /** Title, or the instruments and ensembles they teach. */
  role: string;
}

export const professors: FacultyMember[] = data.professors;
export const adjunct: FacultyMember[] = data.adjunct;

/** Where full bios live. Single authoritative source, maintained by UNLV. */
export const DIRECTORY_URL = 'https://www.unlv.edu/music/faculty-staff';
