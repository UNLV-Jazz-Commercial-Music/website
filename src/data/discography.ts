/**
 * The program's recordings, newest first.
 *
 * SOURCES
 * - 2026 releases: confirmed by Jaxon. "My Favorite Things" details (tracks,
 *   arrangers, catalog number, guest artist) come from the album's own artwork.
 * - 2018–2025: the program's own Bandcamp, unlvjazz.bandcamp.com. Release date
 *   for "Let The Good Times Roll" read from that page's structured data.
 * - 2010–2017: the September 2026 audit of the old Weebly site.
 *
 * The old site listed only the 2010–2017 records, which made the program look
 * like it had stopped recording in 2017. It hadn't — there is a release every
 * single year. Keep this current; a donor reads a stale discography as a
 * program in decline.
 *
 * Bandcamp titles embed the year ("Dreamlike UNLV 2023"). Store the clean title
 * and put the year in `year`, since the page renders them separately.
 *
 * `cover` is a path under public/. Undefined where artwork hasn't been exported
 * yet — the page renders a text entry rather than a broken image.
 */

const BC = 'https://unlvjazz.bandcamp.com/album';

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
    artist: 'UNLV Jazz Ensemble I',
    note: 'Received 2025 Grammy consideration, was featured on radio nationally, and drew reviews across the jazz press.',
    url: `${BC}/double-or-nothing`,
  },
  { title: 'Let The Good Times Roll', year: 2024, url: `${BC}/let-the-good-times-roll` },
  { title: 'Dreamlike', year: 2023, url: `${BC}/dreamlike-unlv-2023` },
  { title: 'Almost There', year: 2022, url: `${BC}/almost-there-unlv-2022` },
  { title: 'Looking Up', year: 2021, url: `${BC}/looking-up-unlv-2021` },
  { title: 'Dorian Dream', year: 2020, url: `${BC}/dorian-dream-unlv-2020` },
  {
    title: 'Passersby & Latin Journey V',
    year: 2019,
    url: `${BC}/passersby-latin-journey-v-unlv-2019`,
  },
  {
    title: 'Fascinating Rhythm & Latin Journey IV',
    year: 2018,
    url: `${BC}/fascinating-rhythm-latin-journey-iv-unlv-2018`,
  },
  { title: 'Rail Trails / Latin Journey III', year: 2017 },
  { title: 'Extra Credit / Latin Journey II', year: 2016 },
  { title: 'Characters', year: 2015 },
  {
    title: 'Latin Journey',
    year: 2015,
    artist: 'UNLV Latin Jazz Ensemble',
    url: 'https://unlvlatin.bandcamp.com/album/latin-journey',
  },
  { title: 'Smoke in Mirrors', year: 2014 },
  { title: 'The Four of Us', year: 2013 },
  { title: "Smilin' Eyes", year: 2012 },
  { title: "Bea's Flat", year: 2011 },
  { title: 'The City', year: 2010 },
  { title: 'Blue in Green', year: 2010 },
];

/** The program's Bandcamp, where most of the catalogue can be heard and bought. */
export const BANDCAMP_URL = 'https://unlvjazz.bandcamp.com';
