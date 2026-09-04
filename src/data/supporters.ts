/**
 * Special Thanks — the program's supporters.
 *
 * DATA LIVES IN `src/content/supporters.json`, not here. That file is what the
 * CMS reads and writes. This file only supplies types and loads it.
 *
 * SOURCE: the "Special Thanks" page of the Fall 2026 CD Release Concert Program
 * (Canva), read 2026-09-03. Jaxon confirmed it as the authoritative list.
 *
 * ON NAMING INDIVIDUALS: an earlier version excluded private individuals out of
 * caution. That caution turned out to be unnecessary — this list comes from a
 * concert program the program prints and hands to an audience, so these are
 * names it already publishes as public recognition.
 *
 * Keep the order and wording as the concert program has it. Getting a donor's
 * name wrong is worse than having no recognition section.
 *
 * ⚠️ One unresolved spelling: the concert program says "Curt & Elaine Miller"
 * while the "My Favorite Things" album acknowledgements say "Curt and Eliane
 * Miller". Two of the program's own documents disagree. The newer concert
 * program spelling is in use; worth checking.
 */

import data from '../content/supporters.json';

export interface Supporter {
  name: string;
  url?: string;
}

export const supporters: Supporter[] = data.supporters;
