# UNLV Jazz & Commercial Music — website

## If you are an AI assistant starting a session in this folder

**Read `/Users/hotsax/Documents/Ruby/CLAUDE.md` first, then `/Users/hotsax/Documents/UNLV_vault/VAULT-INDEX.md`.** This repository is one project inside a larger operating system, and this file began as Astro's generated boilerplate — it does not carry Jaxon's identity, rules, or context.

The project's own record lives in the vault at `05 - Media/Website Rebuild.md`: the architecture and why each choice was made, verified ensemble and venue names, the events schema, and what is still outstanding. Read it before changing anything, and update it when you change something.

## What this site is

A static Astro site for the UNLV Jazz & Commercial Music area, replacing a Weebly site that was deleted in September 2026. Two properties matter more than anything else:

1. **It must be editable by people who do not write code.** That is a requirement from the faculty who approved the project, not a preference. Design decisions defer to it.
2. **Events are not stored in this repo.** They live in a Google Sheet in the J&CM Area shared Drive, published to the web as CSV, and read at build time by `src/lib/events.ts`. That Sheet is in a *shared* Drive on purpose: files there are owned by the organization rather than a person, so they survive graduate assistants leaving.

Because events are baked in at build time, **editing the Sheet does not change the live site until a rebuild happens.** `.github/workflows/nightly-rebuild.yml` handles that — read its comments before touching anything schedule-related, including the note about GitHub disabling scheduled workflows after 60 days of repo inactivity.

## Things that will break the site if you get them wrong

- **Never recreate the events Sheet.** A new file gets a new publish URL, and the feed constant in `src/lib/events.ts` goes stale. Edit the existing Sheet's cells instead.
- **Sheet columns are matched by header name**, so they can be reordered or added to freely. *Renaming* a header breaks the pipeline.
- **Use official venue names:** Artemus W. Ham Hall · Clark County Library Flamingo Road · Dr. Arturo Rando-Grillot Hall · Paul Harris Theater. Never write "Doc Rando" publicly — that is the informal name.
- **Faculty bios link out** to `https://www.unlv.edu/music/faculty-staff` rather than living here. This is deliberate: one authoritative source, rather than a copy of ours that drifts out of date. Do not "improve" this by copying bios in.
- **The build fails on purpose** when the events feed is unreachable, so a Google outage leaves the last good deploy up instead of publishing an empty calendar. Do not wrap that in a try/catch.
- **Only eight ensembles are active.** Jazz Ensemble III, Jazz Guitar Ensemble, and Harmon Avenue Jazz Vocal Ensemble are inactive due to enrollment and are intentionally omitted from the Ensembles page. The old site's "three big bands, ten combos" claim is stale.

## Commands

```
npm run dev      # dev server on :4321
npm run build    # static build to dist/
npm test         # event pipeline checks
```

`npm test` uses Node's native TypeScript stripping and has no dependencies, so it still runs years from now without a toolchain fight.

## Astro reference

Full documentation: https://docs.astro.build

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
