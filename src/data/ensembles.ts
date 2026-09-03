/**
 * The active ensembles.
 *
 * Audience for this page is DONORS and CONCERT-GOERS, not prospective students.
 * Descriptions say what a group is and what it sounds like. Audition and
 * admissions questions are referred to unlv.edu/music rather than answered here.
 *
 * `name` must match the ensemble names used in the events Sheet EXACTLY — that
 * string is how each ensemble finds its own upcoming performances. If you rename
 * one here, rename it in the Sheet's dropdown too.
 *
 * Inactive ensembles are deliberately absent: Jazz Ensemble III, Jazz Guitar
 * Ensemble, and Harmon Avenue Jazz Vocal Ensemble are on hold for enrollment and
 * may return. Add them back here when they do.
 */

export interface Ensemble {
  /** Must match the events Sheet exactly. */
  name: string;
  directors: string[];
  description: string;
}

export const ensembles: Ensemble[] = [
  {
    name: 'Jazz Ensemble I',
    directors: ['Dave Loeb', 'Nathan Tanouye'],
    description:
      'The program’s flagship big band, and the group that carries our name at festivals and on record. It headlines both the fall and spring jazz festivals and anchors the annual album release.',
  },
  {
    name: 'Jazz Ensemble II',
    directors: ['Gabriel Carpenter'],
    description:
      'Our second big band, performing a full concert season of its own alongside the vocal ensembles. Many players move up through this group into Jazz Ensemble I.',
  },
  {
    name: 'Contemporary Jazz Ensemble',
    directors: ['Julian Tanaka'],
    description:
      'Focused on modern and contemporary jazz writing, including music by our own composition students.',
  },
  {
    name: 'Latin Jazz Ensemble',
    directors: ['Jose Jimenez-Castro'],
    description:
      'Afro-Cuban, Brazilian and Latin jazz repertoire. The ensemble has recorded three albums in the Latin Journey series.',
  },
  {
    name: 'Studio Scarlet Jazz Vocal Ensemble',
    directors: ['Lara Vivian Smith'],
    description:
      'A vocal jazz ensemble performing both on campus and in the community, appearing regularly on our Clark County Library series.',
  },
  {
    name: 'Maryland Parkway Jazz Vocal Ensemble',
    directors: ['Gary Fowler'],
    description:
      'A vocal jazz ensemble named for the street that runs alongside campus, sharing programs with our big bands and appearing on the annual Vocal Jazz Night.',
  },
  {
    name: 'Joe Williams Scholarship Quintet',
    directors: ['Dave Loeb'],
    description:
      'A small group of scholarship students performing as a working jazz quintet, on campus and throughout Las Vegas.',
  },
  {
    name: 'Joe Williams Scholarship Combo',
    directors: ['Dave Loeb'],
    description:
      'The second of our two Joe Williams Scholarship small groups, performing across the concert season.',
  },
];
