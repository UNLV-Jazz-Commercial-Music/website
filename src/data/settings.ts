/**
 * Site-wide images, editable from the CMS.
 *
 * DATA LIVES IN `src/content/settings.json`. Uploads go to `public/uploads/`
 * and are referenced as `/uploads/filename.webp`.
 *
 * Everything here is OPTIONAL and degrades gracefully:
 *   - No logo  -> the header falls back to the text wordmark.
 *   - No hero  -> the homepage renders without one, no gap, no broken image.
 * That matters because a future editor may clear a field, and a site that
 * breaks when a field is empty is a site that punishes people for using it.
 *
 * Sveltia converts uploads to WebP at up to 2048px on the way in (configured in
 * public/admin/config.yml), so a 12 MB press photo becomes a sensible web image
 * without anyone having to think about it.
 */

import data from '../content/settings.json';

export interface SiteImage {
  src: string;
  alt: string;
  /** Photographer credit, shown small beneath the hero. */
  credit?: string;
}

/** An image is only usable if it actually has a source. */
const usable = (image: SiteImage | undefined): SiteImage | null =>
  image && image.src ? image : null;

export const logo = usable(data.logo);
export const hero = usable(data.hero);
