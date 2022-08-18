// Globals
let playerScore = 0;
let computerScore = 0;
let draws = 0;
let winAmount = 5;


// Randomly selects and returns "Rock" "Paper" or "Scissors"
function getComputerChoice() {
    let choices = ["Rock", "Paper", "Scissors"];
    let index = Math.floor((Math.random() * choices.length));

    return choices[index];
}

// Returns a value indicating the winner of the round,
// 0 for tie, -1 for player loss (computer win), +1 for player win (computer loss)
function playRound(playerSelection, computerSelection) {
    let ps = playerSelection.toLowerCase();
    let cs = computerSelection.toLowerCase();

    let result = 0; // 0 for tie, -1 for player loss, +1 for player win

    switch (ps) {
        case "rock":
            if (cs === "scissors") result = 1;
            else if (cs === "paper") result = -1;
            break;
        case "paper":
            if (cs === "rock") result = 1;
            else if (cs === "scissors") result = -1;
            break;
        case "scissors":
            if (cs === "paper") result = 1;
            else if (cs === "rock") result = -1;
            break;
    }

    return result;
}

// Capitalizes the first letter of a string
function capitalizeFirst(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
}

// Returns a string indicating the result of the round
function getResultString(playerSelection, computerSelection, result) {
    let s = "";
    playerSelection = capitalizeFirst(playerSelection);
    computerSelection = capitalizeFirst(computerSelection);

    switch (result) {
        case 1:
            s = `You Win! ${playerSelection} beats ${computerSelection}`;
            break;
        case 0:
            s = `You Draw! ${playerSelection} is the same as ${computerSelection}`;
            break;
        case -1:
            s = `You Lose! ${playerSelection} loses to ${computerSelection}`;
            break;
        default:
            alert(`Invalid result ${result}`);
    }

    return s;
}

// Checks validity of the player's entry
function checkPlayerSelection(playerSelection) {
    let ps = playerSelection.toLowerCase();

    return (ps === "rock" || ps === "scissors" || ps === "paper");
}

// Display the result string 
function showResult(string) {
    const divResult = document.querySelector(".results");
    divResult.textContent = string;
}

// Display the current score
function showScore() {
    const divScore = document.querySelector(".score");

    divScore.textContent = `You: ${playerScore}, Computer: ${computerScore}`;
}

// Reset the score counter and text fields
function reset() {
    playerScore = 0;
    computerScore = 0;

    showScore();

    const divIntro = document.querySelector(".intro");
    divIntro.textContent = `First to ${winAmount} wins!`;

    const divResult = document.querySelector(".results");
    divResult.textContent = "";
}

// Check if either player or computer have won
function checkWin() {
    if (playerScore >= winAmount) {
        alert("You win!");
        reset();
    }
    if (computerScore >= winAmount) {
        alert("You lose!");
        reset();
    }
}

// Respond to button events
function buttonEvent(e) {
    let playerSelection = e.target.getAttribute("id");
    if (!checkPlayerSelection(playerSelection)) {
        console.log(`${playerSelection} not recognized`);
        return;
    }

    let computerSelection = getComputerChoice();
    let result = playRound(playerSelection, computerSelection);
    let string = getResultString(playerSelection, computerSelection, result);

    showResult(string);

    if (result > 0) playerScore++;
    else if (result < 0) computerScore++;
    else draws++;

    showScore();
    checkWin();
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", buttonEvent));

reset();