import usersManager from "./usersManager.mjs";
import { COUNT_OF_RECTS } from "./settings.mjs";
import { fillTable } from "./gameManager.js";

(function app() {
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

    fillTable(fieldsArr, showEndMessage);
  }

  function showEndMessage(winner) {
    console.log("END!", winner);
  }
})();