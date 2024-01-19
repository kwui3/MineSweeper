const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

const totalCells = 100;
const totalBombs = 6;
const maxScore = totalCells - totalBombs;
const bombsList = [];

let score = 0;

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');

  if (score === maxScore) {
    endGame(true);
  }
}

function revealAllBombs() {
  //Get all of the cells from the page
  const cells = document.querySelectorAll('.cell')

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    //If this cell is in the bombList array, add the cell-bomb css cladd to it
    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
    }
  }
}

for (let i = 1; i <= 100; i++) {
  const cell= document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('click', function () {
    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
      endGame(false);
    }

    cell.classList.add('cell-clicked');
    updateScore();
  });

  grid.appendChild(cell);
}

while (bombsList.length < totalBombs) {
  // Generate a random number between 1 and 100, inclusive
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;
  
  if (!bombsList.includes(randomNumber)) {
    bombsList.push(randomNumber);
  }
}

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }
  revealAllBombs();
  endGameScreen.classList.remove('hidden');
}

playAgainButton.addEventListener('click', function () {
  window.location.reload();
}); 


