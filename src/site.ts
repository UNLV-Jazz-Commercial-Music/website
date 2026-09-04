/**
 * Site-wide switches.
 */

/**
 * Flip to `true` when the site is ready to be found in search results.
 *
 * While this is `false`, every page carries a `noindex, nofollow` tag and
 * robots.txt disallows everything. The site still works normally for anyone
 * with the link — this only keeps search engines from indexing an unfinished
 * version, which is hard to undo once it's in Google's cache.
 *
 * Before flipping it, the site should have: the Faculty and Contact pages, the
 * masthead wording Dave settles on, the Support page linked in the nav with a
 * real UNLV Foundation giving destination, and the real domain in place.
 */
export const SEARCH_ENGINES_ALLOWED = false;

/**
 * Canonical origin. Update when the real domain is live.
 *
 * Currently a Cloudflare Pages default URL. See HOSTING.md for why the site
 * moved off Netlify on 2026-09-04.
 */
export const SITE_ORIGIN = 'https://unlvjazz.pages.dev';
