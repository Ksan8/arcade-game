var Speed = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Speed(50, 200);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // TODO: focus purely on updating data/properties related to the object
    this.x = this.x + this.speed * dt;

    // ctx.beginPath();
    // ctx.moveTo();
    console.log("Enemy update");
    console.log(dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // TODO: fill out anything here to do with drawing?
    console.log("Enemy render");
};

// var new_enemy = new Enemy();

var Player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 505;
    this.speed = 50; // need to check on what is reasonable
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    var playerStart, playerGrass, playerStone, playerWater;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    console.log("Player update");
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Player render");
};

Player.prototype.handleInput = function(k) {
  if (k === 37)  // left
    this.x = this.x - 101;
  if (k === 38)  // up
    this.x = this.y - 101;
  if (k === 39)  // right
    this.x = this.x + 101;
  if (k === 40)  // down
    this.x = this.y + 101;
};

// TODO: write checkCollisions function (where?) & uncomment in engine.js

// instantiate objects
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
