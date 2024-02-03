var blockSize = 60;  // Розмір кожного блоку у грі.

var rows = 20;  // Кількість рядків на полі гри.
var cols = 20;  // Кількість стовпчиків на полі гри.

var board;  // Поле гри.
var context;  // Контекст малювання для поля гри.

var snakeX = blockSize * 5;  // Початкова координата X голови змії.
var snakeY = blockSize * 5;  // Початкова координата Y голови змії.

var velocityX = 0;  // Початкова швидкість змії по вісі X.
var velocityY = 0;  // Початкова швидкість змії по вісі Y.

var snakeBody = [];  // Масив для зберігання координат тіла змії.

var foodX;  // Координата X їжі на полі гри.
var foodY;  // Координата Y їжі на полі гри.

var gameOver = false;  // Прапорець, що вказує, чи закінчилася гра.

var score = 0;  // Рахунок гравця.

var time = 0;  // Час гри у секундах.

window.onload = function () {
    // Отримання елементів гри та ініціалізація.
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Розміщення їжі та додавання обробників подій.
    placeFood();
    document.addEventListener("keyup", handleKeyup);

    // Встановлення інтервалів для оновлення гри та часу.
    setInterval(update, 1000 / 10);
    setInterval(updateTime, 1000);
}

// Обробник події натискання клавіші.
function handleKeyup(e) {
    if (e.code === "Space") {
        restartGame();
    } else {
        changeDirection(e);
    }
}

// Функція для рестарту гри.
function restartGame() {
    // Скидання параметрів гравця та гри.
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

    // Очищення поля гри та розміщення нової їжі.
    context.clearRect(0, 0, board.width, board.height);
    placeFood();

    // Оновлення рахунку та часу гри.
    updateScore();
    updateTime();
}

// Функція для оновлення стану гри.
function update() {
    if (gameOver) {
        return;
    }

    // Очищення поля гри.
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Малювання їжі.
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Логіка збільшення рахунку та оновлення координат змії при з'їданні їжі.
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    // Логіка для руху тіла змії.
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Переміщення голови змії.
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Малювання голови змії та її тіла.
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Логіка завершення гри при виході за межі поля чи зіткненні з тілом змії.
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

// Функція для зміни напрямку руху змії.
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

// Функція для розміщення їжі на полі гри.
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Функція для оновлення рахунку гравця.
function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

// Функція для оновлення часу гри.
function updateTime() {
    time++;
    document.getElementById("time").innerHTML = "Time: " + formatTime(time);
}

// Функція для форматування часу у хвилини та секунди.
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + " хв " + remainingSeconds + " с";
}
