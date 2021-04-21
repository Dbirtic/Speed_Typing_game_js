// On load event initialize the game
window.addEventListener('load', init)

// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

// To change level
const currentLevel = levels.medium;

// Global variables
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

// array of random words
const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
  ];

  // Initialize Game
  function init(){

    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;

    // Load word from array
    showWord(words);
    
    // Start matching on word input
    wordInput.addEventListener('input', startMatch);

    // Call countdown every sec
    setInterval(countdown, 1000);

    // Check Game status
    setInterval(checkStatus, 50);
  }

  // Start Match
  function startMatch(){
      if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
      }

      // Highscore based on score value for Session Storage
      if(typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']){
          sessionStorage['highscore'] = score;
      } else{
        sessionStorage['highscore'] = sessionStorage['highscore'];
      }

      // Prevent display of High Score: -1
      if (sessionStorage['highscore'] >= 0){
          highscoreDisplay.innerHTML = sessionStorage['highscore'];
      }
      
      // If the score is -1 display 0
      if(score === -1){
          scoreDisplay.innerHTML = 0;
      } else {
        scoreDisplay.innerHTML = score;
      }
  }

  // Match current word to the word input
  function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
  }

  // Countdown timer
  function countdown(){
      // Show time
      timeDisplay.innerHTML = time;
      // Make sure time is not run out
      if(time > 0){
        // Decrement the time  
        time--;
      } else if(time === 0){
          // Game is over
          isPlaying = false;
      }
      
  }

  // Pick & show random word
  function showWord(words){
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);

    // Output random word
    currentWord.innerHTML = words[randIndex];
  }

  // Check Game Status
  function checkStatus(){
      if(!isPlaying && time === 0){
          message.innerHTML = 'Game Over!!!';
          score = -1;
      }
  }