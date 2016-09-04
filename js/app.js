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
    this.x = 166;
    this.y = 505;
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

Player.prototype.handleInput = function() {
  // TODO: fill this out
};

// TODO: write checkCollisions function (where?) & uncomment in engine.js


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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
