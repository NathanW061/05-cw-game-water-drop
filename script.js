// Variables to control game state
let gameRunning = false; // Keeps track of whether game is active or not
let gameState = {
  score: 0,
  combo: 0,
  purity: 100,

  span_score: document.getElementById("score"),
  span_combo: document.getElementById("combo"),
  span_purity: document.getElementById("purity"),

  update_value: function(id, value)
  {
    // Update the variable to have the new value
    this[id] = value;
    // Update the HTML span to use the variable's new value
    this["span_"+id].textContent = value;
  },

  reset: function()
  {
    this.update_value("score", 0);
    this.update_value("combo", 0);
    this.update_value("purity", 100);
  },

  collectPureDroplet: function(pts)
  {
    this.update_value("score", this.score + pts);

    if(this.combo < 9)
    {
      this.update_value("combo", this.combo + 1);
    }
  },

  collectImpureDroplet: function()
  {
    if(this.combo != 0)
    {
      this.update_value("combo", 0);
    }

    this.update_value("purity", this.purity - 10);
  }
};
let dropMaker; // Will store our timer that creates drops regularly

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;
  gameState.reset();

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  const dropDuration = Math.random() * 4;
  drop.style.animationDuration = dropDuration + "s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops on click
  drop.addEventListener("click", () => {
    drop.remove();
    gameState.collectPureDroplet(10);
  });

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });
}
