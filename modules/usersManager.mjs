export default function usersManager(error = "") {
  const modalWindow = document.getElementById("modal-container");
  const playerOneInput = document.getElementById("playerOneInput");
  const playerTwoInput = document.getElementById("playerTwoInput");
  const errorLabel = document.getElementById("errorLabel");
  const saveBtn = document.getElementById("saveBtn");

  if (error) {
    errorLabel.innerText = 'Error: ' + error;
    setTimeout(() => {
      errorLabel.innerText = "";
    }, 3000);
  }

  return new Promise((resolve, reject) => {
    const handleClick = () => {
      if (playerOneInput.value && playerTwoInput.value) {
        modalWindow.style.display = "none";
        saveBtn.removeEventListener("click", handleClick);
        resolve([playerOneInput.value, playerTwoInput.value]);
      } else {
        reject("Enter players names");
      }
    }

    saveBtn.addEventListener("click", handleClick);
  })
}