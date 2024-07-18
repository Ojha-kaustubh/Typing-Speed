const typingText = document.querySelector(".typing-text p");
const input = document.querySelector(".wrapper .input-field");
const time = document.querySelector(".time span b");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

function loadParagraph() {
  const paragraphs = [
    "Avoid daydreaming about the years to come.",
    "You are the most important person in your whole life.",
    "Always be true to who you are, and ignore what other people have to say about you.",
    "Only demonstrate your strength when it’s really required.",
    "“There are three gates to self-destruction and hell; Lust, Anger & Greed",
    "Among all kinds of killers, time is the ultimate because time kills everything.",
    "Calmness, gentleness, silence, self-restraint, and purity: these are the disciplines of the mind",
  ];

  const randomIndex = Math.floor(Math.random() * paragraphs.length);

  typingText.innerHTML = "";

  for (const char of paragraphs[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
  }


  const firstSpan = document.querySelectorAll('span')[0];
  if (firstSpan) {
    firstSpan.classList.add('active');
  }

document.addEventListener('keydown',()=>input.focus());
document.addEventListener("click",()=>{
    input.focus()})
}

input.addEventListener('input', initTyping);

let timer;
const maxTime = 60;
let leftTime = maxTime;
let charIndex = 0;
let isTyping = false;
let mistakeCount = 0;
let correctChars = 0;
let totalChars = 0;

function initTyping() {
  const char = typingText.querySelectorAll('span');
  const typedItem = input.value.charAt(charIndex);

  if (charIndex < char.length && leftTime > 0) {
    if (char[charIndex].innerHTML === typedItem) {
      char[charIndex].classList.add('correct');
      // correctChars++;

    } else {
      char[charIndex].classList.add('incorrect');
      mistakeCount++;
      mistakes.innerHTML = mistakeCount;
    }

    charIndex++;
    // totalChars++;
  } else {
    clearInterval(timer);


    const correctWords = correctChars / 5; 
    const wpmValue = (correctWords / (maxTime / 60)).toFixed(2);
    const cpmValue = ((correctChars / maxTime) * 60).toFixed(2);

    wpm.innerHTML = wpmValue;
    cpm.innerHTML = cpmValue;
  }
}

btn.addEventListener('click', tryAgain);

function tryAgain() {
  loadParagraph();
  clearInterval(timer);
  charIndex = 0;
  mistakeCount = 0;
  correctChars = 0;
  totalChars = 0;
  mistakes.innerHTML = 0;
  wpm.innerHTML = 0;
  cpm.innerHTML = 0;
  time.innerHTML = maxTime;

  startTimer();
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

loadParagraph();
startTimer();
