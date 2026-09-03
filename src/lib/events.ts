/**
 * Event data layer.
 *
 * Single source of truth is a Google Sheet published to the web as CSV, living
 * in the J&CM Area shared Drive. It lives in the shared Drive on purpose: files
 * there are owned by the organization rather than a person, so it survives
 * graduate assistants coming and going. Faculty edit the Sheet; nobody touches
 * this file.
 *
 * The feed URL is hardcoded rather than read from an environment variable. It is
 * a public, read-only URL and not a secret, and hardcoding means the repo is
 * self-contained — a future maintainer cloning this cannot end up with a
 * mysteriously empty site because an env var went missing.
 *
 * If the Sheet is ever recreated from scratch it gets a NEW publish URL and this
 * constant must be updated. Edit the existing Sheet's cells instead.
 */

// Explicit .ts extension so plain Node can resolve this too — scripts/test-events.ts
// runs outside Vite, which would otherwise resolve an extensionless path fine.
import { parseCsvToObjects } from './csv.ts';

const FEED_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1CM2_C_KaDjGBW3jZZC7lIA0igmj-JD6Yftg08vgdgCQcVFNk4Mi-TcfjI0GexNfo5N7CqK4raOPL/pub?gid=1728574251&single=true&output=csv';

/** The program's home timezone. Used to decide what "today" means. */
const TIMEZONE = 'America/Los_Angeles';

export type EventStatus = 'Confirmed' | 'Tentative' | 'Cancelled';

export interface JcmEvent {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  startTime: string;
  endTime: string;
  /** One to four ensembles, in billing order, blanks removed. */
  ensembles: string[];
  title: string;
  venue: string;
  address: string;
  admission: string;
  ticketUrl: string;
  status: EventStatus;
  description: string;
  posterUrl: string;
  /** URL-safe identifier, unique within the feed. */
  slug: string;
  /** "Jazz Ensemble I & Latin Jazz Ensemble — CD Release" */
  headline: string;
  isPast: boolean;
}

const pad = (value: string | number) => String(value).padStart(2, '0');

/** Today's date in Las Vegas as YYYY-MM-DD, regardless of where the build runs. */
function todayLocal(): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

/**
 * Normalize a date cell to YYYY-MM-DD, or null if it isn't a date.
 *
 * The Sheet's date column should be formatted YYYY-MM-DD, but M/D/YYYY is
 * accepted too — that's what Sheets exports if the column format was never set,
 * and an unformatted column is an easy step to miss.
 */
function normalizeDate(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;

  const iso = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) return `${iso[1]}-${pad(iso[2])}-${pad(iso[3])}`;

  const us = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (us) return `${us[3]}-${pad(us[1])}-${pad(us[2])}`;

  return null;
}

/** Minutes since midnight, for ordering multiple events on the same day. */
function timeToMinutes(raw: string): number {
  const value = raw.trim().toLowerCase();
  if (!value) return 0;

  const match = value.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!match) return 0;

  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const meridiem = match[3];

  if (meridiem === 'pm' && hours !== 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/** Accepts any casing, and "canceled" with one L. */
function normalizeStatus(raw: string): EventStatus {
  const value = raw.trim().toLowerCase();
  if (value === 'cancelled' || value === 'canceled') return 'Cancelled';
  if (value === 'tentative') return 'Tentative';
  return 'Confirmed'; // blank defaults to confirmed
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "A" · "A & B" · "A, B & C" */
function formatList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
}

/**
 * Turn raw feed CSV into ordered events. Pure — no network, so it can be tested
 * directly against sample CSV (see scripts/test-events.ts).
 *
 * @param csvText Raw CSV from the published Sheet.
 * @param today   Reference date as YYYY-MM-DD; defaults to today in Las Vegas.
 *                Injectable so tests aren't time-dependent.
 */
export function parseEvents(csvText: string, today: string = todayLocal()): JcmEvent[] {
  const rows = parseCsvToObjects(csvText);
  const usedSlugs = new Set<string>();

  const events = rows
    .map((row) => {
      const date = normalizeDate(row.date ?? '');
      if (!date) return null; // blank or malformed row — skip it

      const ensembles = [
        row.ensemble_1,
        row.ensemble_2,
        row.ensemble_3,
        row.ensemble_4,
      ]
        .map((value) => (value ?? '').trim())
        .filter(Boolean);

      const title = (row.title ?? '').trim();
      const ensembleText = formatList(ensembles);
      const headline = [ensembleText, title].filter(Boolean).join(' — ') || 'Untitled event';

      // Slug prefers the title, because a full ensemble list makes an unusable URL:
      // a three-ensemble bill produced a 104-character slug. Falls back to the
      // ensemble list for the many events that have no separate title.
      const slugBase = slugify(`${date}-${title || ensembleText}`);
      let slug = slugBase;
      let suffix = 2;
      while (usedSlugs.has(slug)) slug = `${slugBase}-${suffix++}`;
      usedSlugs.add(slug);

      const event: JcmEvent & { sortKey: number } = {
        date,
        startTime: (row.start_time ?? '').trim(),
        endTime: (row.end_time ?? '').trim(),
        ensembles,
        title,
        venue: (row.venue ?? '').trim(),
        address: (row.address ?? '').trim(),
        admission: (row.admission ?? '').trim(),
        ticketUrl: (row.ticket_url ?? '').trim(),
        status: normalizeStatus(row.status ?? ''),
        description: (row.description ?? '').trim(),
        posterUrl: (row.poster_url ?? '').trim(),
        slug,
        headline,
        isPast: date < today,
        sortKey: timeToMinutes(row.start_time ?? ''),
      };

      return event;
    })
    .filter((event): event is JcmEvent & { sortKey: number } => event !== null);

  events.sort((a, b) => a.date.localeCompare(b.date) || a.sortKey - b.sortKey);

  return events.map(({ sortKey, ...event }) => event);
}

/**
 * Fetch and parse every event in the Sheet, ordered earliest first.
 *
 * Throws if the feed is unreachable. That is deliberate: a failed build leaves
 * the last good deploy live, whereas swallowing the error would quietly publish
 * a site with no events on it.
 */
export async function loadEvents(): Promise<JcmEvent[]> {
  const response = await fetch(FEED_URL);

  if (!response.ok) {
    throw new Error(
      `Events feed returned ${response.status} ${response.statusText}. ` +
        `Check that the Sheet is still published to the web (File > Share > Publish to web).`,
    );
  }

  return parseEvents(await response.text());
}

/** Upcoming events, soonest first. Cancelled shows are kept so the site can say so. */
export async function loadUpcomingEvents(limit?: number): Promise<JcmEvent[]> {
  const upcoming = (await loadEvents()).filter((event) => !event.isPast);
  return limit ? upcoming.slice(0, limit) : upcoming;
}

/** Past events, most recent first. Archiving happens on its own — no manual deletion. */
export async function loadPastEvents(limit?: number): Promise<JcmEvent[]> {
  const past = (await loadEvents()).filter((event) => event.isPast).reverse();
  return limit ? past.slice(0, limit) : past;
}

/** "Saturday, October 10, 2026" */
export function formatEventDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // date-only value; UTC avoids an off-by-one day shift
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** Google Maps search link for a venue, or null when there's no address. */
export function mapUrl(event: JcmEvent): string | null {
  const query = [event.venue, event.address].filter(Boolean).join(', ');
  if (!query) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
