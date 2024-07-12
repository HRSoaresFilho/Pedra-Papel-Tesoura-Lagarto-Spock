document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const choicesPT = {
        rock: 'Pedra',
        paper: 'Papel',
        scissors: 'Tesoura',
        lizard: 'Lagarto',
        spock: 'Spock'
    };
    const outcomeElement = document.getElementById('outcome');
    const playerChoiceElement = document.getElementById('player-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const moveSound = document.getElementById('move-sound');
    
    let playerScore = 0;
    let computerScore = 0;
    
    function getIcon(choice) {
        switch (choice) {
            case 'rock':
                return '<i class="fa-solid fa-hand-back-fist"></i>';
            case 'paper':
                return '<i class="fa-solid fa-hand"></i>';
            case 'scissors':
                return '<i class="fa-solid fa-hand-scissors"></i>';
            case 'lizard':
                return '<i class="fa-solid fa-hand-lizard"></i>';
            case 'spock':
                return '<i class="fa-solid fa-hand-spock"></i>';
            default:
                return '';
        }
    }
    
    function getComputerChoice() {
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineOutcome(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) return 'draw';
        if (
            (playerChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
            (playerChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
            (playerChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
            (playerChoice === 'lizard' && (computerChoice === 'paper' || computerChoice === 'spock')) ||
            (playerChoice === 'spock' && (computerChoice === 'rock' || computerChoice === 'scissors'))
        ) return 'win';
        return 'lose';
    }

    function getOutcomeMessage(playerChoice, computerChoice, result) {
        const messages = {
            rock: {
                scissors: 'amassa',
                lizard: 'esmaga'
            },
            paper: {
                rock: 'cobre',
                spock: 'refuta'
            },
            scissors: {
                paper: 'corta',
                lizard: 'decapita'
            },
            lizard: {
                paper: 'come',
                spock: 'envenena'
            },
            spock: {
                rock: 'vaporiza',
                scissors: 'esmaga'
            }
        };

        const playerChoicePT = choicesPT[playerChoice];
        const computerChoicePT = choicesPT[computerChoice];

        if (result === 'win') {
            return `Você vence! ${playerChoicePT} ${messages[playerChoice][computerChoice]} ${computerChoicePT}.`;
        } else if (result === 'lose') {
            return `Você perde! ${computerChoicePT} ${messages[computerChoice][playerChoice]} ${playerChoicePT}.`;
        } else {
            return `Empate! ${playerChoicePT} empata com ${computerChoicePT}.`;
        }
    }

    document.querySelectorAll('.choice').forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.dataset.choice;
            const computerChoice = getComputerChoice();
            const result = determineOutcome(playerChoice, computerChoice);

            playerChoiceElement.innerHTML = getIcon(playerChoice);
            computerChoiceElement.innerHTML = getIcon(computerChoice);

            if (result === 'win') {
                playerScore++;
            } else if (result === 'lose') {
                computerScore++;
            }

            playerScoreElement.textContent = playerScore;
            computerScoreElement.textContent = computerScore;

            outcomeElement.innerHTML = getOutcomeMessage(playerChoice, computerChoice, result);

            document.body.className = result; // Ajusta a cor de fundo conforme o resultado
            
            moveSound.play();
        });
    });
});