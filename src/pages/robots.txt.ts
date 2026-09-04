/**
 * robots.txt, generated so it stays in step with the launch switch in site.ts
 * rather than being a static file someone forgets to update.
 */

import type { APIRoute } from 'astro';
import { SEARCH_ENGINES_ALLOWED, SITE_ORIGIN } from '../site';

export const GET: APIRoute = () => {
  const body = SEARCH_ENGINES_ALLOWED
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap-index.xml\n`
    : `# Site is still being built. Flip SEARCH_ENGINES_ALLOWED in src/site.ts at launch.\nUser-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
