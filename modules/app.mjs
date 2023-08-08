import usersManager from "./usersManager.mjs";
import { COUNT_OF_RECTS } from "./settings.mjs";

(function app() {
  const table = document.getElementById("game--table");
  const playerOneContainer = document.getElementById("player-one-container");
  const playerTwoContainer = document.getElementById("player-two-container");
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
    table.innerHTML = "";

    fillTable();
  }

  function fillTable() {
    table.style.gridTemplateColumns = `repeat(${COUNT_OF_RECTS}, 1fr)`;
    table.style.gridTemplateRows = `repeat(${COUNT_OF_RECTS}, 1fr)`;
    table.style.height = table.offsetWidth + "px";

    window.addEventListener("resize", () => {
      table.style.height = table.offsetWidth + "px";
    });

    for (let i = 0; i < COUNT_OF_RECTS; i++) {
      const curRow = [];

      for (let j = 0; j < COUNT_OF_RECTS; j++) {
        curRow.push(-1);
        const curField = document.createElement("div");
        table.append(curField);

        curField.addEventListener("click", () => {
          curRow[j] = curPlayer;
          curPlayer = (curPlayer + 1) % 2;

          playerOneContainer.classList.toggle("active");
          playerTwoContainer.classList.toggle("active");
          curField.innerHTML = `<img src="../assets/images/${curPlayer ? "cross.svg" : "circle.svg"}" >`
        });
      }

      fieldsArr.push(curRow);
    }
  }
})();