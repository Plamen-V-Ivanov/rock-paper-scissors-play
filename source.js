function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor((Math.random() * choices.length))];
}

const winningConditions = {
    "rock": "scissors",
    "paper": "rock",
    "scissors": "paper",
};

const loseMessages = {
    "rock": "You Lose! Paper beats Rock",
    "paper": "You Lose! Scissors beats Paper",
    "scissors": "You Lose! Rock beats Scissors",
};

const winMessages = {
    "paper": "You Win! Paper beats Rock",
    "scissors": "You Win! Scissors beats Paper",
    "rock": "You Win! Rock beats Scissors",
};


function playRound(playerSelection, computerSelection) {

    if (!winningConditions[playerSelection]){
        return "Input a valid choice!"
    }

    if (playerSelection == computerSelection) {
        return "Tie!";
    };


    if (winningConditions[playerSelection] == computerSelection) {
        return winMessages[playerSelection];
    }
    return loseMessages[playerSelection];

}

function game() {
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("Make your choice! Rock, Paper or Scissors?").toLocaleLowerCase();
        let computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));

    }
}

game();





