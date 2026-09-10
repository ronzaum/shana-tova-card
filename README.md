# Shana Tova 5787 🍎🍯

An interactive, retro-arcade "new year system update" — a humorous Rosh Hashanah 5787 card. Same five-screen flow as Dan's birthday card, re-skinned with Hebrew fonts, a honey/pomegranate palette, and a pomegranate-seed rain instead of confetti.

Rosh Hashanah 5787 begins the evening of Fri 11 Sep 2026.

## How It Works

1. **Landing** — "NEW YEAR SYSTEM UPDATE" splash with retro stats (Threat: HONEY, Year: 5787, Status: SWEET)
2. **Scan** — an 8 s "installing year 5787" phase with video + chiptune
3. **Questions** — 7 humorous Rosh Hashanah trivia questions
4. **Result** — sweetness confidence reveal
5. **Final** — LVL 5787 UNLOCKED, שנה טובה ומתוקה, a random Hebrew/English quote, pomegranate arils falling, replay

## Tech Stack

- React 19 + Vite
- Custom `<canvas>` particle animation (`PomegranateRain.jsx`)
- Fonts: Press Start 2P, VT323, Space Grotesk, Rubik Pixels (Hebrew display), Suez One (Hebrew body)
- CSS variables for the palette (`--gold`, `--orange`, `--orange-deep`, `--cream`, `--red`, `--red-deep`)

## Media (in `public/`)

| File | Purpose |
| --- | --- |
| `landing-bg.jpg` | Landing background (Image A) |
| `reveal.jpg` | Final reveal image (Image B) |
| `transition.mp4` | Scan video, 8 s, 720×1280, with audio (Video A) |
| `identity-video.mp4` | Final video, 8 s, 720×1280, with audio (Video B) |

## Development

```bash
npm install
npm run dev
```

## Deployment

```bash
npm run deploy
```

Builds and pushes to the `gh-pages` branch, served at `ronzaum.github.io/shana-tova-card/`.
