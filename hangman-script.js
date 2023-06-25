const words = ['hangman', 'javascript', 'programming', 'openai'];
const wordDisplay = document.getElementById('word-display');
const guessesContainer = document.getElementById('guesses');
const livesContainer = document.getElementById('lives');
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');

let chosenWord = '';
let guesses = [];
let lives = 5;

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guesses = [];
  lives = 5;
  wordDisplay.textContent = getHiddenWord(chosenWord);
  guessesContainer.textContent = '';
  livesContainer.textContent = '';
  updateLives();
}

function getHiddenWord(word) {
  let hiddenWord = '';
  for (let i = 0; i < word.length; i++) {
    if (guesses.includes(word[i])) {
      hiddenWord += word[i];
    } else {
      hiddenWord += '-';
    }
  }
  return hiddenWord;
}

function updateGuesses() {
  guessesContainer.textContent = guesses.join(', ');
}

function updateLives() {
  livesContainer.innerHTML = '';
  for (let i = 0; i < lives; i++) {
    const heartIcon = document.createElement('i');
    heartIcon.classList.add('fa-solid', 'fa-heart');
    livesContainer.appendChild(heartIcon);
  }
}

function guessLetter() {
  const letter = guessInput.value.toLowerCase();
  guessInput.value = '';
  if (letter && !guesses.includes(letter) && lives > 0) {
    guesses.push(letter);
    updateGuesses();
    const hiddenWord = getHiddenWord(chosenWord);
    wordDisplay.textContent = hiddenWord;
    if (!hiddenWord.includes('-')) {
      setTimeout(() => {
        alert('Congratulations! You won!');
        startGame();
      }, 200);
    } else if (!chosenWord.includes(letter)) {
      lives--;
      updateLives();
      if (lives === 0) {
        setTimeout(() => {
          alert('Game over! You lost.');
          startGame();
        }, 200);
      }
    }
  }
}

startGame();

guessBtn.addEventListener('click', guessLetter);
guessInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    guessLetter();
  }
});
