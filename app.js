const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'room',
  'implicit',
  'unrest',
  'failure',
  'conflict',
  'engineer',
  'donor',
  'grant',
  'light',
  'fitness',
  'faith',
  'self',
  'colony',
  'regular',
  'electron',
  'essay',
  'fair',
  'innocent',
  'mail',
  'scale',
  'earthflax',
  'ward',
  'knock',
  'coverage',
  'lead',
  'marketing',
  'bland',
  'scream',
  'slogan',
  'chase',
  'ignite',
  'log',
  'lose',
  'soap',
  'diplomat',
  'habitat',
  'access',
  'curriculum',
  'battlefield',
  'difference',
  'fold',
  'opera',
  'morning',
  'elbow',
  'fragment',
  'empire',
  'conceive',
  'responsibility',
  'swim',
  'linear',
];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Set difficulty to value in local storage or medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Set difficult select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//Focus on text on start
text.focus();

//Start counting down
const timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

//Add word to DOM
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

//Update score
const updateScore = () => {
  score++;
  scoreEl.innerHTML = score;
};

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
}

//Game over, show end screen
const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = 'flex';
};

addWordToDOM();

//Event Listeners

//Typing
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time *= 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
