# Spiritual Gifts Assessment

**Live site: [spiritualgiftingstest.com](https://spiritualgiftingstest.com)**

A free, 133-question assessment that helps people discover which of 19 spiritual gifts are strongest in their lives. Answers are rated on a 0–3 scale, five questions per page, and the results rank all 19 gifts with a description and scripture reference for each.

Everything runs in the browser. There are no accounts, and no answers are sent to a server.

## Features

- **Paged assessment.** 133 questions across 27 pages of 5, with a progress bar and checks for unanswered questions.
- **Saves progress.** Answers and results are stored in the browser's `localStorage`, so people can restore an unfinished test or view previous results later.
- **Ranked results.** All 19 gifts are scored and ranked, each with a description and scripture reference.
- **Share with link previews.** The results page has a **Share My Results** button. Each shared link has its own preview image showing the person's top 3 gifts, and clicking it takes the visitor to the site to take the assessment themselves.
- **Light and dark themes.** Follows the system setting by default, with a manual toggle.

## Tech stack

- [Vue 3](https://vuejs.org/) single-file components with TypeScript
- [Vite](https://vite.dev/) for development and builds
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- [resvg](https://github.com/thx/resvg-js) and [sharp](https://sharp.pixelplumbing.com/) to render the preview images at build time

## Development

Requires Node.js 24 or newer, because the build script runs TypeScript directly.

```sh
npm install
npm run dev       # start the dev server
npm run build     # type-check, build the app, and generate share pages
npm run preview   # serve the production build locally
```

Share links (`/r/...`) only work in `npm run preview` or in production, because the share pages are created by the build.

## How share previews work

Link-preview crawlers (iMessage, Facebook, Slack, X and others) don't run JavaScript, so the preview tags have to be in static HTML. After Vite builds the app, `scripts/generate-share-pages.ts` writes:

| Output | What it is |
| --- | --- |
| `dist/og/default.png` | Site-wide preview image, referenced from `index.html` |
| `dist/og/<slug>.png` | One 1200×630 image per combination of 3 gifts (969 in total) |
| `dist/r/<slug>/index.html` | A share page with that result's preview tags, which sends visitors on to `/?shared=<slug>` |

A slug is the three gift names in a fixed order, for example `faith--mercy--wisdom`, so the same three gifts always produce the same link. The slug helpers and the site URL live in `src/data/share.ts`.

The build takes about 30 seconds and produces roughly 17 MB of images.

## Deployment

The production build is fully static. Upload the **contents** of `dist/` to the web root of the server.

- The server only has to serve static files; no PHP or other server code is needed.
- Share links are folders containing an `index.html`. If they don't load on Apache, add `DirectoryIndex index.php index.html` to `.htaccess`.
- After deploying, paste a share link into a preview checker such as [opengraph.xyz](https://www.opengraph.xyz/) to confirm the image shows up.

If the domain changes, update `SITE_URL` in `src/data/share.ts` and the `og:` URLs in `index.html`, then rebuild.

## Project structure

```
index.html                     App entry, plus site-wide preview tags
scripts/
  generate-share-pages.ts      Post-build step: preview images and share pages
src/
  App.vue                      Switches between the welcome, test and results screens
  composables/
    useAssessment.ts           Assessment state, paging, scoring, localStorage
    useTheme.ts                Light/dark theme handling
  data/
    questions.ts               The 133 questions
    gifts.ts                   The 19 gifts: names, descriptions, scripture
    share.ts                   Share slugs and the site URL
  screens/                     WelcomeScreen, TestScreen, ResultsScreen
  components/                  ThemeToggle
```

Questions are grouped in rounds of 19: question `n` counts toward gift `n % 19`, and each gift's score is the sum of its 7 answers (0–21).

## Credits

Assessment content is taken from *Network Participant's Guide* by Don Cousins, Bill Hybels, and Bruce Bugbee. Copyright 1994 by Willow Creek Community Church. Used by permission of Zondervan.

Built by [Vince Mitchell](https://www.vincemitchell.me).
