'use strict';

// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const modalP0 = document.querySelector('.modalP0');
const modalP1 = document.querySelector('.modalP1');
let diceEl = document.querySelector('.dice');
let diceImg = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// functions for dice image randomizer
let rollDice = function (randomNumber) {
  randomNumber = Math.floor(Math.random() * diceImg.length);
  diceEl.src = diceImg[randomNumber];
  return randomNumber;
};

//function for dice display
let displayDice = function (displayDice) {
  diceEl.classList.remove('hidden');
  return displayDice;
};

function decide(decide) {
  let src = diceEl.src.substring(diceEl.src.lastIndexOf('/') + 1);
  if (
    src !== 'dice-1.png' &&
    !diceEl.classList.contains('hidden') &&
    player0.classList.contains('player--active')
  ) {
    currentScore0.textContent =
      rollDice() + 1 + Number(currentScore0.textContent);
  } else if (
    src !== 'dice-1.png' &&
    !diceEl.classList.contains('hidden') &&
    player1.classList.contains('player--active')
  ) {
    currentScore1.textContent =
      rollDice() + 1 + Number(currentScore1.textContent);
  } else if (
    src === 'dice-1.png' &&
    !diceEl.classList.contains('hidden') &&
    player0.classList.contains('player--active')
  ) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentScore0.textContent = 0;
  } else if (
    src === 'dice-1.png' &&
    !diceEl.classList.contains('hidden') &&
    player1.classList.contains('player--active')
  ) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentScore1.textContent = 0;
  }
  return decide;
}

//function that adds a timeout to the roll dice button
function foo(btnRoll) {
  btnRoll.disabled = true;
  setTimeout(function () {
    btnRoll.disabled = false;
  }, 800);
}


btnRoll.addEventListener('click', function () {
  rollDice(), displayDice(), decide();
});

const holdScore = function () {
  if (player0.classList.contains('player--active')) {
    score0El.textContent =
      Number(currentScore0.textContent) + Number(score0El.textContent);
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentScore0.textContent = 0;
  } else if (player1.classList.contains('player--active')) {
    score1El.textContent =
      Number(currentScore1.textContent) + Number(score1El.textContent);
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentScore1.textContent = 0;
  }
};
const modalShow = function (modalShow) {
  if (score0El.textContent >= 100) {
    modalP0.classList.remove('hidden');
  } else if (score1El.textContent >= 100) {
    modalP1.classList.remove('hidden');
  }
  return modalShow;
};
btnHold.addEventListener('click', function () {
  holdScore(), modalShow();
});

const newGame = function (newGame) {
  window.location.reload();
};

btnNewGame.addEventListener('click', function () {
  newGame();
});
