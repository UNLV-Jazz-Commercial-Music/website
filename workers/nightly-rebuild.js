/**
 * Nightly rebuild — Cloudflare Worker with a cron trigger.
 *
 * WHY THIS REPLACED A GITHUB ACTION
 * The site is static: it reads the events Google Sheet at build time and bakes
 * the results into HTML. Adding a concert to the Sheet therefore does nothing
 * until something rebuilds the site. This is that something.
 *
 * It previously ran as a GitHub Actions scheduled workflow, which had a real
 * flaw: GitHub disables scheduled workflows after 60 days with no repository
 * activity. Faculty edit the Sheet, not the repo, so this repo going quiet for
 * two months is likely — and nightly rebuilds would have stopped silently,
 * freezing the site on stale events. Cloudflare cron triggers do not expire.
 *
 * SETUP
 *   1. In Cloudflare Pages: Settings -> Builds & deployments -> Deploy hooks.
 *      Create one named "Nightly rebuild" on the main branch. Copy its URL.
 *   2. Store it as a secret on this Worker (never in this file — anyone with
 *      that URL can trigger builds):
 *        npx wrangler secret put DEPLOY_HOOK_URL
 *   3. Deploy:
 *        npx wrangler deploy
 *
 * The schedule lives in wrangler.toml.
 */

export default {
  async scheduled(event, env, ctx) {
    if (!env.DEPLOY_HOOK_URL) {
      console.error('DEPLOY_HOOK_URL secret is not set — nothing to call.');
      return;
    }

    const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });

    // Cloudflare answers 200 or 201 when it accepts the build request.
    if (response.ok) {
      console.log(`Rebuild requested. Cloudflare responded ${response.status}.`);
    } else {
      // Logged rather than thrown: a failed nightly build should not retry in a
      // loop. The previous deploy stays live, and the next night tries again.
      console.error(
        `Deploy hook returned ${response.status} ${response.statusText}. ` +
          `The site is still serving its last good build.`,
      );
    }
  },

  /**
   * Lets you trigger a rebuild by hand by visiting the Worker's URL, which is
   * useful right after adding an event you want live now rather than tomorrow.
   * Reads only — it can start a build, and can do nothing else.
   */
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response(
        'POST to this URL to trigger a site rebuild. Runs automatically each night.',
        { status: 405, headers: { 'Content-Type': 'text/plain' } },
      );
    }

    if (!env.DEPLOY_HOOK_URL) {
      return new Response('DEPLOY_HOOK_URL is not configured.', { status: 500 });
    }

    const response = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
    return new Response(
      response.ok ? 'Rebuild requested.' : `Deploy hook returned ${response.status}.`,
      { status: response.ok ? 202 : 502, headers: { 'Content-Type': 'text/plain' } },
    );
  },
};
