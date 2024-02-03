var blockSize = 60;


var rows = 20;
var cols = 20;


var board;


var context;


var snakeX = blockSize * 5;
var snakeY = blockSize * 5;


var velocityX = 0;
var velocityY = 0;


var snakeBody = [];


var foodX;
var foodY;


var gameOver = false;


var score = 0;

var time = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", handleKeyup);

    setInterval(update, 1000 / 10);
    setInterval(updateTime, 1000);
}

function handleKeyup(e) {
    if (e.code === "Space") {
        restartGame();
    } else {
        changeDirection(e);
    }
}

function restartGame() {
    
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    
    velocityX = 0;
    velocityY = 0;
    
    snakeBody = [];

    
    foodX = undefined;
    foodY = undefined;

    
    gameOver = false;
    
    score = 0;
    time = 0;

    
    context.clearRect(0, 0, board.width, board.height);

    
    placeFood();
    
    updateScore();
    
    updateTime();
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert("Гру закінчено! Ваш рахунок: " + score + "\nЧас гри: " + formatTime(time) + "\nНатисніть кнопку Space 2 рази, щоб почати гру спочатку.");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Гру закінчено! Ваш рахунок: " + score + "\nЧас гри: " + formatTime(time) + "\nНатисніть кнопку Space 2 рази, щоб почати гру спочатку.");
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        
        velocityX = 0;
        velocityY = -1;
        
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        
        velocityX = 0;
        velocityY = 1;
        
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        
        velocityX = -1;
        velocityY = 0;
        
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

function updateTime() {
    time++;
    document.getElementById("time").innerHTML = "Time: " + formatTime(time);
}

function formatTime(seconds) {
    
    var minutes = Math.floor(seconds / 60);
    
    var remainingSeconds = seconds % 60;
    
    return minutes + " хв " + remainingSeconds + " с";
    
}
