let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScore("Pick Your Move");
function updateScore(result, computerMove, chosenMove) {
  document.querySelector(
    ".js-score p"
  ).innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
  if (chosenMove) {
    document.querySelector(".js-chosen-move p").innerHTML = `
            You:
            <img src="images/${chosenMove}-emoji.png" class="chosen-move-icon">
            Computer:
            <img src="images/${computerMove}-emoji.png" class="chosen-move-icon">`;
  } else {
    document.querySelector(".js-chosen-move p").innerHTML =
      "Pick a move to play";
  }
  document.querySelector(".js-winner p").innerHTML = result;
}
function generateRandomNumber() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function result(chosenMove) {
  let computerMove = generateRandomNumber();
  let result = "";
  if (computerMove === chosenMove) {
    result = "Tie";
    score.ties++;
  } else if (computerMove !== chosenMove) {
    if (
      (computerMove === "rock" && chosenMove === "paper") ||
      (computerMove === "paper" && chosenMove === "scissors") ||
      (computerMove === "scissors" && chosenMove === "rock")
    ) {
      result = "You win";
      score.wins++;
    } else {
      result = "You lose";
      score.losses++;
    }
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateScore(result, computerMove, chosenMove);
}
function resetScore() {
  score.losses = 0;
  score.wins = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore("Pick Your Move");
}
