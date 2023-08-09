export default function usersManager(error = "") {
  const modalWindow = document.getElementById("modal-container");
  const playerOneInput = document.getElementById("playerOneInput");
  const playerTwoInput = document.getElementById("playerTwoInput");
  const firstRadio = document.getElementById("first");
  const secondRadio = document.getElementById("second");
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
        document.removeEventListener("keyup", handleEnterPress);
        resolve([playerOneInput.value, playerTwoInput.value,
                      firstRadio.checked ? 0 : 1]);
      } else {
        reject("Enter players names");
      }
    }

    function handleEnterPress(e) {
      if (e.keyCode === 13) {
        handleClick();
      }
    }

    saveBtn.addEventListener("click", handleClick);
    document.addEventListener("keyup", handleEnterPress);
  })
}