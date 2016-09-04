var randomFactor = function() {
  factor = Math.random();
  return factor;
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;

    // randomly assign a cobblestone row
    setRow = function() {
      randomFactor();
      if (factor < 0.33)
        this.y = 60;  // set to first row
      else if (factor > 0.66)
        this.y = 150;  // set to second row
      else
        this.y = 230;  // set to third row
      return this.y;
    };

    this.y = setRow();

    // set randomized speed between limits
    var Speed = function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1));
    };
    this.speed = Speed(25, 150);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // focus purely on updating data/properties related to the object
    this.x = this.x + this.speed * dt;

    if (this.x > 505)  // reset enemy once off-screen
      this.reset();

    console.log("Enemy update");
    console.log(dt);
};

// reset location of enemy
Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = setRow();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Enemy render");
};

// TODO: troubleshoot visibility of player

var Player = function(x, y, sprite) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;
    this.y = 505;
    this.speed = 5; // need to check on what is reasonable
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // this.x = this.x + this.speed * dt;
    // this.y = this.y + this.speed * dt;

    console.log("Player update");
};

// Draw the player on the screen
Player.prototype.render = function() {
    // ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Player render");
};

Player.prototype.handleInput = function(k) {
  if (k === 37)  // left
    this.x = this.x - 10;
  if (k === 38)  // up
    this.x = this.y - 10;
  if (k === 39)  // right
    this.x = this.x + 10;
  if (k === 40)  // down
    this.x = this.y + 10;
};

// TODO: write checkCollisions function (where?) & uncomment in engine.js

// instantiate objects
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var enemyFour = new Enemy();

var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
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
