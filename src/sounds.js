/**
 * Retro arcade sounds using Web Audio API.
 * No audio files needed — synthesized on the fly.
 * Only works after a user gesture (tap/click) which satisfies iOS autoplay policy.
 */

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/* Helper: play a note with square wave */
function note(ctx, freq, startTime, duration, vol = 0.08) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "square";
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(vol, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

/** Short retro "blip" for general button presses */
export function playPress() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "square";
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.1);
}

/** Higher pitched "ding" for correct answers */
export function playCorrect() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "square";
  osc.frequency.setValueAtTime(500, ctx.currentTime);
  osc.frequency.setValueAtTime(700, ctx.currentTime + 0.08);
  osc.frequency.setValueAtTime(900, ctx.currentTime + 0.16);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/** Low buzz for wrong answers */
export function playWrong() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = "square";
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.25);
}

/**
 * Landing page chiptune — looping retro melody.
 * Returns a stop function to kill it when leaving the page.
 */
let landingNodes = null;

export function playLandingMusic() {
  stopLandingMusic();
  const ctx = getContext();
  const t = ctx.currentTime;

  /* Simple catchy 8-bar loop — retro arcade idle screen vibe */
  const melody = [
    [330, 0.2], [392, 0.2], [440, 0.2], [524, 0.4],
    [492, 0.2], [440, 0.2], [392, 0.4],
    [330, 0.2], [350, 0.2], [392, 0.2], [440, 0.4],
    [392, 0.2], [350, 0.2], [330, 0.4],
    [294, 0.2], [330, 0.2], [392, 0.2], [440, 0.4],
    [524, 0.2], [492, 0.2], [440, 0.4],
    [392, 0.2], [440, 0.2], [524, 0.2], [588, 0.4],
    [524, 0.2], [440, 0.2], [392, 0.6],
  ];

  /* Bass line — simple root notes */
  const bass = [
    [165, 0.4], [165, 0.4], [196, 0.4], [220, 0.4],
    [196, 0.4], [196, 0.4], [165, 0.4], [165, 0.4],
    [147, 0.4], [147, 0.4], [165, 0.4], [196, 0.4],
    [220, 0.4], [220, 0.4], [196, 0.4], [196, 0.8],
  ];

  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.07, t);
  masterGain.connect(ctx.destination);

  const oscs = [];
  let loopLen = 0;

  /* Calculate loop length */
  let melodyLen = 0;
  melody.forEach(([, dur]) => { melodyLen += dur; });
  loopLen = melodyLen;

  /* Schedule multiple loops ahead */
  for (let loop = 0; loop < 8; loop++) {
    let offset = loop * loopLen;

    /* Melody */
    let pos = 0;
    melody.forEach(([freq, dur]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(masterGain);
      osc.type = "square";
      osc.frequency.setValueAtTime(freq, t + offset + pos);
      g.gain.setValueAtTime(0.6, t + offset + pos);
      g.gain.exponentialRampToValueAtTime(0.001, t + offset + pos + dur * 0.9);
      osc.start(t + offset + pos);
      osc.stop(t + offset + pos + dur);
      oscs.push(osc);
      pos += dur;
    });

    /* Bass */
    let bpos = 0;
    bass.forEach(([freq, dur]) => {
      if (bpos >= loopLen) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g);
      g.connect(masterGain);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t + offset + bpos);
      g.gain.setValueAtTime(0.8, t + offset + bpos);
      g.gain.exponentialRampToValueAtTime(0.001, t + offset + bpos + dur * 0.9);
      osc.start(t + offset + bpos);
      osc.stop(t + offset + bpos + dur);
      oscs.push(osc);
      bpos += dur;
    });
  }

  landingNodes = { oscs, masterGain };
}

export function stopLandingMusic() {
  if (landingNodes) {
    landingNodes.masterGain.gain.setValueAtTime(0, getContext().currentTime);
    landingNodes.oscs.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    landingNodes = null;
  }
}

/**
 * Victory fanfare — plays once on the final reveal.
 * Classic "you won!" ascending chiptune melody.
 */
export function playVictory() {
  const ctx = getContext();
  const t = ctx.currentTime;

  const fanfare = [
    /* Quick ascending intro */
    [392, 0.12], [440, 0.12], [494, 0.12], [524, 0.12],
    /* Hold the high note */
    [588, 0.3],
    /* Pause */
    [0, 0.1],
    /* Triumphant phrase */
    [524, 0.15], [588, 0.15], [660, 0.15], [784, 0.5],
    /* Pause */
    [0, 0.15],
    /* Final big chord arpeggio */
    [524, 0.12], [660, 0.12], [784, 0.12], [1048, 0.8],
  ];

  let pos = 0;
  fanfare.forEach(([freq, dur]) => {
    if (freq > 0) {
      note(ctx, freq, t + pos, dur, 0.1);
      /* Add harmony an octave below */
      note(ctx, freq / 2, t + pos, dur, 0.05);
    }
    pos += dur;
  });
}
