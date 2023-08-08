import usersManager from "./usersManager.js";

(function app() {
  const table = document.getElementById("game--table");
  const playerOne = document.getElementById("player-one");
  const playerTwo = document.getElementById("player-two");
  const restartBtn = document.getElementById("restart-button");

  let user1;
  let user2;

  let namesPromise = usersManager();
  namesPromise
    .then(res => {
      user1 = res[0];
      user2 = res[1];
    })
    .catch(err => {
      namesPromise = usersManager(err);
    })
})();