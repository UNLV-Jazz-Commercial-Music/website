/**
 * Site theme — colors, shape, motion, and an optional fixed background photo.
 * All editable from the CMS, no code editor required.
 *
 * DATA LIVES IN `src/content/theme.json`. The values there are seeded to match
 * the site's original hardcoded look exactly, so this file shipping changes
 * nothing on its own — it only takes effect once someone edits it in the CMS.
 *
 * Colors are genuinely open (any hex value), on purpose — Jaxon's call. There
 * is no built-in guardrail against picking two colors that are hard to read
 * together; that's what `npm run check` (via scripts/check-contrast.ts) is
 * for. It warns in the deploy log, it does not block the build — the same
 * rule the ensemble-alias check follows: a person typing into a form must
 * never be able to break the site.
 */

import data from '../content/theme.json';

export interface ThemeColors {
  accent: string;
  ink: string;
  inkSoft: string;
  rule: string;
  page: string;
  panel: string;
}

export type ThemeShape = 'sharp' | 'soft' | 'round';

export interface ThemeBackground {
  src: string;
  /** 0–90. How dark the overlay under the background photo is, so text on
   *  top of it stays legible regardless of what the photo looks like. No alt
   *  text here on purpose: this renders as a CSS background, not an <img> —
   *  it's decorative by design (screen readers already skip CSS backgrounds),
   *  never content that carries information on its own. */
  overlay: number;
}

const DEFAULT_COLORS: ThemeColors = {
  accent: '#b10202',
  ink: '#16161a',
  inkSoft: '#55555f',
  rule: '#e2e2e6',
  page: '#ffffff',
  panel: '#f7f7f8',
};

/** border-radius in pixels for each shape choice. "soft" matches the site's
 *  original fixed 6px, so the default shape looks identical to before this
 *  feature existed. */
const RADIUS_PX: Record<ThemeShape, number> = {
  sharp: 2,
  soft: 6,
  round: 14,
};

const raw = data as {
  colors?: Partial<ThemeColors>;
  shape?: string;
  motion?: boolean;
  background?: Partial<ThemeBackground>;
};

/** A hex color is only usable if it's actually a hex color — a blank or
 *  malformed CMS field falls back to the original default rather than
 *  producing invalid CSS. */
const isHex = (value: unknown): value is string =>
  typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());

export const colors: ThemeColors = {
  accent: isHex(raw.colors?.accent) ? raw.colors!.accent!.trim() : DEFAULT_COLORS.accent,
  ink: isHex(raw.colors?.ink) ? raw.colors!.ink!.trim() : DEFAULT_COLORS.ink,
  inkSoft: isHex(raw.colors?.inkSoft) ? raw.colors!.inkSoft!.trim() : DEFAULT_COLORS.inkSoft,
  rule: isHex(raw.colors?.rule) ? raw.colors!.rule!.trim() : DEFAULT_COLORS.rule,
  page: isHex(raw.colors?.page) ? raw.colors!.page!.trim() : DEFAULT_COLORS.page,
  panel: isHex(raw.colors?.panel) ? raw.colors!.panel!.trim() : DEFAULT_COLORS.panel,
};

const shapeChoice: ThemeShape =
  raw.shape === 'sharp' || raw.shape === 'round' ? raw.shape : 'soft';

export const radius = RADIUS_PX[shapeChoice];

/** Manual on/off from the CMS. Visitors who have their OS set to reduce
 *  motion still get no animation either way — that check happens in CSS via
 *  `prefers-reduced-motion`, not here, so it can never be overridden by a
 *  content edit. */
export const motionEnabled = raw.motion !== false;

/** A background photo is only usable if it actually has a source. Overlay
 *  clamps to a sane range so a typo (a negative number, 500) can't produce
 *  something unreadable or a fully opaque block hiding the photo entirely. */
const rawOverlay = raw.background?.overlay;
const overlay =
  typeof rawOverlay === 'number' && Number.isFinite(rawOverlay)
    ? Math.min(90, Math.max(0, rawOverlay))
    : 55;

export const background: ThemeBackground | null =
  raw.background?.src && raw.background.src.trim()
    ? { src: raw.background.src.trim(), overlay }
    : null;
