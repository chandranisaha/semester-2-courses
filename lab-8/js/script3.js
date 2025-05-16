// Select DOM elements
const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset-button');
const difficultySlider = document.getElementById('difficulty');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');

// Game variables
let gridSize = 4; // Default to 4x4
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;

// Set up the difficulty slider with only 3 options
difficultySlider.min = 0;
difficultySlider.max = 2;
difficultySlider.value = 0; // Default to first option (4x4)
difficultySlider.step = 1;

// Convert slider value to grid size
function getGridSizeFromSlider(sliderValue) {
    const sizes = [4, 6, 8]; // The only allowed grid sizes
    return sizes[sliderValue];
}

// Initialize the game
function initGame() {
    clearInterval(timerInterval); // Reset the timer
    timer = 0;
    moves = 0;
    matchedPairs = 0;
    movesDisplay.textContent = `Moves: ${moves}`;
    timerDisplay.textContent = `Time: ${timer}s`;
    gameContainer.innerHTML = ''; // Clear the board
    generateCards();
    renderBoard();
    startTimer();
}

// Generate cards with matching pairs
function generateCards() {
    const totalCards = (gridSize * gridSize) / 2; // Half the grid size
    const symbols = Array.from({ length: totalCards }, (_, i) => String.fromCharCode(65 + i)); // A, B, C...
    cards = [...symbols, ...symbols]; // Duplicate symbols for pairs
    shuffleArray(cards);
}

// Shuffle the array of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Render the game board
function renderBoard() {
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`; // Adjust grid size dynamically
    gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 80px)`;

    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', () => flipCard(card));
        gameContainer.appendChild(card);
    });
}

// Flip a card
function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return; // Limit to 2 flips

    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    // Increment moves
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        checkMatch();
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstSymbol = firstCard.dataset.symbol;
    const secondSymbol = secondCard.dataset.symbol;
    
    if (firstSymbol === secondSymbol) {
        // Cards match
        matchedPairs++;
        flippedCards = [];
        
        // Check if game is won
        const totalPairs = (gridSize * gridSize) / 2;
        if (matchedPairs === totalPairs) {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`);
            }, 500);
        }
    } else {
        // Cards don't match, flip them back after a delay
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// Start the timer
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = `Time: ${timer}s`;
    }, 1000);
}

// Add event listeners
resetButton.addEventListener('click', initGame);

// Update the grid size when the slider changes
difficultySlider.addEventListener('input', () => {
    const sliderValue = parseInt(difficultySlider.value);
    gridSize = getGridSizeFromSlider(sliderValue);
    
    // Update difficulty label if you have one (optional)
    const difficultyLabel = document.getElementById('difficulty-label');
    if (difficultyLabel) {
        difficultyLabel.textContent = `Difficulty: ${gridSize}x${gridSize}`;
    }
});

difficultySlider.addEventListener('change', () => {
    initGame(); // Reinitialize the game with the new grid size
});

// Initialize the game on page load
window.addEventListener('load', () => {
    // Set initial grid size from slider
    const sliderValue = parseInt(difficultySlider.value);
    gridSize = getGridSizeFromSlider(sliderValue);
    initGame();
});