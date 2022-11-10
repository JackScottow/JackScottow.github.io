var playerOneInput = document.querySelector("#playerOneInput");
var playerTwoInput = document.querySelector("#playerTwoInput");
var game = document.querySelector("#game");
var startGame = document.querySelector("#start-game");
var squares = document.querySelectorAll("#board div");
var gameText = document.getElementById("game-text");
var gameArr = new Array(9).fill(".");
var startButton = document.querySelector("#start-button");
var resetButton = document.querySelector("#reset");
const winArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var win = false;
var winner = "";

const createPlayer = (name, symbol, turn) => {
  return { name, symbol, turn };
};

const playerOne = createPlayer("X", "x", true);
const playerTwo = createPlayer("O", "o", false);

const updateName = () => {
  playerOne.name = playerOneInput.innerText;
  playerTwo.name = playerTwoInput.innerText;
  updateText();
  startGame.style.display = "none";
  game.style.display = "flex";
};

const changeTurn = () => {
  playerOne.turn === true ? (playerOne.turn = false) : (playerOne.turn = true);
  playerTwo.turn === true ? (playerTwo.turn = false) : (playerTwo.turn = true);
};

const updateText = () => {
  if (win) {
    gameText.innerHTML = `${winner} wins!`;
  } else if (playerOne.turn) {
    gameText.innerHTML = `${playerOne.name} (${playerOne.symbol.toUpperCase()})'s Turn`;
  } else if (playerTwo.turn) {
    gameText.innerHTML = `${playerTwo.name} (${playerTwo.symbol.toUpperCase()})'s Turn`;
  }
};

const reset = () => {
  squares.forEach((square) => {
    square.classList.remove(playerOne.symbol);
    square.classList.remove(playerTwo.symbol);
  });
  win = false;
  updateText();
  gameArr.fill(".", 0);
  startGame.style.display = "flex";
  game.style.display = "none";
};

const checkWin = () => {
  for (let i = 0; i < winArr.length; i++) {
    if (gameArr[winArr[i][0]] != "." && gameArr[winArr[i][0]] === gameArr[winArr[i][1]] && gameArr[winArr[i][1]] === gameArr[winArr[i][2]]) {
      winner = gameArr[winArr[i][0]];
      win = true;
      updateText();
    } else if (gameArr.indexOf(".") == -1 && win === false) {
      gameText.innerText = "Draw!";
    }
  }
};

squares.forEach((square) => {
  square.addEventListener("click", () => {
    const tileNum = square.dataset.x;
    if (!win) {
      if (playerOne.turn === true) {
        if (gameArr[tileNum] == ".") {
          gameArr[tileNum] = playerOne.name;
          square.classList.add(playerOne.symbol);
          changeTurn();
          updateText();
          checkWin();
        }
      } else {
        if (gameArr[tileNum] == ".") {
          gameArr[tileNum] = playerTwo.name;
          square.classList.add(playerTwo.symbol);
          changeTurn();
          updateText();
          checkWin();
        }
      }
    }
  });
});

startButton.addEventListener("click", () => {
  updateName();
});

resetButton.addEventListener("click", () => {
  reset();
});
