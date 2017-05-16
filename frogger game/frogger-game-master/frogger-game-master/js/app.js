var characters = [
    "images/char-horn-girl.png",
    "images/char-boy.png",
    "images/char-pink-girl.png",
    "images/char-horn-girl.png",
    "images/char-cat-girl.png"
]

var random = function (begin, end) {
    return Math.floor(Math.random() * (end - begin + 1) + begin);
}

var Enemy = function (m, n) {

    this.m = m;
    this.n = n;
    this.maxSpeed = 300;
    this.minSpeed = 50;
    this.speed = random(this.maxSpeed, this.minSpeed);
    this.sprite = 'images/enemy-bug.png';
};
 
Enemy.prototype.update = function (ar) {
    this.m = this.m + this.speed * ar;

    if (this.m > 550) {
        this.speed = random(400, 100);
        this.m = -50;
    }
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.m, this.n);
};
var Player = function (m, n) {
    this.m = m;
    this.n = n;
    this.sprite = characters[random(0, 4)];
};
var count = 0;
var HighScore = 0;
var allEnemies = [
    new Enemy(0, 63),
    new Enemy(-50, 146),
    new Enemy(-20, 229)
]
Player.prototype.update = function () {
    if (this.n < 54) {
        this.reset();
        count = count + 1

    }
    
    for (i = 0; i < allEnemies.length; i++) {
        if (((this.n - 9) == (allEnemies[i].n)) && (this.m > allEnemies[i].m - 75) && (this.m < allEnemies[i].m + 75)) {
            this.reset();
            count = 0;
        }
    }
    
    if (HighScore < count) {
        HighScore = count;
    }

    document.getElementById('count').innerHTML = "Score : " + count + " | High Score : " + HighScore;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.m, this.n);

}
Player.prototype.handleInput = function (input) {

    if (input == "left") {
        this.m -= 101;
    } else if (input == "right") {
        this.m += 101;
    } else if (input == "up") {
        this.n -= 83;
    } else if (input == "down") {
        this.n += 83;
    }
    
    //for y axis boundary check
    if (this.n < -11) {
        this.n += 83;
    }
    if (this.n > 404) {
        this.n -= 83;
    }
    // for x axis boundry check
    if (this.m > 404) {
        this.m -= 101;
    }
    if (this.m < 0) {
        this.m += 101;
    }
}
// Changes the position of the player back to the initial.
Player.prototype.reset = function () {
    this.m = 202;
    this.n = 404;
};


var player = new Player(202, 404);
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left', // left  
        38: 'up', // up    
        39: 'right', // right 
        40: 'down', // down  
        65: 'left', // left  
        68: 'right', // right
        83: 'down', // down  
        87: 'up' // up    
    };

    player.handleInput(allowedKeys[e.keyCode]);
});