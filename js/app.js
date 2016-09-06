var randomFactor = function() {
    factor = Math.random();
    return factor;
};

var loc = function() {  // row & col info
    var columns = [0, 101, 202, 303, 404];
    var rows = [50, 133, 216, 299, 382];

    var row, col;
    if (this.x < columns[1])
      col = 1;
    else if (this.x >= columns[1] && this.x < columns[2])
      col = 2;
    else if (this.x >= columns[2] && this.x < columns[3])
      col = 3;
    else if (this.x >= columns[3] && this.x < columns[4])
      col = 4;
    else
      col = 5;

    if (this.y >= rows[1] && this.y < rows[2])
      row = 2;
    else if (this.y >= rows[2] && this.y < rows[3])
      row = 3;
    else if (this.y >= rows[3] && this.y < rows[4])
      row = 4;
    else
      row = 999;  // set to 999 bc. not concerned with rows 1, 5, or 6

    return [col, row];
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
    this.x = this.x + this.speed * dt;
    locE = loc();  // global locE so that accessible by Player update

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

// var Star = function(x, y, sprite) {
//     this.sprite = 'images/Star.png';
//     this.x = 150;
//     this.y = 50;
// };
//
// Star.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//     console.log("Star render");
// };

var Player = function(x, y, sprite) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;  // centered
    this.y = 404;  // bottom row
};

// reset location of player
Player.prototype.reset = function() {
    this.x = 202;  // reset to starting location
    this.y = 404;
};

// I'd like to be able to use this, which would give an alert after 500ms
Player.prototype.win = function() {
    setTimeout(function() {alert("YOU WON!");}, 500);
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(x, y) {
    // this.checkCollisions();
    this.handleInput();

    var locP = loc();

    if (locP == locE)
      this.reset();

    if (this.y < 72) {
      this.win();  // this doesn't work for some reason
      this.reset();
    }

    console.log("Player update");
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Player render");
};

// define actions of key inputs on player, while staying w/in game board
Player.prototype.handleInput = function(direction) {
    if (direction == 'left' && this.x > 100)
      this.x = this.x - 101;

    else if (direction == 'up' && this.y > -11)  // y = -11 sets player in top row
      this.y = this.y - 83;

    else if (direction == 'right' && this.x < 404)
      this.x = this.x + 101;

    else if (direction == 'down' && this.y < 404)
      this.y = this.y + 83;
};

// Player.prototype.checkCollisions = function() {
//     // TODO: fill in function
// };

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
