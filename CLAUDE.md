# CLAUDE.md

## Project Overview

Shana Tova 5787 card — a retro arcade-themed interactive Rosh Hashanah quiz web app. Forked from Dan's 60th birthday card; flow, timings and sounds are unchanged.

## Structure

- `src/App.jsx` — Main component managing screen state, transitions, and persistent videos
- `src/components/` — Screen components: Landing, Scan, Question, Result, Final, RetroBackground, PomegranateRain
- `src/data/questions.js` — Quiz questions, feedback pools, and the 10 rotating quotes
- `src/sounds.js` — Web Audio chiptune sounds
- `src/styles.css` — All styling (palette lives in the `:root` CSS variables block); `index.css` is intentionally empty
- `public/` — Media: `landing-bg.jpg`, `reveal.jpg`, `transition.mp4`, `identity-video.mp4`, `favicon.svg`

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run deploy` — Build and deploy to GitHub Pages (gh-pages branch)

## Notes

- Vite base path is `/shana-tova-card/` for GitHub Pages subdirectory hosting
- Uses `gh-pages` package for deployment
- Videos must be ~8 s, 720×1280, with audio — scan screen waits 8000 ms, final phases fire at 2.4/4.2/6.2/8.2 s
- Fonts from Google Fonts: Press Start 2P, VT323, Space Grotesk, Rubik Pixels (Hebrew headlines, `.he`), Suez One (Hebrew body, `.he-body`)
- Palette: `--gold #F5B301`, `--orange #FF8C1A`, `--orange-deep #D9700F`, `--cream #FFF4D6`, `--red #C41E3A`, `--red-deep #7A0E20`
