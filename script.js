const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span ");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const accuracyEl = document.querySelector(".accuracy span");
const tryAgainBtn = document.querySelector("#try-again-btn");
const setTimeEl = document.querySelector("#set-time");

function loadParagraph() {
  const paragraphs = [
    "Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "We cannot solve problems with the kind of thinking we employed when we came up with them."
    "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind",
    "“There are three gates to self-destruction and hell; Lust, Anger & Greed",
    "Among all kinds of killers, time is the ultimate because time kills everything.",
    "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind",
  ];

  const randomIndex = Math.floor(Math.random() * paragraphs.length);

  typingText.innerHTML = "";

  for (const char of paragraphs[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }

  const firstSpan = document.querySelectorAll("span")[0];
  if (firstSpan) {
    firstSpan.classList.add("active");
  }
}

document.addEventListener("keydown", () => input.focus());

let timer;
let maxTime = 30;
let leftTime = maxTime;
let charIndex = 0;
let isTyping = false;
let mistakeCount = 0;
let correctChars = 0;
let totalChars = 0;
let accuracy = 0;

//updating max time

setTimeEl.addEventListener("change", (e) => {
  maxTime = e.target.value;
  time.textContent = maxTime;
});
time.textContent = maxTime;

// starting game

function startGame() {
  loadParagraph();
  reset();
  startTimer();
}

document.querySelector("#start-btn").addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    reset();
  }
  if (e.code === "Enter") startGame();
});

//

input.addEventListener("input", initTyping);

function initTyping() {
  if (!isTyping) {
    isTyping = true;
  }

  console.log(maxTime);
  const char = Array.from(typingText.querySelectorAll("span"));
  const typedItem = input.value.charAt(charIndex);

  if (charIndex < char.length && leftTime > 0) {
    if (char[charIndex].textContent === typedItem) {
      char[charIndex].classList.add("correct");
      correctChars++;
    } else {
      char[charIndex].classList.add("incorrect");
      mistakeCount++;
    }

    charIndex++;
    totalChars++;
  } else {
    clearInterval(timer);

    const correctWords = correctChars / 5;
    const wpmValue = (correctWords / (maxTime / 60)).toFixed(2);
    const cpmValue = ((correctChars / maxTime) * 60).toFixed(2);
    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);

    mistakes.textContent = mistakeCount;
    wpm.innerHTML = wpmValue;
    cpm.textContent = cpmValue;
    accuracyEl.textContent = `${accuracy}%`;
  }
}

tryAgainBtn.addEventListener("click", () => {
  reset();
  startGame();
});

function reset() {
  input.value = "";
  clearInterval(timer);
  charIndex = 0;
  mistakeCount = 0;
  correctChars = 0;
  totalChars = 0;
  accuracy = 0;
  isTyping = false;
  mistakes.textContent = 0;
  wpm.textContent = 0;
  cpm.textContent = 0;
  time.textContent = maxTime;
  accuracyEl.textContent = "0%";
  typingText.querySelectorAll("span").forEach((span) => {
    span.classList.remove("correct", "incorrect", "active");
  });
}

function startTimer() {
  leftTime = maxTime;
  timer = setInterval(() => {
    if (leftTime > 0) {
      leftTime--;
      time.innerHTML = leftTime;
    } else {
      clearInterval(timer);
    }
  }, 1000);
}
