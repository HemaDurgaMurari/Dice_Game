let player1Score = 0;
let player2Score = 0;
let player1Rolled = false;
let player2Rolled = false;

const diceImages = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"];

const rollPlayer1Btn = document.getElementById("roll-player1");
const rollPlayer2Btn = document.getElementById("roll-player2");

const player1Dice = document.querySelector(".img1");
const player2Dice = document.querySelector(".img2");

const winnerText = document.getElementById("winner-text");
const combinedHistory = document.getElementById("combined-history");

const resetBtn = document.getElementById("reset");
const endGameBtn = document.getElementById("endgame");

const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");
const displayPlayer1Name = document.getElementById("display-player1-name");
const displayPlayer2Name = document.getElementById("display-player2-name");

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Updated addHistory: No manual numbering to avoid duplicates
function addHistory(text) {
  const li = document.createElement("li");
  li.textContent = text;
  combinedHistory.appendChild(li);
  if (combinedHistory.children.length > 10) {
    combinedHistory.removeChild(combinedHistory.firstChild);
  }
}

function animateDice(diceElement, callback) {
  diceElement.classList.add("rotate-dice");
  setTimeout(() => {
    diceElement.classList.remove("rotate-dice");
    callback();
  }, 3000);
}

// Live update player names
player1NameInput.addEventListener("input", () => {
  displayPlayer1Name.textContent = player1NameInput.value.trim() || "Player 1";
});
player2NameInput.addEventListener("input", () => {
  displayPlayer2Name.textContent = player2NameInput.value.trim() || "Player 2";
});

rollPlayer1Btn.addEventListener("click", () => {
  if (!player1Rolled) {
    rollPlayer1Btn.disabled = true;
    animateDice(player1Dice, () => {
      player1Score = rollDice();
      player1Dice.setAttribute("src", "images/" + diceImages[player1Score - 1]);
      player1Rolled = true;
      rollPlayer2Btn.disabled = false;
      winnerText.textContent = "";
    });
  }
});

rollPlayer2Btn.addEventListener("click", () => {
  if (!player2Rolled) {
    rollPlayer2Btn.disabled = true;
    animateDice(player2Dice, () => {
      player2Score = rollDice();
      player2Dice.setAttribute("src", "images/" + diceImages[player2Score - 1]);
      player2Rolled = true;

      const name1 = player1NameInput.value.trim() || "Player 1";
      const name2 = player2NameInput.value.trim() || "Player 2";

      if (player1Score > player2Score) {
        winnerText.textContent = `${name1} Wins! 🎉`;
        addHistory(`${name1} won`);
      } else if (player2Score > player1Score) {
        winnerText.textContent = `${name2} Wins! 🎉`;
        addHistory(`${name2} won`);
      } else {
        winnerText.textContent = "It's a Draw! 🤝";
        addHistory(`Draw between ${name1} and ${name2}`);
      }
    });
  }
});

// Reset scores and round but keep history
resetBtn.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  player1Rolled = false;
  player2Rolled = false;
  player1Dice.setAttribute("src", "images/dice1.png");
  player2Dice.setAttribute("src", "images/dice1.png");
  winnerText.textContent = "";
  rollPlayer1Btn.disabled = false;
  rollPlayer2Btn.disabled = true;

  displayPlayer1Name.textContent = player1NameInput.value.trim() || "Player 1";
  displayPlayer2Name.textContent = player2NameInput.value.trim() || "Player 2";
});

// End game clears everything including history
endGameBtn.addEventListener("click", () => {
  player1Score = 0;
  player2Score = 0;
  player1Rolled = false;
  player2Rolled = false;
  player1Dice.setAttribute("src", "images/dice1.png");
  player2Dice.setAttribute("src", "images/dice1.png");
  winnerText.textContent = "";
  rollPlayer1Btn.disabled = false;
  rollPlayer2Btn.disabled = true;

  combinedHistory.innerHTML = "";

  displayPlayer1Name.textContent = player1NameInput.value.trim() || "Player 1";
  displayPlayer2Name.textContent = player2NameInput.value.trim() || "Player 2";
});

// Initialize
displayPlayer1Name.textContent = player1NameInput.value.trim() || "Player 1";
displayPlayer2Name.textContent = player2NameInput.value.trim() || "Player 2";
rollPlayer2Btn.disabled = true;
