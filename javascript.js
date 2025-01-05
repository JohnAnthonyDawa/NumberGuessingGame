let randomNumber;
let maxRange = 100; // Default to Easy
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const feedback = document.getElementById('feedback');
const submitGuess = document.getElementById('submitGuess');
const restartGame = document.getElementById('restartGame');
const difficultySelect = document.createElement('select'); // Difficulty selector

// Add difficulty options
difficultySelect.id = 'difficulty';
difficultySelect.innerHTML = `
  <option value="100" selected>Easy (1-100)</option>
  <option value="250">Medium (1-250)</option>
  <option value="500">Hard (1-500)</option>
`;

// Insert the difficulty selector before the input field
guessInput.parentNode.insertBefore(difficultySelect, guessInput);

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * maxRange) + 1;
}

// Generate initial random number
generateRandomNumber();

// Listen for difficulty changes
difficultySelect.addEventListener('change', () => {
  maxRange = parseInt(difficultySelect.value, 10);
  restartGame.click(); // Automatically restart the game when difficulty changes
});

// Function to check the user’s guess
submitGuess.addEventListener('click', () => {
  const userGuess = parseInt(guessInput.value, 10);

  // Validate input
  if (isNaN(userGuess) || userGuess < 1 || userGuess > maxRange) {
    feedback.textContent = `Please enter a valid number between 1 and ${maxRange}.`;
    feedback.style.color = "red";
    return;
  }

  attempts++;
  if (userGuess === randomNumber) {
    feedback.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts.`;
    feedback.style.color = "green";
    submitGuess.disabled = true;
    restartGame.classList.remove('hidden');
  } else if (userGuess < randomNumber) {
    feedback.textContent = `📉 Too low! You've tried ${attempts} time(s).`;
    feedback.style.color = "orange";
  } else {
    feedback.textContent = `📈 Too high! You've tried ${attempts} time(s).`;
    feedback.style.color = "orange";
  }

  guessInput.value = '';
  guessInput.focus(); // Keep focus on the input field
});

// Restart the game
restartGame.addEventListener('click', () => {
  generateRandomNumber();
  attempts = 0;
  feedback.textContent = '';
  feedback.style.color = "black";
  submitGuess.disabled = false;
  restartGame.classList.add('hidden');
  guessInput.value = '';
  guessInput.focus(); // Focus the input for convenience
});
