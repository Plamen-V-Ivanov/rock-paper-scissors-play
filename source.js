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

let playerScore = 0;
let computerScore = 0;
let currRoundMessage = "";


function getComputerChoice() {

    let choices = ["rock", "paper", "scissors"];
    return choices[Math.floor((Math.random() * choices.length))];

}

function checkForWinCondition(){

    if (playerScore + computerScore >= 5 || playerScore >= 3 || computerScore >= 3) {
        if (playerScore > computerScore) {
            winnerMessageElement.textContent = "Congratulations, You Won!"
        } else if (computerScore > playerScore) {
            winnerMessageElement.textContent = "Sorry, You Lost!"
        } else {
            winnerMessageElement.textContent = "The Game Is Tie! You Should Not Cheat, Using Developer Tool!"
        } 
        return true;
    }
    return false;

}

function updatePageRoundChoices(playerSelection, computerSelection) {

    playerChoiceElement.textContent = playerSelection;
    computerChoiceElement.textContent = computerSelection;
    return;

}

function playRound(playerSelection, computerSelection) {

    if(checkForWinCondition()){
        return;
    }

    if (!winningConditions[playerSelection]) {
        currRoundMessage = "Input a valid choice!"
    }

    if (playerSelection == computerSelection) {
        currRoundMessage = "Tie!";
    };

    if (winningConditions[playerSelection] == computerSelection) {
        playerScore += 1;
        currRoundMessage = winMessages[playerSelection];
    }

    if (winningConditions[playerSelection] != computerSelection) {
        computerScore += 1;
        currRoundMessage = loseMessages[playerSelection];
    }

    if(checkForWinCondition()){
        return;
    }

}

function game(playerSelection) {

    let computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    updatePageRoundChoices(playerSelection, computerSelection);

    roundMessageElement.textContent = currRoundMessage;
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

}

const playButtons = document.getElementsByClassName('play-btn');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const roundMessageElement = document.getElementById('round-message');
const winnerMessageElement = document.getElementById('winner-message');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');

Array.from(playButtons).forEach(btn => {
    btn.addEventListener('click', playEvent);
});

function playEvent(e) {

    const playerChoice = e.target.textContent.toLowerCase();
    console.log(playerChoice);
    game(playerChoice);
    
}
