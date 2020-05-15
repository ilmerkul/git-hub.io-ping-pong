const canvas = document.querySelector('canvas');
var scoreOneView = document.getElementById('scoreOne');
var scoreTwoView = document.getElementById('scoreTwo');

scoreOneView.textContent = 0;
scoreTwoView.textContent = 0;

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 1;

const gwidth = 600;
const gheight = 400;
const line_width = 5;
const ball_radius = 20;
var scoreOne = 0;
var scoreTwo = 0;




function drawPlayer(x, y) {
    ctx.fillRect(x, y, 20, 100);
}



function moveCom() {
    ctx.clearRect(com.x, com.y, 20, 100);
    if (com.y + 100 >= gheight) {
        speedCom.y = -speedCom.y;
    } else if (com.y <= 0) speedCom.y = -speedCom.y;
    com.y += speedCom.y;
    ctx.fillRect(com.x, com.y, 20, 100);
}


class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    increase(a) {
        return new Vec(this.x * a, this.y * a);
    }

    count() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}


class Ball {
    constructor(ball_radius) {
        this.speed = new Vec(5, 5 * Math.random());
        this.x = gwidth / 2;
        this.y = gheight / 2;
        this.r = ball_radius;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    drawBall(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    reboundWall() {
        this.speed.y = -this.speed.y;
    }

    reboundPlayer() {
        this.speed.x = -this.speed.x;
    }

    moveBall() {
        let x = this.x + this.speed.x;
        let y = this.y + this.speed.y;
        ctx.clearRect(this.x - this.r - 2, this.y - this.r - 2, this.r * 2 + 2, this.r * 2 + 3);
        this.drawBall(x, y);
        this.x = x;
        this.y = y;
    }

    collision() {
        if (this.y - this.r <= 0 || this.y + this.r >= gheight) {
            this.reboundWall();
        } else if (this.x + this.r >= gwidth || this.x - this.r <= 0) {
            if (this.x + this.r >= gwidth) {
                scoreTwoView.textContent = ++scoreTwo;
            } else scoreOneView.textContent = ++scoreOne;
            ctx.clearRect(this.x - this.r - 2, this.y - this.r - 2, this.r * 2 + 2, this.r * 2 + 3);
            this.speed = new Vec(5, (Math.random() > 0.5 ? -6 : 8) * Math.random());
            this.x = gwidth / 2;
            this.y = gheight / 2;
            this.drawBall(this.x, this.y);
        } else if ((this.x + this.r >= player.x && this.y >= player.y && this.y <= player.y + 100 && this.speed.x > 0) || (this.x - this.r <= com.x + 20 && this.y >= com.y && this.y <= com.y + 100 && this.speed.x < 0)) {

            this.reboundPlayer();

        
        }
        this.moveBall();
    }
}

var ball = new Ball(ball_radius);
const speedCom = new Vec(0, 3);

//Players
com = {
    'x': 0,
    'y': gheight / 2 - 50
}

player = {
    'x': gwidth - 20,
    'y': gheight / 2 - 50
}



canvas.addEventListener('mousemove', (e) => {
    if (e.offsetY <= gheight - 50 && e.offsetY >= 50) {
        ctx.clearRect(player.x, player.y, 20, 100);
        player.y = e.offsetY - 50;
        drawPlayer(player.x, player.y);
    }
})




setInterval(update, 1000/60);

function update() {

    ball.collision();
    ctx.beginPath();

    ctx.fillRect(gwidth / 2 - 5, 0, line_width, gheight);


    ctx.clearRect(com.x, com.y, 20, 100);
    drawPlayer(player.x, player.y);
    drawPlayer(com.x, com.y);
    moveCom();

}