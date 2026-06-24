# Leo Charles Quibuyen — Developer Portfolio

Production-ready static portfolio built with React + Vite + Tailwind CSS + Framer Motion.

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Icons
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy (GitHub Pages)

This repo is configured for GitHub Pages using the **/docs** publishing method (branch: `main`, folder: `/docs`).

1) Build and publish `dist/` into `docs/`:

```bash
npm run build:docs
```

2) Commit and push:

```bash
git add -A
git commit -m "chore: deploy"
git push
```

3) Ensure GitHub Pages is set to:

- Settings → Pages → Build and deployment
- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Your site URL:

https://leocharleskodego.github.io/online-resume/

## Notes

- The Vite base path is set to `/online-resume/` in [vite.config.ts](file:///C:/Users/Admin/Documents/portfolio/vite.config.ts) for correct GitHub Pages routing.
- The profile image is stored in [profile.png](file:///C:/Users/Admin/Documents/portfolio/public/profile.png) and is copied into the build automatically.
