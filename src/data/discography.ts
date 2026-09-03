/**
 * The program's recordings, newest first.
 *
 * SOURCES
 * - 2026 releases: confirmed by Jaxon, with "My Favorite Things" details taken
 *   from the album's own Canva artwork (track list, personnel, catalog number).
 * - "Double or Nothing" (2025): named in the "My Favorite Things" liner notes as
 *   the previous release. Its exact release date and catalog number still need
 *   confirming.
 * - 2010–2017 releases: from the September 2026 audit of the old Weebly site.
 *   Titles and years are as that site listed them.
 *
 * `cover` is a path under public/. Left undefined where artwork hasn't been
 * exported yet — the page renders a text entry rather than a broken image.
 *
 * The old site's discography stopped at 2017, which made a program that records
 * every year look like one that had stopped. Keep this current: a donor reads a
 * stale discography as a program in decline.
 */

export interface Album {
  title: string;
  year: number;
  /** Performing ensemble(s), as credited on the release. */
  artist?: string;
  /** Anything worth a line — guest artists, awards, label notes. */
  note?: string;
  label?: string;
  catalogNumber?: string;
  /** Path under public/, e.g. "/covers/my-favorite-things.jpg" */
  cover?: string;
  tracks?: { title: string; composer?: string; arranger?: string }[];
}

export const albums: Album[] = [
  {
    title: 'My Favorite Things',
    year: 2026,
    artist: 'UNLV Jazz Ensemble I',
    note: 'Directed by Dave Loeb and Nathan Tanouye, featuring guest vocalist Clint Holmes. Includes student arranger Renzon Maballo’s treatment of Ellington’s “Just Squeeze Me,” winner of the 2026 DownBeat Undergraduate Large Jazz Ensemble Arrangement award.',
    label: 'Vegas Records',
    catalogNumber: 'VR 1033',
    tracks: [
      { title: 'My Favorite Things', composer: 'Rodgers / Hammerstein', arranger: 'Nathan Tanouye' },
      { title: 'Angel Eyes', composer: 'Earl Brent / Matt Dennis', arranger: 'Matt Harris' },
      { title: 'Whirly Bird', composer: 'Neal Hefti / Count Basie' },
      { title: 'Softly as in a Morning Sunrise', composer: 'Sigmund Romberg', arranger: 'Javier Nero' },
      { title: 'Just Squeeze Me', composer: 'Duke Ellington', arranger: 'Renzon Maballo' },
      { title: 'Flying Dragons', composer: 'Hans Halt', arranger: 'Tristan Selzler' },
      { title: 'If Only My Heart Could Speak', composer: 'Cody Fry', arranger: 'Jaxon Dewald' },
      { title: 'Tell Me a Bedtime Story', composer: 'Herbie Hancock', arranger: 'Kirby Galbraith' },
      { title: 'Cherokee', composer: 'Ray Noble', arranger: 'Alan Baylock' },
    ],
  },
  {
    title: 'Back Home',
    year: 2026,
    artist: 'UNLV Latin Jazz Ensemble and Joe Williams Scholarship Quintet',
    // NOTE: the cover artwork credits "UNLV Combos" rather than naming the two
    // ensembles. Confirm which credit should appear here before publishing.
  },
  {
    title: 'Double or Nothing',
    year: 2025,
    note: 'Received 2025 Grammy consideration, was featured on radio nationally, and drew reviews across the jazz press.',
  },
  { title: 'Rail Trails / Latin Journey III', year: 2017 },
  { title: 'Extra Credit / Latin Journey II', year: 2016 },
  { title: 'Characters', year: 2015 },
  { title: 'Latin Journey', year: 2015 },
  { title: 'Smoke in Mirrors', year: 2014 },
  { title: 'The Four of Us', year: 2013 },
  { title: "Smilin' Eyes", year: 2012 },
  { title: "Bea's Flat", year: 2011 },
  { title: 'The City', year: 2010 },
  { title: 'Blue in Green', year: 2010 },
];
