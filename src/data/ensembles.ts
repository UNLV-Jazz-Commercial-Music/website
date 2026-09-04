/**
 * The active ensembles.
 *
 * DATA LIVES IN `src/content/ensembles.json`, not here. That file is what the
 * CMS reads and writes, so faculty can edit descriptions without touching code.
 * This file only supplies types and loads it.
 *
 * Audience for this page is DONORS and CONCERT-GOERS, not prospective students.
 * Descriptions say what a group is and what it sounds like. Audition and
 * admissions questions are referred to unlv.edu/music rather than answered here.
 *
 * `name` must match the ensemble names used in the events Sheet EXACTLY — that
 * string is how each ensemble finds its own upcoming performances. If you rename
 * one, rename it in the Sheet's dropdown too.
 *
 * Inactive ensembles are deliberately absent: Jazz Ensemble III, Jazz Guitar
 * Ensemble, and Harmon Avenue Jazz Vocal Ensemble are on hold for enrollment and
 * may return. Add them back when they do.
 */

import data from '../content/ensembles.json';

export interface Ensemble {
  /** Must match the events Sheet exactly. */
  name: string;
  directors: string[];
  description: string;
  /** Optional. Blank `src` means no photo — the page renders without one. */
  photo?: { src: string; alt: string };
}

export const ensembles: Ensemble[] = data.ensembles;
