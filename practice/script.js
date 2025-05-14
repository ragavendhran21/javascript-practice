const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const renderBoard = () => {
  boardElement.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = i;
    div.textContent = cell || "";
    div.addEventListener("click", () => handleClick(i));
    boardElement.appendChild(div);
  });
};

const handleClick = index => {
  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkGame();
};

const checkGame = () => {
  const winnerCombo = winCombos.find(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });

  if (winnerCombo) {
    gameActive = false;
    statusElement.textContent = `🎉 Player ${currentPlayer} wins!`;
    highlightWinner(winnerCombo);
    return;
  }

  if (board.every(cell => cell)) {
    gameActive = false;
    statusElement.textContent = "🤝 It's a draw!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

const highlightWinner = (combo) => {
  const cells = document.querySelectorAll(".cell");
  combo.forEach(index => cells[index].classList.add("winner"));
};

const restartGame = () => {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
};

restartBtn.addEventListener("click", restartGame);
renderBoard();
