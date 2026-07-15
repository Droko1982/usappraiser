# US Appraiser — usappraiser.com

Trilingual (English · Español · Français) real-estate **appraisal lead-generation** website for the United States.
Angular 17 (standalone components + SSR/prerender), deployed as a static site on GitHub Pages.

**Live:** https://droko1982.github.io/usappraiser/
**Custom domain (pending DNS):** https://usappraiser.com

---

## Run locally

```bash
npm install        # first time only
npm start          # dev server → http://localhost:4200
```

## Deploy (publish changes)

```bash
npm run deploy     # builds and pushes to the gh-pages branch
```

This runs `deploy.sh`, which builds with the correct base-href, adds the SPA 404 fallback + `.nojekyll`,
and force-pushes the `dist/quote_appraisal/browser` output to the `gh-pages` branch.
The live site updates about a minute later.

> **Windows / Git Bash note:** always build with `MSYS_NO_PATHCONV=1` (the deploy script does this).
> Without it, Git Bash mangles `--base-href /usappraiser/` into a Windows path and breaks asset loading.

---

## Where to change things

| To edit… | File |
|---|---|
| All text & translations (EN/ES/FR) | `src/app/services/language.service.ts` |
| Colors (navy / red / white tokens) | `src/styles.css` (`:root` variables at top) |
| City landing pages (15 metros) | `src/app/data/cities.ts` |
| Per-page SEO titles/descriptions | `src/app/services/seo.service.ts` |
| Logo, favicon, social image | `src/assets/` (`logo.svg`, `logo-full.svg`, `og.svg` → rendered to PNG) |
| Phone number & lead email | `src/app/components/footer/footer.component.ts`, `src/app/components/contact/contact.component.ts` |
| Google Analytics ID | `src/index.html` (replace `G-XXXXXXXXXX`) |
| Sitemap / robots | `src/sitemap.xml`, `src/robots.txt` |

## Structure

- `src/app/components/` — `home`, `services`, `contact`, `city`, `header`, `footer`, `privacy`
- `src/app/services/` — `language` (i18n), `theme` (dark/light), `seo`
- Routes: `/`, `/services`, `/contact`, `/privacy`, `/appraisal/<city>` — all prerendered (19 static pages)

## Leads

The contact form posts to **FormSubmit** → `info@usappraiser.com`. FormSubmit requires a one-time
activation: submit the form once, then click the confirmation email sent to that inbox.

## Pending / TODO

- [ ] Replace GA4 placeholder `G-XXXXXXXXXX` with the real Analytics property ID
- [ ] Confirm the contact phone number (currently `+1 (613) 709-5311`)
- [ ] Set up the `info@usappraiser.com` mailbox and activate FormSubmit
- [ ] Point `usappraiser.com` DNS to GitHub Pages, then set the custom domain + base-href `/`
