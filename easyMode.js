let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

//setting starting scoreline
let scoreLeft = 0
let scoreRight = 0

if (localStorage.getItem("ovrEasyLeft") == null){
    ovrEasyLeft = 0
}
else{
    ovrEasyLeft = parseInt(localStorage.getItem("ovrEasyLeft"))
}
if (localStorage.getItem("ovrEasyRight") == null){
    ovrEasyRight = 0
}
else{
    ovrEasyRight = parseInt(localStorage.getItem("ovrEasyRight"))
}

//allowing ball to change directions when hits paddles
let velocityX = 10
let posVelocityX = velocityX
let negVelocityX = velocityX/-1

//setting multiple speeds
let velocityY = 0
let negVelocityY = 0
let paddleSpeedY = 5
let paddleSpeedX = 0.4
let playing = false
let ballBounciness = 5

//sets canvas fullscreen
canvas.height = Math.floor(window.innerHeight/paddleSpeedY)*paddleSpeedY;
canvas.width = Math.floor(window.innerWidth/posVelocityX)*posVelocityX;

let paddleHeight = 100
let paddleWidth = 20

//creates key object (kind of array)
let toggledKeys = {};
let paddle1 = {
    x: 0,
    y: canvas.height/2-paddleHeight/2
};
let paddle2 = {
    x: canvas.width-20,
    y: canvas.height/2-paddleHeight/2

};
let ball = {
    x: paddle1.x+paddleWidth+10,
    y: paddle1.y+paddleHeight/2
}

//when key is pressed down, log the key
document.addEventListener("keydown", event => {
    toggledKeys[event.code] = true;
    event.preventDefault();
});
//when key comes back up, log the key
document.addEventListener("keyup", event => {
    toggledKeys[event.code] = false;
    event.preventDefault();
});

function update() {
    //checking if ball hit the front of the right paddle
    if (ball.x >= paddle2.x-10 && ball.x <= paddle2.x+posVelocityX-5 && ball.y <= paddle2.y+110 && ball.y >= paddle2.y-10){
        //console.log(Math.round((ball.y+((ball.x-paddle2.x)*(velocityY/-(velocityX+paddleSpeedX))))*100)/100)
        velocityX = negVelocityX
        velocityY = Math.round(((ball.y-paddle2.y-50)/ballBounciness)*10)/10
        negVelocityY = -velocityY
    }//checking if ball hit the sides of the right paddle
    else if (ball.x >= paddle2.x-10 && ball.x <= paddle2.x+posVelocityX+20 && ball.y <= paddle2.y+110 && ball.y >= paddle2.y-10){
        velocityY = negVelocityY
    }
    //checking if ball hit the front of the left paddle
    if (ball.x <= paddle1.x+30 && ball.x >= paddle1.x-posVelocityX+25 && ball.y <= paddle1.y+110 && ball.y >= paddle1.y-10){
        //console.log(Math.round((ball.y+((paddle1.x+30-ball.x)*(velocityY/(velocityX-paddleSpeedX))))*100)/100)
        velocityX = posVelocityX
        velocityY = Math.round(((ball.y-paddle1.y-50)/ballBounciness)*10)/10
        negVelocityY = -velocityY
    }//checking if ball hit the sides of the left paddle
    else if (ball.x <= paddle1.x+30 && ball.x >= paddle1.x-posVelocityX && ball.y <= paddle1.y+110 && ball.y >= paddle1.y-10){
        velocityY = negVelocityY
    }
    //top and bottom of page collisions
    if (ball.y <= 10 || ball.y >= canvas.height-10){
        velocityY = velocityY/-1
    }
    //checking what keys are pressed and moving paddles
    if (toggledKeys["ArrowUp"] && paddle2.y > 0) {
        paddle2.y -= paddleSpeedY;
    }
    if (toggledKeys["ArrowDown"] && paddle2.y < canvas.height-paddleHeight) {
        paddle2.y += paddleSpeedY;
    }
    if (toggledKeys["Space"] && playing == false){
        if (ball.x < canvas.width/2){
            velocityY = Math.round(Math.random() * (5+5) -5)
        }
        playing = true
    }
    if (toggledKeys["Escape"] && playing == false){
        window.location.replace("index.html")
    }
    //bot move towards ball
    if (ball.y > paddle1.y+50 && paddle1.y < canvas.height-paddleHeight) {
        paddle1.y += paddleSpeedY;
    }
    if (ball.y < paddle1.y+50 && paddle1.y > 0) {
        paddle1.y -= paddleSpeedY;
    } 
    //if ball goes past right paddle
    if (ball.x > canvas.width-10+posVelocityX) {
        scoreLeft+=1
        ovrEasyLeft+=1
        localStorage.setItem("ovrEasyLeft", ovrEasyLeft);
        playing = false
        paddle1 = {
            x: 0,
            y: canvas.height/2-paddleHeight/2
        };
        paddle2 = {
            x: canvas.width-20,
            y: canvas.height/2-paddleHeight/2
        
        };
        ball = {
            x: paddle2.x-10,
            y: paddle1.y+paddleHeight/2
        }
        velocityX = posVelocityX
        velocityY = 0
    }
    //if ball goes past left paddle
    if (ball.x < 10-posVelocityX){
        scoreRight+=1
        ovrEasyRight+=1
        localStorage.setItem("ovrEasyRight", ovrEasyRight);
        playing = false
        paddle1 = {
            x: 0,
            y: canvas.height/2-paddleHeight/2
        };
        paddle2 = {
            x: canvas.width-20,
            y: canvas.height/2-paddleHeight/2
        
        };
        ball = {
            x: paddle1.x+paddleWidth+10,
            y: paddle1.y+paddleHeight/2
        }
        velocityX = posVelocityX
        velocityY = 0
    }
    //checking if game has started
    if (playing == true){
        //ball movement
        ball.x += velocityX
        ball.y += velocityY
        //paddles get closer
        if (paddle1.x < canvas.width/2 - 80){
            paddle1.x += paddleSpeedX
            paddle2.x -= paddleSpeedX
        }
    }
}
//draws all the items where they should be
function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    update();
    ctx.fillStyle='blue';
    ctx.fillRect(paddle1.x, paddle1.y, paddleWidth, paddleHeight);
    ctx.fillStyle='red';
    ctx.fillRect(paddle2.x, paddle2.y, paddleWidth, paddleHeight);
    ctx.fillStyle='black';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(scoreLeft +"-"+ scoreRight, canvas.width/2, 40);
    ctx.fillStyle='grey'
    if(playing == false){
        ctx.fillText("Press Space To Start", canvas.width/2, canvas.height/2);
        ctx.fillText("Press Escape To Go Back To Home Page", canvas.width/2, canvas.height/2+60);
    }
    requestAnimationFrame(draw);
}

draw();