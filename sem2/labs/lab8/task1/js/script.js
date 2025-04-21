const state = {
    players: [],
    currentPlayerIndex: 0,
    rounds: 1,
    currentRound: 1,
    roundResults: [],
    gameStarted: false,
    boardSize: { rows: 3, cols: 4 },
    difficulty: 'easy',
    timerDuration: { easy: 180, normal: 120, hard: 60 },
    timer: null,
    timeLeft: 180,
    moves: 0,
    pairsFound: 0,
    maxPairs: 6,
    hasFlippedCard: false,
    lockBoard: false,
    firstCard: null,
    secondCard: null,
    frameworks: [
        'angular', 'aurelia', 'backbone', 'ember', 'react', 'vue',
        'bootstrap', 'jquery', 'node', 'typescript', 'webpack', 'babel'
    ]
};

const elements = {
    settingsPanel: document.getElementById('settings-panel'),
    gameMode: document.getElementById('game-mode'),
    player1Name: document.getElementById('player1-name'),
    player2Container: document.getElementById('player2-container'),
    player2Name: document.getElementById('player2-name'),
    difficulty: document.getElementById('difficulty'),
    boardSize: document.getElementById('board-size'),
    rounds: document.getElementById('rounds'),
    startGame: document.getElementById('start-game'),
    resetSettings: document.getElementById('reset-settings'),
    gameStatus: document.getElementById('game-status'),
    currentPlayer: document.getElementById('current-player'),
    currentRound: document.getElementById('current-round'),
    timer: document.getElementById('timer'),
    moves: document.getElementById('moves'),
    pairs: document.getElementById('pairs'),
    memoryGame: document.getElementById('memory-game'),
    gameControls: document.getElementById('game-controls'),
    restartGame: document.getElementById('restart-game'),
    resultsModal: document.getElementById('results-modal'),
    winnerDisplay: document.getElementById('winner-display'),
    resultsTableBody: document.getElementById('results-table-body'),
    playAgain: document.getElementById('play-again')
};

elements.gameMode.addEventListener('change', togglePlayer2Input);
elements.startGame.addEventListener('click', startGame);
elements.resetSettings.addEventListener('click', resetSettings);
elements.restartGame.addEventListener('click', restartCurrentGame);
elements.playAgain.addEventListener('click', closeResultsAndReset);

function togglePlayer2Input() {
    elements.player2Container.style.display =
        elements.gameMode.value === '2' ? 'flex' : 'none';
}

function resetSettings() {
    elements.gameMode.value = '1';
    elements.player1Name.value = 'Player 1';
    elements.player2Name.value = 'Player 2';
    elements.difficulty.value = 'easy';
    elements.boardSize.value = '4x3';
    elements.rounds.value = '1';
    togglePlayer2Input();
}

function startGame() {
    state.players = [{ name: elements.player1Name.value, score: 0 }];
    if (elements.gameMode.value === '2') {
        state.players.push({ name: elements.player2Name.value, score: 0 });
    }

    state.rounds = parseInt(elements.rounds.value);
    state.currentRound = 1;
    state.roundResults = [];

    state.difficulty = elements.difficulty.value;
    state.timeLeft = state.timerDuration[state.difficulty];

    const [cols, rows] = elements.boardSize.value.split('x').map(Number);
    state.boardSize = { rows, cols };
    state.maxPairs = (rows * cols) / 2;

    state.currentPlayerIndex = 0;
    state.moves = 0;
    state.pairsFound = 0;

    elements.settingsPanel.style.display = 'none';
    elements.gameStatus.style.display = 'flex';
    elements.gameControls.style.display = 'flex';

    updateStatusDisplay();
    createGameBoard();
    startTimer();

    state.gameStarted = true;
}

function updateStatusDisplay() {
    elements.currentPlayer.textContent = state.players[state.currentPlayerIndex].name;
    elements.currentRound.textContent = state.currentRound;
    elements.moves.textContent = state.moves;
    elements.pairs.textContent = state.pairsFound;

    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    elements.timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function createGameBoard() {
    elements.memoryGame.innerHTML = '';

    const cardWidth = `calc(${100 / state.boardSize.cols}% - 10px)`;
    const cardHeight = `calc(${100 / state.boardSize.rows}% - 10px)`;

    const selectedFrameworks = state.frameworks
        .sort(() => 0.5 - Math.random())
        .slice(0, state.maxPairs);

    const cardPairs = [];
    selectedFrameworks.forEach(framework => {
        cardPairs.push(
            createCard(framework, cardWidth, cardHeight),
            createCard(framework, cardWidth, cardHeight)
        );
    });

    cardPairs
        .sort(() => 0.5 - Math.random())
        .forEach(card => {
            elements.memoryGame.appendChild(card);
        });
}

function createCard(framework, width, height) {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.framework = framework;
    card.style.width = width;
    card.style.height = height;

    const frontFace = document.createElement('img');
    frontFace.classList.add('front-face');
    frontFace.textContent = framework.charAt(0).toUpperCase() + framework.slice(1);
    frontFace.src = `./img/${framework}.svg`;

    const backFace = document.createElement('img');
    backFace.classList.add('back-face');
    backFace.src = "./img/js-badge.svg";

    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener('click', flipCard);

    return card;
}

function flipCard() {
    if (state.lockBoard) return;
    if (this === state.firstCard) return;

    this.classList.add('flip');

    if (!state.hasFlippedCard) {
        state.hasFlippedCard = true;
        state.firstCard = this;
        return;
    }

    state.secondCard = this;
    state.moves++;
    elements.moves.textContent = state.moves;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = state.firstCard.dataset.framework === state.secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        state.pairsFound++;
        elements.pairs.textContent = state.pairsFound;

        if (state.pairsFound === state.maxPairs) {
            endRound(true);
        }
    } else {
        unflipCards();
        if (state.players.length > 1) {
            state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
            elements.currentPlayer.textContent = state.players[state.currentPlayerIndex].name;
        }
    }
}

function disableCards() {
    state.firstCard.removeEventListener('click', flipCard);
    state.secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    state.lockBoard = true;

    setTimeout(() => {
        state.firstCard.classList.remove('flip');
        state.secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [state.hasFlippedCard, state.lockBoard] = [false, false];
    [state.firstCard, state.secondCard] = [null, null];
}

function startTimer() {
    if (state.timer) {
        clearInterval(state.timer);
    }

    state.timer = setInterval(() => {
        state.timeLeft--;
        updateStatusDisplay();

        if (state.timeLeft <= 0) {
            // Time's up
            endRound(false);
        }
    }, 1000);
}

function endRound(completed) {
    clearInterval(state.timer);

    const timeSpent = state.timerDuration[state.difficulty] - state.timeLeft;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    state.roundResults.push({
        round: state.currentRound,
        player: state.players[state.currentPlayerIndex].name,
        moves: state.moves,
        time: timeFormatted,
        completed: completed
    });

    if (completed) {
        state.players[state.currentPlayerIndex].score++;
    }

    if (state.currentRound < state.rounds) {
        state.currentRound++;
        startNextRound();
    } else {
        showResults();
    }
}

function startNextRound() {
    state.currentPlayerIndex = 0;
    state.moves = 0;
    state.pairsFound = 0;
    state.timeLeft = state.timerDuration[state.difficulty];

    updateStatusDisplay();
    createGameBoard();
    startTimer();
}

function restartCurrentGame() {
    clearInterval(state.timer);

    state.moves = 0;
    state.pairsFound = 0;
    state.timeLeft = state.timerDuration[state.difficulty];

    updateStatusDisplay();
    createGameBoard();
    startTimer();
}

function showResults() {
    elements.resultsTableBody.innerHTML = '';

    state.roundResults.forEach(result => {
        const row = document.createElement('tr');

        const roundCell = document.createElement('td');
        roundCell.textContent = result.round;
        row.appendChild(roundCell);

        const playerCell = document.createElement('td');
        playerCell.textContent = result.player;
        row.appendChild(playerCell);

        const movesCell = document.createElement('td');
        movesCell.textContent = result.moves;
        row.appendChild(movesCell);

        const timeCell = document.createElement('td');
        timeCell.textContent = result.time;
        row.appendChild(timeCell);

        elements.resultsTableBody.appendChild(row);
    });

    if (state.players.length > 1) {
        const winner = state.players.reduce((prev, current) =>
            (prev.score > current.score) ? prev : current
        );

        if (winner.score > 0) {
            elements.winnerDisplay.textContent = `Winner: ${winner.name} (${winner.score} rounds won)`;
        } else {
            elements.winnerDisplay.textContent = "No rounds completed successfully. It's a tie!";
        }
    } else {
        const completedRounds = state.roundResults.filter(r => r.completed).length;
        elements.winnerDisplay.textContent = `${state.players[0].name} completed ${completedRounds} of ${state.rounds} rounds!`;
    }

    elements.resultsModal.style.display = 'flex';
}

function closeResultsAndReset() {
    elements.resultsModal.style.display = 'none';
    resetSettings();
    elements.settingsPanel.style.display = 'block';
    elements.gameStatus.style.display = 'none';
    elements.gameControls.style.display = 'none';
    elements.memoryGame.innerHTML = '';
    state.gameStarted = false;
}

resetSettings();