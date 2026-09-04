/**
 * Cross-checks the events Sheet against the site's own content.
 *
 * Run: npm run check   (needs network — it fetches the live Sheet)
 *
 * WHY THIS EXISTS
 * Events are matched to ensembles by exact name. If someone renames an ensemble
 * in the CMS but not in the Sheet's dropdown — or vice versa — that ensemble's
 * concerts silently disappear from its page. Nothing errors. Nothing looks
 * broken. The events are simply gone from where people look for them.
 *
 * This happened within hours of the CMS going live, which is why it's automated
 * rather than left as a note. Silent failures are the ones that survive.
 *
 * Deliberately a separate command from `npm test`: the tests are offline and
 * dependency-free so they still run years from now, while this one needs the
 * network. Run it after any rename on either side.
 */

import { readFileSync } from 'node:fs';
import { loadEvents } from '../src/lib/events.ts';

interface EnsembleRecord {
  name: string;
  /** Alternate Sheet names whose events belong to this ensemble. */
  aliases?: string[];
}

const ensembles: EnsembleRecord[] = JSON.parse(
  readFileSync(new URL('../src/content/ensembles.json', import.meta.url), 'utf8'),
).ensembles;

const events = await loadEvents();

const pageNames = new Set(ensembles.flatMap((e) => [e.name, ...(e.aliases ?? [])]));
const sheetNames = new Set(events.flatMap((e) => e.ensembles));

let problems = 0;

console.log('\nEnsemble names: Sheet vs site\n');

// The failure that matters: events pointing at an ensemble the site doesn't know.
for (const name of [...sheetNames].sort()) {
  if (pageNames.has(name)) continue;
  const affected = events.filter((e) => e.ensembles.includes(name));
  problems++;
  console.log(`  ORPHANED  "${name}" — in the Sheet, not on the Ensembles page`);
  console.log(`            ${affected.length} event(s) will not appear on any ensemble page:`);
  for (const event of affected) {
    console.log(`              ${event.date}  ${event.headline.slice(0, 60)}`);
  }
  console.log(
    `            Fix: rename it in the CMS to match, or change the Sheet's ensemble columns.\n`,
  );
}

// Not an error, but worth surfacing — an active ensemble with nothing scheduled
// is usually a sign the season hasn't been entered rather than a real gap.
const noEvents = [...pageNames].filter((name) => !sheetNames.has(name));
if (noEvents.length) {
  console.log('  Note: on the Ensembles page with no upcoming or past events in the Sheet:');
  for (const name of noEvents) console.log(`            ${name}`);
  console.log();
}

// Alt text on ensemble photos — a photo with no alt text is invisible to anyone
// using a screen reader, and the old site was flagged for exactly this.
const rawEnsembles = JSON.parse(
  readFileSync(new URL('../src/content/ensembles.json', import.meta.url), 'utf8'),
).ensembles as { name: string; photo?: { src?: string; alt?: string } }[];

for (const ensemble of rawEnsembles) {
  const photo = ensemble.photo;
  if (photo?.src && !photo.alt?.trim()) {
    problems++;
    console.log(`  NO ALT TEXT  "${ensemble.name}" has a photo but no alt text.`);
  }
}

if (problems === 0) {
  console.log('  No problems found.\n');
  process.exit(0);
}

console.log(`  ${problems} problem(s) found.\n`);
process.exit(1);
