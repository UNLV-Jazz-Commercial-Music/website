/**
 * Checks the event pipeline against the cases that actually break it.
 *
 * Run: npm test
 *
 * Node 24 strips TypeScript types natively, so this needs no build step and no
 * test framework. Deliberately dependency-free — a successor should be able to
 * run this years from now without fighting a stale toolchain.
 */

import { parseEvents } from '../src/lib/events.ts';
import { parseCsv } from '../src/lib/csv.ts';

let failures = 0;

function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  ok   ${label}`);
  } else {
    failures++;
    console.log(`  FAIL ${label}\n         expected ${e}\n         actual   ${a}`);
  }
}

const HEADERS =
  'date,start_time,end_time,ensemble_1,ensemble_2,ensemble_3,ensemble_4,title,venue,address,admission,ticket_url,status,description,poster_url';

console.log('\nCSV parser');
{
  // The case a naive split(',') destroys.
  const rows = parseCsv('a,b\n"free, no ticket",second\n');
  check('comma inside quotes stays in one field', rows[1], ['free, no ticket', 'second']);

  const escaped = parseCsv('a\n"He said ""hello"""\n');
  check('escaped double-quotes unescape', escaped[1], ['He said "hello"']);

  const multiline = parseCsv('a,b\n"line one\nline two",x\n');
  check('newline inside quotes stays in one field', multiline[1], ['line one\nline two', 'x']);

  check('BOM is stripped from first header', parseCsv('﻿date,x\n')[0], ['date', 'x']);

  const crlf = parseCsv('a,b\r\nc,d\r\n');
  check('CRLF line endings', crlf, [['a', 'b'], ['c', 'd']]);
}

console.log('\nMulti-ensemble bills');
{
  const csv = [
    HEADERS,
    '2026-10-21,3:00 PM,,Jazz Ensemble I,Latin Jazz Ensemble,,,CD Release,Artemus W. Ham Hall,,Free,,Confirmed,,',
    '2026-11-27,7:30 PM,,Jazz Ensemble I,Jazz Ensemble II,JCM Faculty,,,UNLV Black Box Theater,,"$10 general, $5 students",,Confirmed,,',
  ].join('\n');

  const events = parseEvents(csv, '2026-09-03');

  check('two ensembles collapse to a list', events[0].ensembles, [
    'Jazz Ensemble I',
    'Latin Jazz Ensemble',
  ]);
  check(
    'two-ensemble headline uses &',
    events[0].headline,
    'Jazz Ensemble I & Latin Jazz Ensemble — CD Release',
  );
  check(
    'three-ensemble headline uses comma then &',
    events[1].headline,
    'Jazz Ensemble I, Jazz Ensemble II & JCM Faculty',
  );
  check('blank ensemble columns are dropped', events[1].ensembles.length, 3);
  check('quoted admission survives', events[1].admission, '$10 general, $5 students');
}

console.log('\nOrdering and archiving');
{
  const csv = [
    HEADERS,
    '2026-12-12,7:00 PM,,Jazz Vocal Ensemble,,,,,Doc Rando Recital Hall,,Free,,Confirmed,,',
    '2026-08-01,7:00 PM,,Jazz Combos,,,,,Flamingo Library Theater,,Free,,Confirmed,,',
    '2026-10-10,9:00 PM,,Jazz Ensemble II,,,,Late set,UNLV Black Box Theater,,Free,,Confirmed,,',
    '2026-10-10,7:00 PM,,Contemporary Jazz Ensemble,,,,Early set,UNLV Black Box Theater,,Free,,Confirmed,,',
  ].join('\n');

  const events = parseEvents(csv, '2026-09-03');

  check(
    'sorted by date, then by time within a day',
    events.map((e) => `${e.date} ${e.startTime}`),
    ['2026-08-01 7:00 PM', '2026-10-10 7:00 PM', '2026-10-10 9:00 PM', '2026-12-12 7:00 PM'],
  );
  check('past event flagged', events[0].isPast, true);
  check('future event not flagged', events[1].isPast, false);
}

console.log('\nMessy input the sheet will eventually contain');
{
  const csv = [
    HEADERS,
    ',,,,,,,,,,,,,,', // fully blank row
    '2026-10-10,7:00 PM,,Jazz Ensemble I,,,,,Ham Hall,,Free,,canceled,,', // one-L, lowercase
    '10/21/2026,3:00 PM,,Jazz Ensemble II,,,,,Ham Hall,,Free,,TENTATIVE,,', // unformatted date column
    '2026-11-14,7:00 PM,,Latin Jazz Ensemble,,,,,Ham Hall,,Free,,,,', // blank status
  ].join('\n');

  const events = parseEvents(csv, '2026-09-03');

  check('blank rows are skipped', events.length, 3);
  check('"canceled" normalizes to Cancelled', events[0].status, 'Cancelled');
  check('M/D/YYYY dates are accepted', events[1].date, '2026-10-21');
  check('uppercase TENTATIVE normalizes', events[1].status, 'Tentative');
  check('blank status defaults to Confirmed', events[2].status, 'Confirmed');
}

console.log('\nSlugs');
{
  const csv = [
    HEADERS,
    '2026-10-10,7:00 PM,,Jazz Ensemble I,,,,,Ham Hall,,Free,,Confirmed,,',
    '2026-10-10,9:00 PM,,Jazz Ensemble I,,,,,Ham Hall,,Free,,Confirmed,,',
  ].join('\n');

  const events = parseEvents(csv, '2026-09-03');
  check('slug is url-safe', events[0].slug, '2026-10-10-jazz-ensemble-i');
  check('duplicate bills on one day get distinct slugs', events[1].slug, '2026-10-10-jazz-ensemble-i-2');
}

console.log(
  failures === 0 ? '\nAll checks passed.\n' : `\n${failures} check(s) failed.\n`,
);

process.exit(failures === 0 ? 0 : 1);
