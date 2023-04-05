let canvas = document.getElementById("game");

//setting starting scoreline
let scoreLeft = 0
let scoreRight = 0

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
canvas.height = Math.floor(window.innerHeight/10)*10;
canvas.width = Math.floor(window.innerWidth/posVelocityX)*posVelocityX;

//makes canvas 2d
let ctx = canvas.getContext("2d");

let paddleHeight = 100
let paddleWidth = 20
let predictedSpotY1 = canvas.height/2
let predictedSpotY2 = canvas.height/2


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
        velocityX = negVelocityX
        velocityY = Math.round(((ball.y-paddle2.y-50)/ballBounciness)*10)/10
        negVelocityY = -velocityY
        calculate1()
    }//checking if ball hit the sides of the right paddle
    else if (ball.x >= paddle2.x-10 && ball.x <= paddle2.x+posVelocityX+20 && ball.y <= paddle2.y+110 && ball.y >= paddle2.y-10){
        velocityY = negVelocityY
    }
    //checking if ball hit the front of the left paddle
    if (ball.x <= paddle1.x+30 && ball.x >= paddle1.x-posVelocityX+25 && ball.y <= paddle1.y+110 && ball.y >= paddle1.y-10){
        velocityX = posVelocityX
        velocityY = Math.round(((ball.y-paddle1.y-50)/ballBounciness)*10)/10
        negVelocityY = -velocityY
        calculate2()
    }//checking if ball hit the sides of the left paddle
    else if (ball.x <= paddle1.x+30 && ball.x >= paddle1.x-posVelocityX && ball.y <= paddle1.y+110 && ball.y >= paddle1.y-10){
        velocityY = negVelocityY
    }
    //top and bottom of page collisions
    if (ball.y <= 10 || ball.y >= canvas.height-10){
        velocityY = velocityY/-1
    }
    //checking what keys are pressed and moving paddles
    if (toggledKeys["Space"] && playing == false){
        velocityY = Math.round(Math.random() * (5+5) -5)
        playing = true
        calculate1()
        calculate2()
    }
    //make the left bot move towards middle if ball is moving away
    if (velocityX > 0 && paddle1.y+50 > canvas.height-(paddleHeight+70)){
        paddle1.y -= paddleSpeedY;
    }
    if (velocityX > 0 && paddle1.y+50 < 70){
        paddle1.y += paddleSpeedY;
    }
    if (velocityX > 0 && paddle1.y+50 > predictedSpotY2 && paddle1.y > 70){
        paddle1.y -= paddleSpeedY;
    }
    if (velocityX > 0 && paddle1.y+50 < predictedSpotY2 && paddle1.y < canvas.height-(paddleHeight+70)){
        paddle1.y += paddleSpeedY;
    }//if ball is moving towards it go to predicted spot
    if (predictedSpotY1 > paddle1.y+50 && paddle1.y < canvas.height-paddleHeight && velocityX < 0) {
        paddle1.y += paddleSpeedY;
    }
    if (predictedSpotY1 < paddle1.y+50 && paddle1.y > 0 && velocityX < 0) {
        paddle1.y -= paddleSpeedY;
    }
    //same thing but the right bot
    if (velocityX < 0 && paddle2.y+50 > canvas.height-(paddleHeight+70)){
        paddle2.y -= paddleSpeedY;
    }
    if (velocityX < 0 && paddle2.y+50 < 70){
        paddle2.y += paddleSpeedY;
    }
    if (velocityX < 0 && paddle2.y+50 > predictedSpotY1 && paddle2.y > 70){
        paddle2.y -= paddleSpeedY;
    }
    if (velocityX < 0 && paddle2.y+50 < predictedSpotY1 && paddle2.y < canvas.height-(paddleHeight+70)){
        paddle2.y += paddleSpeedY;
    }//if ball is moving towards it go to predicted spot
    if (predictedSpotY2 > paddle2.y+50 && paddle2.y < canvas.height-paddleHeight && velocityX > 0) {
        paddle2.y += paddleSpeedY;
    }
    if (predictedSpotY2 < paddle2.y+50 && paddle2.y > 0 && velocityX > 0) {
        paddle2.y -= paddleSpeedY;
    }

    //if ball goes past right paddle
    if (ball.x > canvas.width-10+posVelocityX) {
        scoreLeft+=1
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
//calculates where the ball will end up when it gets to the paddle
function calculate1(){
    let distanceToPaddle = (ball.x - (paddle1.x+30))
    let slope = -(velocityY/(velocityX-paddleSpeedX))
    //let slope = -(velocityY/velocityX)
    predictedSpotY1 = (slope*distanceToPaddle)+ball.y
    let contactPoint1Y = ball.y
    let bounces = 0
    let adjustedHeight = 0
    let smallContact = 0
    let largeContact = canvas.height
    //finding at what Y value the ball will hit the wall
    if (velocityY > 0){
        while (contactPoint1Y < canvas.height-10){
            contactPoint1Y += velocityY
        }
        let contactPoint2Y = contactPoint1Y
        while (contactPoint2Y > 10){
            contactPoint2Y -= velocityY
        }
        adjustedHeight = contactPoint1Y-contactPoint2Y
        largeContact = contactPoint1Y
        smallContact = contactPoint2Y
    }
    else if (velocityY < 0){
        while (contactPoint1Y > 10){
            contactPoint1Y += velocityY
        }
        let contactPoint2Y = contactPoint1Y
        while (contactPoint2Y < canvas.height-10){
            contactPoint2Y -= velocityY
        }
        adjustedHeight = contactPoint2Y-contactPoint1Y
        largeContact = contactPoint2Y
        smallContact = contactPoint1Y
    }

    //calculating how many times the ball will bounce off the walls
    if(predictedSpotY1 < smallContact){
        bounces = Math.ceil(Math.abs(predictedSpotY1/adjustedHeight))
    }
    else if(predictedSpotY1 > largeContact){
        bounces = Math.floor(predictedSpotY1/adjustedHeight)
    }

    //calculating where the ball will be when in hits the left paddle
    if (predictedSpotY1 > largeContact && bounces == 1){
        predictedSpotY1 = contactPoint1Y*2-predictedSpotY1
    }
    else if (predictedSpotY1 < smallContact && bounces == 1){
        predictedSpotY1 = Math.abs(predictedSpotY1)+(canvas.height+contactPoint1Y)-(canvas.height-contactPoint1Y)
    }
    else if (predictedSpotY1 < smallContact && (bounces % 2) == 0){
        predictedSpotY1 = (adjustedHeight*bounces)-Math.abs(predictedSpotY1)
    }
    else if (predictedSpotY1 > largeContact && (bounces % 2) == 0){
        predictedSpotY1 = predictedSpotY1-(adjustedHeight*bounces)
    }
    else if(predictedSpotY1 > largeContact && (bounces % 2) != 0){
        predictedSpotY1 = adjustedHeight-(predictedSpotY1-( adjustedHeight*bounces))+contactPoint2Y*2      
    }
    else if(predictedSpotY1 < smallContact && (bounces % 2) != 0){
        predictedSpotY1 = adjustedHeight+(Math.abs(predictedSpotY1)-adjustedHeight*bounces)+contactPoint1Y*2
    }
}
//calculates where the ball will end up when it gets to the paddle
function calculate2(){
    let distanceToPaddle = (paddle2.x-ball.x)
    let slope = (velocityY/(velocityX+paddleSpeedX))
    //let slope = (velocityY/velocityX)
    predictedSpotY2 = (slope*distanceToPaddle)+ball.y
    let contactPoint1Y = ball.y
    let bounces = 0
    let adjustedHeight = 0
    let smallContact = 0
    let largeContact = canvas.height
    //finding at what Y value the ball will hit the wall
    if (velocityY > 0){
        while (contactPoint1Y < canvas.height-10){
            contactPoint1Y += velocityY
        }
        let contactPoint2Y = contactPoint1Y
        while (contactPoint2Y > 10){
            contactPoint2Y -= velocityY
        }
        adjustedHeight = contactPoint1Y-contactPoint2Y
        largeContact = contactPoint1Y
        smallContact = contactPoint2Y
    }
    else if (velocityY < 0){
        while (contactPoint1Y > 10){
            contactPoint1Y += velocityY
        }
        let contactPoint2Y = contactPoint1Y
        while (contactPoint2Y < canvas.height-10){
            contactPoint2Y -= velocityY
        }
        adjustedHeight = contactPoint2Y-contactPoint1Y
        largeContact = contactPoint2Y
        smallContact = contactPoint1Y
    }

    //calculating how many times the ball will bounce off the walls
    if(predictedSpotY2 < smallContact){
        bounces = Math.ceil(Math.abs(predictedSpotY2/adjustedHeight))
    }
    else if(predictedSpotY2 > largeContact){
        bounces = Math.floor(predictedSpotY2/adjustedHeight)
    }

    //calculating where the ball will be when in hits the right paddle
    if (predictedSpotY2 > largeContact && bounces == 1){
        predictedSpotY2 = contactPoint1Y*2-predictedSpotY2
    }
    else if (predictedSpotY2 < smallContact && bounces == 1){
        predictedSpotY2 = Math.abs(predictedSpotY2)+(canvas.height+contactPoint1Y)-(canvas.height-contactPoint1Y)
    }
    else if (predictedSpotY2 < smallContact && (bounces % 2) == 0){
        predictedSpotY2 = (adjustedHeight*bounces)-Math.abs(predictedSpotY2)
    }
    else if (predictedSpotY2 > largeContact && (bounces % 2) == 0){
        predictedSpotY2 = predictedSpotY2-(adjustedHeight*bounces)
    }
    else if(predictedSpotY2 > largeContact && (bounces % 2) != 0){
        predictedSpotY2 = adjustedHeight-(predictedSpotY2-(adjustedHeight*bounces))+contactPoint2Y*2      
    }
    else if(predictedSpotY2 < smallContact && (bounces % 2) != 0){
        predictedSpotY2 = adjustedHeight+(Math.abs(predictedSpotY2)-adjustedHeight*bounces)+contactPoint1Y*2
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
    }
    requestAnimationFrame(draw);
}

draw();