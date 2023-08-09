import { COUNT_OF_RECTS, COUNT_TO_WIN } from "./settings.mjs";

const playerOneContainer = document.getElementById("player-one-container");
const playerTwoContainer = document.getElementById("player-two-container");
const table = document.getElementById("game--table");

export const fillTable = (fieldsArr, showEndMessage, curPlayer = 0) => {
  table.innerHTML = "";
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

        checkWinner(fieldsArr, showEndMessage);
      });
    }

    fieldsArr.push(curRow);
  }
}

const checkWinner = (fieldsArr, showEndMessage) => {
  function checkRow(i, j) {
    let count = 1;
    for (let col = j + 1; col < fieldsArr[j].length; col++) {
      if (fieldsArr[i][col] === fieldsArr[i][j]) count++;
      else return false;
      if (count === COUNT_TO_WIN) return true;
    }

    return false;
  }

  function checkCol(i, j) {
    let count = 1;
    for (let row = i + 1; row < fieldsArr.length; row++) {
      if (fieldsArr[row][j] === fieldsArr[i][j]) count++;
      else return false;
      if (count === COUNT_TO_WIN) return true;
    }

    return false;
  }

  function checkDiag(i, j) {
    let count = 1;
    for (let col = j + 1, row = i + 1;
         col < fieldsArr[i].length && row < fieldsArr.length;
         row++, col++) {
      if (fieldsArr[row][col] === fieldsArr[i][j]) count++;
      else return false;
      if (count === COUNT_TO_WIN) return true;
    }

    return false;
  }

  // Var flag to determinate if there is an empty cell;
  let hasEmpty = false;
  for (let i = 0; i < fieldsArr.length; i++) {
    for (let j = 0; j < fieldsArr[i].length; j++) {
      if (fieldsArr[i][j] === -1) hasEmpty = true;
      else if (checkRow(i, j) ||
                checkCol(i, j) ||
                checkDiag(i, j)) {
        showEndMessage(fieldsArr[i][j]);
        return;
      }
    }
  }

  if (!hasEmpty) {
    showEndMessage(-1);
  }
}