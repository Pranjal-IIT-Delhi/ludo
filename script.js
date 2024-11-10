// Initialize variables
const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");
const rollDiceButton = document.getElementById("rollDice");
const diceResultText = document.getElementById("diceResult");
const turnIndicator = document.getElementById("turnIndicator");

// Colors for players
const playerColors = ["red", "yellow", "green", "blue"];
let currentPlayer = 0;

// Simple board layout
const boardSize = 600; // 600px canvas size
const safeZoneSize = 50; // Safe zone size for pieces

// Pieces setup
const pieces = [
  { x: 100, y: 100, color: playerColors[0], player: 0 },
  { x: 500, y: 100, color: playerColors[1], player: 1 },
  { x: 100, y: 500, color: playerColors[2], player: 2 },
  { x: 500, y: 500, color: playerColors[3], player: 3 },
];

// Function to draw the board
function drawBoard() {
  // Clear the canvas
  ctx.clearRect(0, 0, boardSize, boardSize);

  // Draw the board grid (simple version)
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(50, 50, 500, 500); // Outer square

  // Draw the safe zones
  pieces.forEach(piece => {
    ctx.beginPath();
    ctx.arc(piece.x, piece.y, safeZoneSize, 0, Math.PI * 2, false);
    ctx.fillStyle = piece.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Function to roll the dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to display the dice roll result
function displayDiceResult(diceValue) {
  diceResultText.textContent = `Dice: ${diceValue}`;
}

// Function to update the turn indicator
function updateTurnIndicator() {
  turnIndicator.textContent = `Player ${currentPlayer + 1}'s Turn`;
}

// Function to move pieces
function movePiece(piece, steps) {
  // Move logic (simplified)
  const stepSize = 60; // Adjust as needed
  piece.x += stepSize * steps; // Move right for example

  // Loop back to the next player after a full rotation
  currentPlayer = (currentPlayer + 1) % playerColors.length;
  updateTurnIndicator();
}

// Event listeners
rollDiceButton.addEventListener("click", () => {
  const diceValue = rollDice();
  displayDiceResult(diceValue);

  // Simulate moving a piece for now (move the first piece as an example)
  movePiece(pieces[0], diceValue);
});

// Initial game setup
drawBoard();
updateTurnIndicator();
