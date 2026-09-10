# Shana Tova 5787 Card — Implementation Plan

**Overall Progress:** `100%`

## TLDR
Clone Dan's birthday-card app into a new sibling repo `shana-tova-card` and re-skin it as a generic, humorous Rosh Hashanah 5787 card. Same five-screen flow, same timings, same sounds. Only text, questions, colors, fonts (add Hebrew), media, and the confetti (→ pomegranate seeds) change. Dad's repo stays untouched and live.

Rosh Hashanah 5787 begins evening of Fri 11 Sep 2026 (1 Tishrei = Sat 12 Sep 2026).

## Critical Decisions
- **Separate repo, not subfolder** — GitHub Pages serves one site per repo; a subfolder split would force a dual-build config and touch Dad's deploy. New repo = `ronzaum/shana-tova-card`, served at `ronzaum.github.io/shana-tova-card/`. Dad's repo is never modified.
- **Fresh `git init`, no history** — Dad's history carries ~19 MB of raw Gemini/Veo files; new repo starts clean.
- **Flow, timings, sounds, `App.jsx` logic unchanged** — scan still 8000 ms, final phases still 2.4/4.2/6.2/8.2 s. New videos must be ~8 s, 720×1280, with audio, so no timing edits.
- **Media pipeline: Gemini image → Veo image-to-video** — matches how the originals were made (Veo watermark on both). Ron generates 2 images + 2 videos from prompts in this plan; Claude wires them in. Claude cannot generate raster images or video.
- **Pomegranate arils via own `<canvas>` particle component, drop `canvas-confetti`** — confetti lib can't draw shaded seeds with an inner pit. Custom 2D canvas can.
- **CSS variables for palette** — original hardcodes `#FFAB00` ~60×; variables make the gold/orange/cream/red swap a one-block change.
- **Hebrew fonts** — Press Start 2P and VT323 have no Hebrew glyphs. Add Google Fonts `Rubik Pixels` (pixel display, Hebrew subset confirmed) for Hebrew headlines and `Suez One` (Hebrew subset confirmed) for Hebrew body/quotes.
- **Greetings** — "Gmar Chatima Tova" is the Yom Kippur greeting. Card uses Rosh Hashanah ones: שנה טובה ומתוקה (Shana Tova U'Metuka) and כתיבה וחתימה טובה (Ktiva v'Chatima Tova).
- **10 rotating quotes, random pick on mount** — trivial (`Math.random()` index), so implemented rather than single quote.
- **Signature: "From Ron"** only.

## Content (approved drafts — edit in place if desired)

### Trivia (7 questions; correct answer listed first, then wrong options)
1. Which animal's horn is the classic shofar? — **A ram** / A cow / A goat / A unicorn
2. Which of these is NOT a real shofar blast? — **Tekiah Espresso** / Tekiah / Shevarim / Teruah
3. Legend says a pomegranate has exactly how many seeds? — **613, one per mitzvah** / 100 / 5787 / Nobody has ever finished counting
4. What do we symbolically throw into the water at Tashlich? — **Our sins** / Last year's honey cake / Coins for luck / The Wi-Fi password
5. Why is there a fish head on the table? — **"Be a head, not a tail"** / Fish are naturally sweet / The cat insisted / It's cheaper than brisket
6. How many shofar blasts are traditionally sounded on Rosh Hashanah? — **100** / 7 / 18 / 613
7. Whose story is read from the Torah on the second day? — **Isaac — the Akeidah** / Jonah and the whale / Noah and the ark / David vs Goliath

Correct feedback pool: "Correct. Sweet.", "Verified. Honey-grade.", "Strong answer.", "Confirmed.", "That checks out.", "Written and sealed.", "Shofar-level correct."
Wrong feedback pool: "That's concerning.", "We'll ignore that.", "Not your best moment.", "Noted. Moving on.", "Interesting choice…", "Tashlich that one.", "The fish head disagrees."

### Screen copy
- **Landing** chips: `SYS ONLINE` · `TISHREI 1` · `YR 5787`. Title: `NEW YEAR SYSTEM UPDATE`. Subtitle: `Rosh Hashanah detected.` Body: `Year 5787 is ready to install. Complete verification to unlock your next level.` Stats: `THREAT: HONEY` · `YEAR: 5787` · `STATUS: SWEET`. Button: `START UPDATE`.
- **Scan** lines: `Scanning honey levels…` / `Counting pomegranate seeds…` / `Tuning shofar…` / `Cross-referencing Book of Life…` / `Installing year 5787…`
- **Result**: `Analysis Complete` / `Sweetness confidence` / `Final verification in progress…`
- **Final** phase 0: `INSTALLING NEW YEAR…`; phase 1: `UPDATE COMPLETE`; phase 2: big `5787` + `LVL 5787 UNLOCKED` + year-meaning line (replaces STATUS line); phase 3: `שנה טובה` / `Shana Tova`; phase 4 reveal: banner `LVL 5787 UNLOCKED`, big `שנה טובה ומתוקה`, small `Shana Tova U'Metuka · Ktiva v'Chatima Tova`, quote banner (random of 10, Hebrew + English), `From Ron`, Replay.
- **Year-meaning line (phase 2)**: `5787 is written תשפ״ז. Tradition reads the letters as a wish — תהא שנת פריחה וזריחה, "may it be a year of blossoming and sunrise." It ends in 7: the number of completion.`

### Quotes (10, Hebrew + English)
1. שנה טובה ומתוקה — A good and sweet year.
2. כתיבה וחתימה טובה — May you be written and sealed for good.
3. תכלה שנה וקללותיה, תחל שנה וברכותיה — Let the old year and its curses end; let the new year and its blessings begin.
4. עושה שלום במרומיו, הוא יעשה שלום עלינו ועל כל העולם — May the One who makes peace above bring peace to us and to all the world.
5. שנת שלום לכולם — A year of peace for all.
6. היום הרת עולם — Today the world is born.
7. שתהיה שנה של התחלות חדשות — May it be a year of new beginnings.
8. תפוח בדבש ולב מלא — An apple in honey, and a full heart.
9. שנת בריאות, נחת ושמחה — A year of health, nachat and joy.
10. שתהיה שנה של אור — May it be a year of light.

### Palette (CSS variables)
`--gold: #F5B301` (replaces `#FFAB00`) · `--orange: #FF8C1A` (replaces `#ff8c00`) · `--orange-deep: #D9700F` (replaces `#cc8800`) · `--cream: #FFF4D6` (replaces decorative `#fff`) · `--red: #C41E3A` · `--red-deep: #7A0E20`. Red = hints only: one landing chip, two background stripes, one stat-box border, pomegranate arils, quote-banner left border. Correct green / wrong red on option buttons unchanged.

### Media prompts (Ron generates; 9:16 portrait)
**Image A — landing background + source for scan video** (Gemini / Nano Banana):
> Retro 16-bit pixel-art comic illustration inside a black handheld game-console frame with a header label "CONSOLE EDITION" and a score counter "5787". A cheerful bearded rabbi in a black hat and coat stands at a festive Rosh Hashanah table, grinning, holding up a shofar in one hand and a dripping jar of honey in the other. On the table: apples in honey, sliced pomegranates, dates, a round challah, a glass of milk, a fish head on a plate. Warm palette: golden yellow, orange, cream white, small pomegranate-red accents. Japanese-style comic action text "ブオォ!" near the shofar. Happy, gimmicky, humorous, festive, religious-but-playful. Vertical 9:16, sharp pixels, no blur, no real-photo elements.

**Image B — final reveal + source for final video** (Gemini / Nano Banana):
> Retro 16-bit pixel-art comic, two-panel vertical fighting-game "boss encounter" layout inside a black handheld console frame. Header text "LEVEL 5787 UNLOCKED". Top panel: a joyful bearded rabbi pointing at the viewer with a shofar over his shoulder, label "RABBI". Bottom panel: a smiling Jewish woman in an elegant dress and headscarf pointing at the viewer, holding a tray with apples, honey, dates and a pomegranate, label "BALABUSTA". Between panels a "READY" badge. Life bar at bottom filled with pomegranate seeds. Palette: golden yellow, orange, cream white, pomegranate-red accents. Comic burst text "שנה טובה!" in pixel style. Happy, humorous, festive. Vertical 9:16, crisp pixels.

**Video A — scan** (Veo, image-to-video from Image A, 8 s, with sound):
> Animate this pixel-art scene: the rabbi raises the shofar and blows it, cheeks puffed, honey drips from the jar, pomegranate seeds bounce on the table, screen has subtle CRT scanline flicker. Camera static. Sound: a long shofar blast (tekiah) with 8-bit chiptune sparkle. Loop-friendly, 8 seconds.

**Video B — final** (Veo, image-to-video from Image B, 8 s, with sound):
> Animate this two-panel pixel-art scene: both characters point at the viewer, wink, and laugh; the "READY" badge flashes; pomegranate seeds fall across the screen; the life bar fills up. Camera static. Sound: upbeat 8-bit victory jingle with a short shofar blast at the end. 8 seconds.

Deliverables into `public/`: `landing-bg.png` (Image A), `reveal.png` (Image B), `transition.mp4` (Video A), `identity-video.mp4` (Video B). Keep filenames; App/Scan/Final reference them. If Veo output isn't 8 s, trim to 8 s with ffmpeg before dropping in.

## Tasks

- [x] 🟩 **Step 1: Scaffold new repo `shana-tova-card`**
  - [x] 🟩 `rsync` this repo to `/Users/ronzaum/Documents/GIT Personal/shana-tova-card/` excluding `.git`, `node_modules`, `dist`, `.DS_Store`
  - [x] 🟩 Delete in new repo: root `Gemini_Generated_Image_*.png` ×3, `Animation_Generation_Request_Fulfilled.mp4`, `Video_Ready_Shooting_At_Screen.mp4`, `public/dan.jpg`, `public/dan-retro.png`, `public/icons.svg`, `src/assets/hero.png`, `src/assets/vite.svg`, `design/`, `plans/done/*`
  - [x] 🟩 Move this plan to new repo `plans/todo/` (keep a copy here until Step 1 done)
  - [x] 🟩 `package.json`: name `shana-tova-card`; remove `canvas-confetti` dependency
  - [x] 🟩 `vite.config.js`: `base: '/shana-tova-card/'`
  - [x] 🟩 `index.html`: title `Shana Tova 5787`; add `Rubik+Pixels` and `Suez+One` to Google Fonts link; `lang="en"` stays
  - [x] 🟩 `public/favicon.svg`: inline SVG pomegranate (red circle, crown, gold highlight) replacing Vite bolt
  - [x] 🟩 Rewrite `README.md` and `CLAUDE.md` for Shana Tova card (structure, commands, base path, media filenames, font list)
  - [x] 🟩 `git init`, `npm install`, `npm run build` passes

- [x] 🟩 **Step 2: Palette → CSS variables**
  - [x] 🟩 Add `:root` block in `styles.css` with the 6 variables from Palette section
  - [x] 🟩 Replace every `#FFAB00` → `var(--gold)`, `#ff8c00` → `var(--orange)`, `#cc8800` → `var(--orange-deep)`; `rgba(255, 171, 0, X)` → `rgba(245, 179, 1, X)`
  - [x] 🟩 Decorative pure-white (`#fff` on chips, stat text glow, pixel-invader inv-2, stars, stripes 3/6) → `var(--cream)`; body text stays `#fff`
  - [x] 🟩 Red hints: `.decor-chip:nth-child(3)` bg `var(--red)` + cream text; `.stripe-4` and `.stripe-5` bg `var(--red)`; `.stat-box:nth-child(2)` border `var(--red)`; `.final-joke-banner` gets `border-left: 6px solid var(--red)`
  - [x] 🟩 Rename `.final-dan-name` → `.final-year` (CSS + Final.jsx); `.final-joke-banner` → `.final-quote-banner`; `.final-orange-banner` unchanged
  - [x] 🟩 Add `.he` class: `font-family: "Rubik Pixels", "Press Start 2P", monospace; direction: rtl; unicode-bidi: isolate;` and `.he-body`: `font-family: "Suez One", "VT323", serif; direction: rtl;`

- [x] 🟩 **Step 3: Questions data**
  - [x] 🟩 Replace the 5 `buildQuestion` calls in `src/data/questions.js` with the 7 trivia questions from Content section (correct first, wrongs after; shuffle logic unchanged)
  - [x] 🟩 Replace `correctFeedback` and `wrongFeedback` with the 7-entry pools from Content section
  - [x] 🟩 Add `export const quotes = [...]` — 10 `{ he, en }` objects from Quotes section

- [x] 🟩 **Step 4: Landing, Scan, Result copy**
  - [x] 🟩 `Landing.jsx`: chips, title, subtitle, body, 3 stat boxes, button text per Screen copy
  - [x] 🟩 `Scan.jsx`: replace `scanLines` array with 5 new lines
  - [x] 🟩 `Result.jsx`: `Identity confidence` → `Sweetness confidence` (title and trailing text unchanged)

- [x] 🟩 **Step 5: Final screen copy + quote rotation**
  - [x] 🟩 Remove `dadJoke` const and `canvas-confetti` import
  - [x] 🟩 Phase 0 text `INSTALLING NEW YEAR…`; phase 1 `UPDATE COMPLETE`
  - [x] 🟩 Phase 2: `<h2 className="final-year">5787</h2>`, `LVL 5787 UNLOCKED`, replace `STATUS: LEGENDARY` `<p>` with year-meaning line (new class `.final-meaning`: VT323 20px, cream, max-width 320px, Hebrew span inside uses `.he-body`)
  - [x] 🟩 Phase 3: `<p className="final-love he">שנה טובה</p>` + `<p className="final-love">Shana Tova</p>`
  - [x] 🟩 Phase 4: img src `reveal.png` alt `Shana Tova`; banner `LVL 5787 UNLOCKED`; `.final-love-big he` → `שנה טובה ומתוקה`; `.final-love-sm` → `Shana Tova U'Metuka · Ktiva v'Chatima Tova`; quote banner shows `quote.he` (`.he-body`) on line 1 and `quote.en` on line 2 (remove `white-space: nowrap`); add `<p className="final-from">From Ron</p>` above Replay
  - [x] 🟩 `const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], [])` — one pick per mount (Replay remounts → new quote) — *implemented as `useState(() => …)` lazy initializer: same one-pick-per-mount semantics, but passes `react-hooks/purity` lint (useMemo + Math.random is flagged)*
  - [x] 🟩 `@media (max-width: 400px)` block: update renamed selectors, add `.final-meaning { font-size: 17px }`

- [x] 🟩 **Step 6: Pomegranate seed animation (replaces confetti)**
  - [x] 🟩 New `src/components/PomegranateRain.jsx`: full-screen fixed `<canvas>` (z-index 30, pointer-events none), props `active` (bool)
  - [x] 🟩 Aril drawing: rounded teardrop path ~10–16 px, radial gradient `#E0273F` → `var(--red-deep)`, white 35%-alpha highlight ellipse top-left, inner dark pit ellipse `#3A0810` offset toward center, per-particle rotation
  - [x] 🟩 Physics: on `active` → burst of 120 arils from screen center with radial velocity (the "pomegranate breaking"), gravity 0.25 px/frame², air drag 0.99, sway `sin(t)`; plus trickle spawner adding 3 arils/frame from top edge for 6 s; particles removed below viewport; rAF loop stops when list empty
  - [x] 🟩 Handle `devicePixelRatio` scaling and `resize`
  - [x] 🟩 `Final.jsx` phase-4 effect: `playVictory()` unchanged, render `<PomegranateRain active={phase === 4} />` instead of `confetti()` calls
  - [x] 🟩 `npm run build` passes; `npm run lint` clean

- [x] 🟩 **Step 7: Media integration**
  > ⛔ Checked 10 Sep 2026: `public/reveal.png` absent; `landing-bg.png`, `transition.mp4`, `identity-video.mp4` present but are Dan's March originals (placeholders), not Ron's new media. All 4 still needed. Rubik Pixels + Suez One confirmed to ship `hebrew` subsets on Google Fonts.
  - [x] 🟩 Ron generates Image A, Image B, Video A, Video B from prompts above and drops them into `public/` under the listed filenames — *all 4 received 10 Sep. Images 1536×2752 as planned. Both videos arrived as 1280×720 landscape text-to-video (10 s); rather than block, re-laid out to 720×1280 with ffmpeg: A = 720×720 centre crop of the table scene over a blurred/darkened cover copy; B = left/right panels cropped above the READY badge and stacked vertically (matches Image B's two-panel layout). Raw sources kept untracked in `media-source/` (gitignored)*
  - [x] 🟩 Verify with `ffprobe`: both videos 720×1280, ≈8.0 s, have audio stream; trim with `ffmpeg -t 8` if longer — *both 720×1280, 8.000 s, AAC 48 kHz, 0.6 s audio fade-out; 1.6 MB and 2.4 MB*
  - [x] 🟩 Compress PNGs to ≤1.5 MB each (`sips -Z 1440` + `pngquant` or `sips -s format jpeg` if needed; update extension in `Landing.jsx`/`Final.jsx` if converted) — *Gemini delivered JPEG; re-encoded q80 as `landing-bg.jpg` / `reveal.jpg`, extensions updated in Landing.jsx, Final.jsx, README, CLAUDE.md*
  - [x] 🟩 `npm run dev`, walk full flow on desktop + iPhone (video sound on tap, Hebrew renders in Rubik Pixels/Suez One, quote changes on Replay, arils fall) — *desktop: scripted CDP walk of the production build at 393×852, all 12 screens screenshotted, videos play, zero console errors; Hebrew `.he` sizes bumped (Rubik Pixels needs ~2× Press Start size). iPhone check = Step 8 phone confirmation on the live URL*

- [ ] 🟨 **Step 8: Publish**
  - [x] 🟩 Commit all in new repo — *e02a318 on `main`*
  - [x] 🟩 `gh repo create ronzaum/shana-tova-card --public --source . --push`
  - [x] 🟩 `npm run deploy` (builds + pushes `gh-pages` branch)
  - [x] 🟩 Enable Pages: `gh api -X POST repos/ronzaum/shana-tova-card/pages -f "source[branch]=gh-pages" -f "source[path]=/"` — *enabled, https enforced*
  - [x] 🟩 Open `https://ronzaum.github.io/shana-tova-card/` on phone, confirm full flow — *Ron reviewed on iPhone 10 Sep 2026; feedback applied in Round 2 below*
  - [x] 🟩 Move this plan to `plans/done/` in new repo; delete copy from Dad's repo

## Execution
Single `/execute` run covers Steps 1–8. Steps 1–6 need nothing from Ron. Step 7 waits on Ron's 4 media files; if they are not yet in `public/` when reached, do everything else, then stop and report which files are missing. Step 8 runs only after Step 7 passes.

## Round 2 — Ron's phone feedback (10 Sep 2026), all applied
- Landing: title forced to one line (`clamp` + `nowrap`); added gold Hebrew greeting שנה טובה ומתוקה, Hebrew chips (א׳ תשרי / תשפ״ז), festive symbol line, stats → SHOFAR READY / YEAR 5787 / HONEY 100%
- Scan video: was a square centre-crop with blurred pads (read as landscape). Re-rendered as a true 9:16 pan-crop of the Veo source — 405×720 window eases from the rabbi's face to the shofar bell/honey jar over 8 s, upscaled to 720×1280
- Questions: dropped #2 (Tekiah Espresso) and #6 (100 blasts) → 5 questions
- Result screen ("Analysis Complete") removed entirely; last answer starts the final video and goes straight to Final
- Final phase 3 (Shana Tova) held 4.2 s (was 2 s) on a dark gold-bordered card; overlay darkens while it's up
- Hebrew display font: Rubik Pixels (dotted) → Rubik 900 — the dotted face was the "hard to read" complaint
- `reveal.jpg` cropped to the two characters (console frame, header, life bar removed)
- Cream quote banner removed; replaced by the year's message (5787 · תשפ״ז · תהא שנת פריחה וזריחה) with per-word pop animation and delayed English line, on the gradient — the 10 rotating quotes were dropped
- שנה טובה ומתוקה headline pops in with overshoot and breathes gold, flanked by Stars of David
- Quiet blue Stars of David (✡) on landing, retro background and final card
