/**
 * Special Thanks — the program's supporters.
 *
 * SOURCE: the "Special Thanks" page of the Fall 2026 CD Release Concert Program
 * (Canva, "Fall 2026 CD Release Concert Program"), read 2026-09-03. Jaxon
 * pointed here as the authoritative list.
 *
 * ON NAMING INDIVIDUALS: an earlier version of this file excluded private
 * individuals out of caution. That caution was unnecessary — this list comes
 * from a concert program the program prints and hands to an audience, so these
 * are names the program already publishes as public recognition. Reproducing
 * that same list here is consistent with what the program already does.
 *
 * Keep the order and wording as the concert program has it. These are people's
 * names and the names of funds honouring people; getting one wrong is worse
 * than omitting the section.
 *
 * ⚠️ One unresolved spelling: the concert program says "Curt & Elaine Miller"
 * while the "My Favorite Things" album acknowledgements say "Curt and Eliane
 * Miller". Two of the program's own documents disagree. The concert program is
 * the newer of the two and is used here, but this should be checked.
 */

export interface Supporter {
  name: string;
  url?: string;
}

export const supporters: Supporter[] = [
  { name: 'The Joe Williams Every Day Foundation' },
  { name: 'Clint Holmes, Naomi Mauro, Melanie Moore, Nick Mastrangelo' },
  { name: 'Randy Garcia and the Investment Counsel Company' },
  { name: 'Doug & Lynn Small' },
  { name: 'Jake Garehime Jazz Scholarships' },
  { name: 'The Isabelle Emerson Jazz Scholarship Fund' },
  { name: 'The Patterson Foundation' },
  { name: 'The Jay Morrison Jazz Scholarships' },
  { name: 'Las Vegas Jazz Society' },
  { name: 'The UNLV Recording Studio Staff' },
  { name: 'The William & Carol McLeod Scholarship Fund' },
  { name: 'Dave Viger' },
  { name: 'Sue and Paul Coladarci Jazz Scholarship Fund' },
  { name: 'KUNV' },
  { name: 'Thomas Bridge' },
  { name: 'Suzanne Scott and the Clark County Library District' },
  { name: 'Jeff Williams, Coordinator of Secondary Fine Arts, Clark County School District' },
  { name: 'Ann Parenti' },
  { name: 'The Forgotten Song Foundation' },
  { name: 'Laura Taylor & David Mulkey' },
  { name: 'Curt & Elaine Miller Endowed Scholarship for Jazz and Commercial Music' },
  { name: 'Robert & Shirley Kramer' },
  { name: 'Friends of UNLV Jazz' },
];
