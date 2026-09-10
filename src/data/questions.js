/**
 * Each question stores the correct answer text separately.
 * Options are shuffled at load time so the correct answer
 * lands in a random position every playthrough.
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(question, correctAnswer, wrongAnswers) {
  const options = shuffle([correctAnswer, ...wrongAnswers]);
  return { question, options, correct: options.indexOf(correctAnswer) };
}

/* Rosh Hashanah trivia — correct answer first, then the wrong options */
const questions = [
  buildQuestion(
    "Which animal's horn is the classic shofar?",
    "A ram",
    ["A cow", "A goat", "A unicorn"]
  ),
  buildQuestion(
    "Legend says a pomegranate has exactly how many seeds?",
    "613, one per mitzvah",
    ["100", "5787", "Nobody has ever finished counting"]
  ),
  buildQuestion(
    "What do we symbolically throw into the water at Tashlich?",
    "Our sins",
    ["Last year's honey cake", "Coins for luck", "The Wi-Fi password"]
  ),
  buildQuestion(
    "Why is there a fish head on the table?",
    "\"Be a head, not a tail\"",
    ["Fish are naturally sweet", "The cat insisted", "It's cheaper than brisket"]
  ),
  buildQuestion(
    "Whose story is read from the Torah on the second day?",
    "Isaac — the Akeidah",
    ["Jonah and the whale", "Noah and the ark", "David vs Goliath"]
  ),
];

export const correctFeedback = [
  "Correct. Sweet.",
  "Verified. Honey-grade.",
  "Strong answer.",
  "Confirmed.",
  "That checks out.",
  "Written and sealed.",
  "Shofar-level correct.",
];

export const wrongFeedback = [
  "That's concerning.",
  "We'll ignore that.",
  "Not your best moment.",
  "Noted. Moving on.",
  "Interesting choice…",
  "Tashlich that one.",
  "The fish head disagrees.",
];

export default questions;
