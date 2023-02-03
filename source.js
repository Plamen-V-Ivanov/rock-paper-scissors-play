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

function checkForWinCondition() {

    if (playerScore + computerScore >= 5 || playerScore >= 3 || computerScore >= 3) {
        if (playerScore > computerScore) {
            winnerMessageElement.textContent = "Congratulations, You Won!"
        } else if (computerScore > playerScore) {
            winnerMessageElement.textContent = "Sorry, You Lost!"
        } else {
            winnerMessageElement.textContent = "The Game Is Tie! You Should Not Cheat, Using Developer Tool!"
        }
        endGamePage();
        return true;
    }
    return false;

}

function updatePageRoundChoices(playerSelection, computerSelection) {

    playerChoiceElement.textContent = playerSelection.toUpperCase();
    computerChoiceElement.textContent = computerSelection.toUpperCase();
    return;

}

function playRound(playerSelection, computerSelection) {

    if (checkForWinCondition()) {
        return;
    }

    if (!winningConditions[playerSelection]) {
        currRoundMessage = "Input a valid choice!"
        return;
    }

    if (playerSelection == computerSelection) {
        currRoundMessage = "Tie!";
        return;
    };

    if (winningConditions[playerSelection] == computerSelection) {
        playerScore += 1;
        currRoundMessage = winMessages[playerSelection];
    }

    if (winningConditions[playerSelection] != computerSelection) {
        computerScore += 1;
        currRoundMessage = loseMessages[playerSelection];
    }

    if (checkForWinCondition()) {
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

function endGamePage() {

    scoreSection.style.display = 'none';
    choiceSection.style.display = 'none';
    Array.from(scoreStatistics).map(scoreColumn => scoreColumn.style.display = 'none');
    roundMessageElement.style.display = 'none';

    finalScore.textContent = (`Final score: ${playerScore}:${computerScore}`)
    winnerMessageElement.style.display = 'block';
    finalScore.style.display = 'block';
    playAgainBtn.style.display = 'block';

}

function BackToPlayPage() {

    playerScore = 0;
    computerScore = 0;

    choiceSection.style.display = 'block';
    scoreSection.style.display = 'flex';
    roundMessageElement.style.display = 'block';

    playerScoreElement.textContent = '';
    computerScoreElement.textContent = '';
    playerChoiceElement.textContent = '';
    computerChoiceElement.textContent = '';
    roundMessageElement.textContent = '';

    winnerMessageElement.style.display = 'none';
    finalScore.style.display = 'none';
    playAgainBtn.style.display = 'none';

}

const playButtons = document.getElementsByClassName('play-btn');
const scoreStatistics = document.getElementsByClassName('score-column')
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const roundMessageElement = document.getElementById('round-message');
const winnerMessageElement = document.getElementById('winner-message');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');

const choiceSection = document.getElementById('choice-section');
const scoreSection = document.getElementById('score-section');
const finalScore = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const animation = document.querySelector('.loader');


Array.from(playButtons).forEach(btn => {
    btn.addEventListener('click', playEvent);
});

playAgainBtn.addEventListener('click', BackToPlayPage);

function playEvent(e) {
    const playerChoice = e.target.textContent.toLowerCase();
    Array.from(scoreStatistics).map(scoreColumn => scoreColumn.style.display = 'flex');
    triggerAnimation();
    setTimeout(() => game(playerChoice), 1000);
}

function triggerAnimation() {
    reverseVisibility('hidden');
    Array.from(playButtons).forEach(btn => {
        btn.disabled = true;
    });
    animation.style.display = 'block';

    setTimeout(function () {
        animation.style.display = 'none'
        Array.from(playButtons).forEach(btn => {
            btn.disabled = false;
        });
        reverseVisibility('visible');
    }, 1000);
}

function reverseVisibility(option) {
    Array.from(scoreStatistics).map(scoreColumn => scoreColumn.style.visibility = option);
    roundMessageElement.style.visibility = option;
    animation.style.display = option;
};