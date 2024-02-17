/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 6,
  Normal: 4,
  Hard: 3,
};

// Default Level
let defaultLevelName = Object.keys(lvls)[1]; // Change Level From Here
let defaultLevelSeconds = Object.values(lvls)[1];

// Catch Selectors
let startButton = document.querySelector(".start");
let selectLvls = document.querySelector(".message .lvls");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let gameInstructions = document.querySelector(".game-instructions")
let gameInstructionsPara = document.querySelector(".game-instructions .para")

// Setting Level Name + Seconds + Score
secondsSpan.textContent = lvls[selectLvls.value];
timeLeftSpan.innerHTML = lvls[selectLvls.value];
scoreTotal.innerHTML = words.length;

selectLvls.oninput = () => {
  if (selectLvls.value == Object.keys(lvls)[0]) {
    secondsSpan.textContent = lvls[selectLvls.value];
    timeLeftSpan.innerHTML = lvls[selectLvls.value];
    scoreTotal.innerHTML = easyrandomWordLvl.length;
  } else if (selectLvls.value == Object.keys(lvls)[1]) {
    secondsSpan.textContent = lvls[selectLvls.value];
    timeLeftSpan.innerHTML = lvls[selectLvls.value];
    scoreTotal.innerHTML = normrandomWordLvl.length;
  } else if (selectLvls.value == Object.keys(lvls)[2]) {
    secondsSpan.textContent = lvls[selectLvls.value];
    timeLeftSpan.innerHTML = lvls[selectLvls.value];
    scoreTotal.innerHTML = hardrandomWordLvl.length;
  }
};

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          document.querySelector(".win").play();
          let spanText = document.createTextNode("Congrats");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        document.querySelector(".lose").play();
        let spanText = document.createTextNode("Game Over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}


gameInstructionsPara.innerHTML = `- Press Start Playing To Start The Game.
<br>- Pay Attention To The Timer In Time Left.
<br><br>- If You Choose ${Object.keys(lvls)[0]} Level, You Have [ ${
  lvls.Easy
} ] Seconds To Write The Word.
<br>- If You Choose ${Object.keys(lvls)[1]} Level, You Have [ ${
  lvls.Normal
} ] Seconds To Write The Word.
<br>- If You Choose ${Object.keys(lvls)[2]} Level, You Have [ ${
  lvls.Hard
} ] Seconds  To Write The Word.`;