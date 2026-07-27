# Synaptix

Public landing page for Synaptix — secure exchange infrastructure for large clinical data,
starting with EEG and synchronized video.

Built with Vite, React, and Tailwind CSS. Static, single-page site with no backend.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Production build

```bash
npm run build
```

Output is written to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Linting

```bash
npm run lint
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, import the repository. The Vite framework preset is detected automatically
   (build command `npm run build`, output directory `dist`).
3. If you use `NEXT_PUBLIC_DEMO_URL` (see below), add it as an Environment Variable in the
   Vercel project settings before deploying.

## Configuring the demo link

The "View Demo" / "Open Demo" buttons link to the URL in the `NEXT_PUBLIC_DEMO_URL`
environment variable. Set it locally by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

```
NEXT_PUBLIC_DEMO_URL=https://your-demo-url.example.com
```

If the variable is not set, those buttons link to the in-page `#demo` section instead.

## Page structure

- `src/App.jsx` — page shell: `Navbar`, page content, `Footer`.
- `src/pages/Home.jsx` — composes the page sections in order.
- `src/components/`
  - `Navbar.jsx` — sticky top navigation.
  - `Hero.jsx` / `ProductMockup.jsx` — hero section and the illustrative product preview.
  - `Problem.jsx` — the current-workflow-vs-Synaptix-workflow comparison.
  - `ProductWorkflow.jsx` — the four-step product workflow and capability list.
  - `WhyEEG.jsx` — why the platform starts with EEG.
  - `Vision.jsx` — long-term expansion vision.
  - `ArchitectureStrip.jsx` — technical architecture strip and disclaimer.
  - `DemoCTA.jsx` — closing demo call-to-action.
  - `Footer.jsx` — footer links and legal line.
  - `Reveal.jsx` — small IntersectionObserver wrapper for subtle entrance animations.
