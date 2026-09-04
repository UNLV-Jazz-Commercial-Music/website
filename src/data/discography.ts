/**
 * The program's recordings, newest first.
 *
 * DATA LIVES IN `src/content/albums.json`, not here. That file is what the CMS
 * reads and writes, so a new release can be added without touching code. This
 * file only supplies types and loads it.
 *
 * SOURCES
 * - 2026 releases: confirmed by Jaxon. "My Favorite Things" details (tracks,
 *   arrangers, catalog number, guest artist) come from the album's own artwork.
 * - 2018–2025: the program's own Bandcamp, unlvjazz.bandcamp.com.
 * - 2010–2017: the September 2026 audit of the old Weebly site.
 *
 * The old site listed only the 2010–2017 records, which made the program look
 * like it had stopped recording in 2017. It hadn't — there is a release nearly
 * every year. Keep this current; a donor reads a stale discography as a program
 * in decline.
 *
 * Bandcamp titles embed the year ("Dreamlike UNLV 2023"). Store the clean title
 * and put the year in `year`, since the page renders them separately.
 *
 * `cover` is a path under public/. Undefined where artwork hasn't been exported
 * yet — the page renders a text entry rather than a broken image.
 */

import data from '../content/albums.json';

export interface Album {
  title: string;
  year: number;
  /** Performing ensemble(s), as credited on the release. */
  artist?: string;
  /** Anything worth a line — guest artists, awards, label notes. */
  note?: string;
  label?: string;
  catalogNumber?: string;
  /** Where to listen or buy. */
  url?: string;
  /** Path under public/, e.g. "/covers/my-favorite-things.jpg" */
  cover?: string;
  tracks?: { title: string; composer?: string; arranger?: string }[];
}

export const albums: Album[] = data.albums;

/** The program's Bandcamp, where most of the catalogue can be heard and bought. */
export const BANDCAMP_URL: string = data.bandcampUrl;
