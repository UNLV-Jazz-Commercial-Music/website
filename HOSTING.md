# Hosting and deployment

Everything about where this site lives and how it gets published.

## Where it runs

| | |
|---|---|
| **Host** | Cloudflare Workers (static assets) |
| **Repo** | `UNLV-Jazz-Commercial-Music/website` (public) |
| **Build command** | `npm run build` |
| **Output directory** | `dist` |
| **Node version** | pinned by `.node-version` (24) |
| **URL** | https://unlvjazz.jazz-e41.workers.dev |

Pushing to `main` triggers a build. That includes saves made in the CMS, which
commit to `main` like any other change.

## Why not Netlify

The site launched on Netlify on 2026-09-03 and moved on 2026-09-04. Netlify's
free plan is credit-based: **300 credits a month, a hard limit, and every
production deploy costs 15 credits.** That is 20 deploys per month, total.

That is fatal for this particular site, because **every CMS save is a production
deploy**. Faculty would have had roughly twenty content edits per month between
all of them, on a site whose entire purpose is that they can edit it freely.

Cloudflare's free plan allows **3,000 build minutes a month** — at roughly a
minute and a half per build, about 2,000 builds. **Requests to static assets are
free and unlimited**, so visitor traffic costs nothing however popular the site
gets. Cloudflare also provides cron triggers, which fixed a second problem —
see below.

The original reason for choosing Netlify was that it acted as the OAuth client
for the CMS login for free. That convenience was real, but it cost 25x the
deploy headroom on the thing that matters most.

## The three moving parts

### 1. The site build

Static Astro. Content comes from two places:

- **Events** — a Google Sheet published as CSV, read at build time. Lives in the
  J&CM Area shared Drive so the organization owns it rather than a person.
- **Everything else** — JSON in `src/content/`, edited through the CMS.

The Sheet is entirely independent of hosting. It doesn't know or care who
serves the site.

### 2. The CMS login

Sveltia CMS at `/admin`. Content is committed to this repo, so the CMS is
host-independent — except for authentication, which needs an OAuth client.

On Netlify that was built in. On Cloudflare it's
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth),
a Worker maintained by the Sveltia team.

Setup:

1. Deploy the authenticator Worker, following that repository's instructions.
2. Give it the GitHub OAuth App's Client ID and Secret as Worker secrets.
3. Update the **GitHub OAuth App's callback URL** to the Worker's URL. It
   previously pointed at `https://api.netlify.com/auth/done`, which stops
   working once Netlify is gone.
4. Set `base_url` in `public/admin/config.yml` to the Worker's URL.

Note that `base_url` was deliberately absent while on Netlify — Sveltia defaults
to Netlify's OAuth client. Off Netlify, it becomes required. The comment in
`config.yml` explains the trap: in Sveltia, `base_url` means the OAuth client
URL only when you supply one; it must never point at `api.netlify.com`.

### 3. Nightly rebuilds

The site bakes events in at build time, so **editing the Sheet changes nothing
until a rebuild happens.**

`workers/nightly-rebuild.js` is a Cloudflare Worker on a cron trigger that pokes
a deploy hook at 10:00 UTC daily. It replaced a GitHub Actions scheduled
workflow, which had a genuine flaw: GitHub disables scheduled workflows after
60 days without repository activity. Faculty edit the Sheet, not the repo, so
this repo going quiet for two months was likely — and rebuilds would have
stopped silently, freezing the site on stale events.

Cloudflare cron triggers do not expire.

## Keeping deploys cheap

Cloudflare's 3,000 build minutes a month is generous, but the habits still matter:

- **Batch code changes.** One commit with five fixes costs one build; five
  commits cost five. On 2026-09-03 twenty-seven commits in a day exhausted a
  whole month of Netlify's allowance.
- **CMS saves each cost a build.** That's expected and fine — it's what the
  budget is for.
- **Build minutes, not build count, is the metric.** A 90-second build costs 90
  seconds of a 3,000-minute monthly budget.
- Deployed as a **Worker with static assets**, which is Cloudflare's current
  recommended path for static sites — not a Pages project. The docs for the two
  differ; check the Workers ones.

## Checks before you trust a deploy

```
npm test     # event pipeline and text helpers, offline, no dependencies
npm run check # cross-checks Sheet ensemble names against the site (needs network)
npm run build # the same build Cloudflare runs
```

`npm run check` exists because renaming an ensemble silently detaches its
concerts from its page. It has caught that twice.
