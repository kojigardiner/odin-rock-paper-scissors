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

// Returns a string indicating the result of the round
function getResultString(playerSelection, computerSelection, result) {
    let s = "";

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

// Plays a five round game, keeping score of the winner of each round and
// reports the overall winner/loser at the end
function game() {
    let numGames = 5;

    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;

    for (let i = 0; i < numGames; i++) {
        let playerSelection = "";
        while (!checkPlayerSelection(playerSelection)) {    // wait for a valid selection
            playerSelection = prompt("Select Rock, Paper, or Scissors")
        }
        let computerSelection = getComputerChoice();

        let result = playRound(playerSelection, computerSelection);
        console.log(getResultString(playerSelection, computerSelection, result));

        if (result > 0) playerScore++;
        else if (result < 0) computerScore++;
        else draws++;
    }

    console.log(`Final score after ${numGames} rounds:`);
    console.log(`Player: ${playerScore}, Computer: ${computerScore}, Draw: ${draws}`);

    if (playerScore === computerScore) console.log("Draw!");
    else if (playerScore > computerScore) console.log("You win!");
    else console.log("The Computer wins!");
}

// Checks validity of the player's entry
function checkPlayerSelection(playerSelection) {
    let ps = playerSelection.toLowerCase();

    return (ps === "rock" || ps === "scissors" || ps === "paper");
}

game();