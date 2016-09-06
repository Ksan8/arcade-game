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

var Star = function(x, y, sprite) {
    this.sprite = 'images/Star.png';
    this.x = 120;
    this.y = 30;
};

Star.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log("Star render");
};

var Player = function(x, y, sprite, score) {
    this.sprite = 'images/char-horn-girl.png';
    this.x = 202;  // centered
    this.y = 404;  // bottom row
    this.score = 0;
};

// reset location of player
Player.prototype.reset = function() {
    this.x = 202;  // reset to starting location
    this.y = 404;
};

Player.prototype.win = function() {
    setTimeout(function() {alert("YOU WON!");}, 500);
};

// Update the player's position
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(x, y) {
    this.handleInput();
    this.checkCollisions();

    if (this.y < 72) {
      this.win();
      this.score = this.score + 1;
      star.render();
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

Player.prototype.checkCollisions = function() {
    for (e = 0; e < 4; e++) {
      var realEnemyX = allEnemies[e].x + 2;
      var realEnemyY = allEnemies[e].y + 77;
      var enemyW = 97;
      var enemyH = 67;
      var realPlayerX = player.x + 16;
      var realPlayerY = player.y + 60;
      var playerW = 68;
      var playerH = 80;

      if (realEnemyX < realPlayerX + playerW &&
        realEnemyX + enemyW > realPlayerX &&
        realEnemyY < realPlayerY + playerH &&
        enemyH + realEnemyY > realPlayerY) {
        console.log("Collision!");
        player.reset();
      }
    }
};

// instantiate objects
var enemyOne = new Enemy();
var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var enemyFour = new Enemy();

var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];
var player = new Player();
var star = new Star();

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
