# HawkTalk — Landing Site & AI Chat Simulator

Promotional website for **HawkTalk**, the Smart Campus-Enabled Student Support System of Cagayan State University.

- `/` — landing page
- `/demo` — interactive, **scripted** chat simulator (no backend, no API keys)

Every “Try HawkTalk / Open App / Get Started” button links to **https://hawktalk.pages.dev**.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

Deploys as a static site (e.g. Cloudflare Pages: build command `npm run build`, output `dist`).
`public/_redirects` makes deep links like `/demo?q=…` work on refresh.

## Editing content

| What | Where |
|---|---|
| All landing-page copy, links, FAQ, team, features | `src/data/site.ts` |
| Google Play link (currently `#`) | `PLAY_STORE_URL` in `src/data/site.ts` |
| Demo scenarios S1–S10, fallback reply, status texts, mock chat history | `src/data/demoScenarios.ts` |
| Quick topics (Academics, Admissions, …) and their answers | `src/data/quickTopics.ts` |
| Brand colors | `src/styles/tokens.css` |

> ⚠️ Fees, grade ranges, office locations, page numbers and URLs in the demo data are **placeholders**
> (marked `PLACEHOLDER` / *(placeholder)*). Replace them with real CSU information before launch.

### Logo and images

- Replace `public/hawktalk_logo.png` with the real logo (square PNG works best). It is used for the
  navbar, favicon, chat avatar and hero.
- `public/og-image.png` is the social-share preview image (1200×630).
- Map photos and the sample “attached picture” live in `public/demo/` — swap the SVG placeholders for
  real photos and update the `photo` paths in `demoScenarios.ts`.

### How scenario matching works

Typed messages are lower-cased and split into words. Each scenario has `keywords` — groups of words that
must all appear (exact match, prefix match for 4+ letters, small typo tolerance for 6+ letters). The best
scoring scenario wins; scenarios with `requiresContext` (follow-ups like “what about for graduate
students?”) only match after one of the listed scenarios. Anything unmatched gets the friendly fallback.

### Deep links

`/demo?q=<question>` auto-sends the question when the page opens. The example chips on the landing page
use this.

## Stack

Vite · React 18 · TypeScript · React Router · react-markdown + remark-gfm · react-helmet-async · lucide-react
