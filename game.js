// Отримання елемента canvas та контексту для малювання
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Завантаження зображень
const dinoImg = new Image();
dinoImg.src = 'assets/dino.png';


const cactusImg = new Image();
cactusImg.src = 'assets/cactus.png';


// Динозавр об'єкт
const dino = {
    x: 50,
    y: canvas.height - 100,
    width: 80,
    height: 80,
    draw() {
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    }
};


// Перешкоди об'єкт
const cactus = {
    x: canvas.width,
    y: canvas.height - 70,
    width: 60,
    height: 70,
    speed: 10,
    draw() {
        ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
    },
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
    }
};


// Основна функція гри
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    dino.draw();
    cactus.draw();
    cactus.update();


    requestAnimationFrame(gameLoop);
}


// Обробник натискання клавіш
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


// Функція стрибка динозавра
function jump() {
    if (dino.y === canvas.height - 100) {
        let jumpInterval = setInterval(function() {
            if (dino.y === canvas.height - 200) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function() {
                    if (dino.y === canvas.height - 100) {
                        clearInterval(fallInterval);
                    } else {
                        dino.y += 5;
                    }
                }, 20);
            } else {
                dino.y -= 5;
            }
        }, 20);
    }
}
// Функція перевірки
function checkCollisions() {
    if (dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y) {
        endGame();
    }
}


// Додайте змінну, яка вказуватиме, чи гра активна
let isGameActive = true;

// Функція, яка реагує на натискання клавіші Enter
document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        if (isGameActive) {
            // Якщо гра активна, зупиніть гру
            endGame();
        } else {
            // Якщо гра неактивна, почніть гру
            startGame();
        }
    } else if (event.code === 'Space') {
        // Якщо натиснута клавіша Space, і гра активна, виконайте стрибок
        if (isGameActive) {
            jump();
        }
    }
});

// Функція початку гри
function startGame() {
    isGameActive = true;

    // Відновлення позицій та властивостей динозавра та перешкод
    dino.y = canvas.height - 100;
    cactus.x = canvas.width;

    // Запуск головного циклу гри
    gameLoop();
}

// Функція завершення гри
function endGame() {
    isGameActive = false;

    // Очистити екран
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Вивести повідомлення про кінець гри
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over)', canvas.width / 2 - 100, canvas.height / 2);
}

// Основна функція гри
function gameLoop() {
    if (isGameActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dino.draw();
        cactus.draw();
        cactus.update();

        checkCollisions(); // Перевірка колізій

        requestAnimationFrame(gameLoop);
    }
}

// Запуск гри при завантаженні сторінки
startGame();
