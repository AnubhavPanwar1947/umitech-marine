# UMITECH Marine Rebuild

Independent Next.js rebuild of the public UMITECH Marine Consultants homepage.

Reference site: https://www.umitech.co.jp/

This project is intentionally separate from `pelagic-marine`.

## Tech stack

- Next.js App Router
- JavaScript / JSX
- Plain CSS + CSS Modules
- Semantic HTML
- `next/image` for responsive images

## Getting started

```bash
cd C:\Users\Admin\Projects\umitech-marine-rebuild
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start local development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint

## Folder structure

```text
src/
  app/
    globals.css
    layout.js
    page.js
  components/
    Header.js
    MobileNav.js
    Hero.js
    StatsGrid.js
    ServicesGrid.js
    AboutSection.js
    Testimonials.js
    ContactSection.js
    Footer.js
  lib/
    site-data.js
public/
  images/
    logo-placeholder.svg
    hero-placeholder.svg
    about-placeholder.svg
    service-*.svg
```

## Replace placeholder assets

Do not hotlink assets from the live reference site. Replace these local placeholders when approved assets are available:

- `public/images/logo-placeholder.svg`
- `public/images/hero-placeholder.svg`
- `public/images/about-placeholder.svg`
- `public/images/service-naval.svg`
- `public/images/service-engineering.svg`
- `public/images/service-inspection.svg`
- `public/images/service-legal.svg`

Update paths in `src/lib/site-data.js` if filenames change.

## Contact form

The contact form is frontend-only for now. See the TODO in `src/components/ContactSection.js` before connecting email delivery or a backend.

## Responsive testing

Test at:

- 190px
- 320px
- 375px
- 480px
- 768px
- 1024px
- 1280px
- 1440px

Confirm there is no horizontal scrolling, clipped buttons, or unreadable text.
