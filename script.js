let currentPlayer = 'X';
let gameOver = false;
let output_message = document.getElementById('output_message');
output_message.textContent = `X's turn!`;
const winning_combos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];
const squares = document.querySelectorAll(".square");

squares.forEach(square => {
   square.addEventListener("click", handleClick);
});

function handleClick(event) {
	const square = event.target;
	if (square.textContent === '' && !gameOver) {
		square.textContent = currentPlayer;
		square.removeEventListener('click', handleClick);
	}
	if (checkWin(currentPlayer)) {
		handleGameOver();
		output_message.textContent = `Game over: ${currentPlayer} wins!`;
	} else if (checkTieGame()) {
		handleGameOver();
		output_message.textContent = `Game over: it's a tie!`
   } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
      output_message.textContent = `${currentPlayer}'s turn!`;
   }
}

function handleGameOver() {
   squares.forEach(square => {
      square.removeEventListener('click', handleClick);
   });
}

function checkWin(currentPlayer) {
   for (const combo of winning_combos) {
      const [a, b, c] = combo;
      if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
         gameOver = true;
         return true;
      }
   }
   return false;
}

function checkTieGame() {
   for (let square of squares) {
      if (square.textContent === '') {
         return false;
      }
   }
   gameOver = true;
   return true;
}

function restartGame() {
   squares.forEach(square => {
      square.addEventListener("click", handleClick);
      square.textContent = '';
   });
   output_message.textContent = `X's turn!`
   currentPlayer = 'X';
   gameOver = false;
}
