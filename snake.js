// Розмір блоку та розміри поля
var blockSize = 60;
var rows = 20;
var cols = 20;
var board;
var context;

// Початкові координати змійки
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Початкова швидкість змійки
var velocityX = 0;
var velocityY = 0;

// Тіло змійки та координати їжі
var snakeBody = [];
var foodX;
var foodY;

// Флаг завершення гри та рахунок
var gameOver = false;
var score = 0;

// Час гри
var time = 0;

// Викликається при завантаженні сторінки
window.onload = function() {
    // Отримання елементів canvas та контексту для малювання
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    // Розміщення першої їжі та встановлення обробника натискання клавіш
    placeFood();
    document.addEventListener("keyup", changeDirection);

    // Запуск інтервалів оновлення гри та часу гри
    setInterval(update, 1000 / 10);
    setInterval(updateTime, 1000); // Оновлення часу кожну секунду
}

// Оновлення стану гри
function update() {
    if (gameOver) {
        return;
    }

    // Очистка поля
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // Виведення їжі
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Логіка при з'їданні їжі
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        updateScore();
    }

    // Зміщення тіла змійки
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    // Оновлення координат голови змійки
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Виведення голови змійки
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    // Виведення тіла змійки
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Перевірка на зіткнення змійки з краєм поля
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        displayGameOver();
    }

    // Перевірка на зіткнення змійки з власним тілом
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            displayGameOver();
        }
    }
}

// Зміна напрямку руху змійки
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

// Розміщення нової їжі
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Оновлення виводу рахунку
function updateScore() {
    document.getElementById("score").innerHTML = "Score: " + score;
}

// Оновлення часу гри
function updateTime() {
    time++;
    document.getElementById("time").innerHTML = "Time: " + formatTime(time);
}

// Форматування часу з секунд у хвилини та секунди
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return minutes + " хв " + remainingSeconds + " с";
}
// Додайте обробник події для натискання клавіші пробіл
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Перезапуск гри
        restartGame();
    }
});


// Виведення повідомлення "Game Over" на екрані
function displayGameOver() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    
    context.fillStyle = "white";
    context.font = "50px Arial";
    context.textAlign = "center";
    context.fillText("Гру Закінчено!", board.width / 2, board.height / 2);
    context.font = "25px Arial";
    context.fillText("Кількість з'їдених яблучок: " + score, board.width / 2, board.height / 2 + 35);
    context.fillText("Час гри: " + formatTime(time), board.width / 2, board.height / 2 + 60);
    context.font = "20px Arial";
    context.fillText("Натисніть кнопку Space щоб почати гру спочатку", board.width / 2, board.height / 2 + 100);
    
    
}

// Функція для перезапуску гри
function restartGame() {
    // Скидання всіх значень на початкові
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    score = 0;
    time = 0;

    // Очистка поля та розміщення нової їжі
    context.clearRect(0, 0, board.width, board.height);
    placeFood();

    // Оновлення виводу рахунку та часу
    updateScore();
    updateTime();
}
