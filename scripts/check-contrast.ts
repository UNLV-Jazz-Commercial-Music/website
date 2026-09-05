/**
 * Checks the site's theme colors for WCAG contrast, since the color pickers
 * in the CMS are genuinely open — any hex value — with no built-in guardrail
 * against picking two colors that are hard to read together.
 *
 * Run: npm run check   (no network needed, unlike check-content.ts)
 *
 * WHY THIS WARNS RATHER THAN FAILS
 * Same rule as the ensemble-alias check: a person filling out a form must
 * never be able to break the deploy by typing. A bad color choice ships, but
 * this prints the actual contrast ratio and which pair is the problem, so
 * whoever picked it knows to go fix it.
 */

import { readFileSync } from 'node:fs';

// Read the raw JSON rather than importing src/data/theme.ts: that module is
// consumed by Astro's own build (Vite), which handles a plain JSON import
// fine, but a bare `node` process — this script — requires an import
// attribute Astro doesn't need. check-content.ts follows the same pattern for
// ensembles.json. Falls back to the theme's own defaults if a color is ever
// missing or malformed, same guard theme.ts applies.
const DEFAULT_COLORS = {
  accent: '#b10202',
  ink: '#16161a',
  inkSoft: '#55555f',
  rule: '#e2e2e6',
  page: '#ffffff',
  panel: '#f7f7f8',
};

const isHex = (value: unknown): value is string =>
  typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());

const rawTheme = JSON.parse(
  readFileSync(new URL('../src/content/theme.json', import.meta.url), 'utf8'),
) as { colors?: Partial<typeof DEFAULT_COLORS> };

const colors = Object.fromEntries(
  Object.entries(DEFAULT_COLORS).map(([key, fallback]) => {
    const value = rawTheme.colors?.[key as keyof typeof DEFAULT_COLORS];
    return [key, isHex(value) ? value.trim() : fallback];
  }),
) as typeof DEFAULT_COLORS;

/** Relative luminance per the WCAG 2 formula. */
function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const [lA, lB] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (lA + 0.05) / (lB + 0.05);
}

// Pairs that actually appear on the site, and the WCAG AA minimum that
// applies to each: 4.5:1 for body text, 3:1 for large/bold text and UI
// components (nav links, the accent-colored event date labels, and white
// text on the accent-colored cancelled badge).
const pairs: { label: string; a: string; b: string; minimum: number }[] = [
  { label: 'Body text on the page background', a: colors.ink, b: colors.page, minimum: 4.5 },
  { label: 'Secondary text on the page background', a: colors.inkSoft, b: colors.page, minimum: 4.5 },
  { label: 'Secondary text on the panel background', a: colors.inkSoft, b: colors.panel, minimum: 4.5 },
  { label: 'Links and nav text on the page background', a: colors.accent, b: colors.page, minimum: 3 },
  { label: 'White badge text on the accent color', a: '#ffffff', b: colors.accent, minimum: 4.5 },
];

console.log('\nTheme colors: contrast check\n');

let warnings = 0;

for (const { label, a, b, minimum } of pairs) {
  const ratio = contrastRatio(a, b);
  const passes = ratio >= minimum;
  console.log(
    `  ${passes ? 'OK      ' : 'LOW     '} ${label}: ${ratio.toFixed(2)}:1 (needs ${minimum}:1)`,
  );
  if (!passes) warnings++;
}

if (warnings === 0) {
  console.log('\n  All theme color pairs meet WCAG AA.\n');
} else {
  console.log(
    `\n  ${warnings} color pair(s) below the WCAG AA minimum. The site still builds and` +
      ` deploys — this is a heads-up, not a block. Pick a different value in the` +
      ` Theme panel in /admin to fix it.\n`,
  );
}

// Deliberately always exits 0. See the file header — this check informs, it
// never blocks a deploy.
process.exit(0);
