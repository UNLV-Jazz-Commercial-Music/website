/**
 * Organizations, foundations and funds that support the program.
 *
 * SOURCE: the acknowledgements page of the 2026 album "My Favorite Things"
 * (Canva design "2026 UNLV Jazz CD design"), which is the program's own most
 * recent and most carefully checked list.
 *
 * ⚠️ ORGANIZATIONS AND FUNDS ONLY — DELIBERATELY.
 * The album acknowledgements also name roughly a dozen private individuals.
 * They are NOT listed here, and should not be added without asking them first.
 * A credit inside a CD booklet is not consent to appear on a public web page,
 * and donors who gave quietly have a reasonable expectation of staying quiet.
 * The full list including individuals is recorded in the vault note
 * "Website Rebuild" for Jaxon and Dave to decide on.
 *
 * Get the names exactly right. A recognition page that misspells a donor is
 * worse than having no recognition page at all.
 */

export interface Supporter {
  name: string;
  url?: string;
  /** Optional one-line description of what they support. */
  note?: string;
}

export const supporters: Supporter[] = [
  { name: 'The UNLV Foundation' },
  { name: 'The Patterson Foundation' },
  { name: 'The Joe Williams Every Day Foundation' },
  { name: 'Friends of UNLV Jazz' },
  { name: 'Las Vegas Jazz Society' },
  { name: 'The Forgotten Song Foundation' },
  { name: 'Vegas Records', url: 'https://www.vegasrecords.org' },
  { name: 'KUNV' },
  { name: 'The Library District' },
  { name: 'Investment Counsel Company' },
];

/**
 * Named scholarship funds. Separated from the list above because these are
 * endowments students apply to, not organizations — worth presenting as its own
 * group so a prospective donor can see what naming a fund looks like.
 */
export const scholarshipFunds: Supporter[] = [
  { name: 'Jake Garehime Jazz Scholarship Fund' },
  { name: 'The Isabelle Emerson Jazz Scholarship Fund' },
  { name: 'The Jay Morrison Jazz Scholarship Fund' },
  { name: 'The William and Carol McLeod Scholarship Fund' },
  { name: 'Paul Coladarci Jazz Scholarship Fund' },
  { name: 'Curt and Eliane Miller Scholarship Endowment' },
];
