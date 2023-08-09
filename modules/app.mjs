import usersManager from "./usersManager.mjs";
import { disableCells, fillTable, markWin } from "./gameManager.js";

(function app() {
  const players = document.querySelectorAll(".game--header .player");
  const winMessage = document.getElementById("win-message");
  const playerOne = document.getElementById("player-one");
  const playerTwo = document.getElementById("player-two");
  const restartBtn = document.getElementById("restart-button");

  let fieldsArr = [];
  let curPlayer = 0;

  let namesPromise = usersManager()
    .then(res => {
      startGame(...res);
      restartBtn.addEventListener("click", () => {
        startGame(...res);
      });
    })
    .catch(err => {
      namesPromise = usersManager(err);
    });

  function startGame(user1, user2) {
    playerOne.innerText = user1;
    playerTwo.innerText = user2;
    fieldsArr = [];
    curPlayer = 0;
    winMessage.style.display = "none";
    players.forEach(player => player.style.display = "flex");

    fillTable(fieldsArr, showEndMessage);
  }

  function showEndMessage(winner, i, j, dir) {
    players.forEach(player => player.style.display = "none");
    winMessage.style.display = "block";

    if (winner === -1) {
      winMessage.innerHTML = 'Draw!';
    } else {
      console.log(playerOne.innerText)
      winMessage.innerHTML = `Player <span>${!winner ? playerOne.innerText : playerTwo.innerText}</span> won!`;
      disableCells();
      markWin(fieldsArr, i, j, dir);
    }
  }
})();