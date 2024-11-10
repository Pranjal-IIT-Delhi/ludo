let currentPlayer = 0;
let players = [];
let playerPositions = [];
let playerTokens = [];
let diceOutcomes = [1, 2, 3, 4, 5, 6];
let totalPlayers;

function startGame() {
    totalPlayers = document.getElementById("players").value;
    players = ["Magenta", "Sky Blue", "Gold", "Aesthetic Green"].slice(0, totalPlayers);
    playerPositions = Array(totalPlayers).fill(0);
    playerTokens = [];

    document.getElementById("status").textContent = `Player ${players[currentPlayer]}'s turn!`;
    document.getElementById("rollButton").disabled = false;
    generateBoard();
    createPlayerTokens();
}

function generateBoard() {
    let boardContainer = document.getElementById("game-board");
    boardContainer.innerHTML = '';

    for (let i = 0; i < 36; i++) {
        let cell = document.createElement("div");
        cell.setAttribute("id", `cell${i}`);
        boardContainer.appendChild(cell);
    }
}

function createPlayerTokens() {
    let boardContainer = document.getElementById("game-board");

    // Create a token for each player
    for (let i = 0; i < totalPlayers; i++) {
        let token = document.createElement("div");
        token.classList.add("player-token");

        // Set color for each player token
        if (i === 0) token.style.backgroundColor = "magenta";
        else if (i === 1) token.style.backgroundColor = "skyblue";
        else if (i === 2) token.style.backgroundColor = "gold";
        else if (i === 3) token.style.backgroundColor = "aestheticgreen";

        playerTokens.push(token);
        boardContainer.appendChild(token);
    }
}

function rollDice() {
    let diceResult = diceOutcomes[Math.floor(Math.random() * diceOutcomes.length)];
    document.getElementById("dice").textContent = diceResult;

    // Move the player's token
    playerPositions[currentPlayer] += diceResult;

    // Check for winning condition
    if (playerPositions[currentPlayer] >= 36) {
        document.getElementById("status").textContent = `${players[currentPlayer]} wins!`;
        document.getElementById("rollButton").disabled = true;
        return;
    }

    updateBoard();
    nextTurn();
}

function nextTurn() {
    currentPlayer = (currentPlayer + 1) % totalPlayers;
    document.getElementById("status").textContent = `Player ${players[currentPlayer]}'s turn!`;
}

function updateBoard() {
    let boardContainer = document.getElementById("game-board");

    // Reset all cells
    for (let i = 0; i < 36; i++) {
        document.getElementById(`cell${i}`).style.backgroundColor = "#e0e0e0";
    }

    // Move the token to the new position
    let token = playerTokens[currentPlayer];
    let playerPosition = playerPositions[currentPlayer];

    // Update player token's position on the board
    let targetCell = document.getElementById(`cell${playerPosition}`);
    let cellRect = targetCell.getBoundingClientRect();

    token.style.top = `${cellRect.top + 10}px`;
    token.style.left = `${cellRect.left + 10}px`;

    // Highlight the player's current position
    targetCell.style.backgroundColor = players[currentPlayer].toLowerCase();
}
