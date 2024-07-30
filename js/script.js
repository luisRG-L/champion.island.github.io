const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables del jugador
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
    dx: 0,
    dy: 0
};

// Mapa de juego
const map = {
    tileSize: 50, // Tamaño de cada tile
    walls: [],
    goals: []
};

// Generar paredes y arcos aleatoriamente
function generateMapElements() {
    for (let i = 0; i < 100; i++) {
        const wall = {
            x: Math.random() * map.tileSize * 20,
            y: Math.random() * map.tileSize * 20,
            size: map.tileSize,
            color: 'green'
        };
        map.walls.push(wall);
    }

    for (let i = 0; i < 10; i++) {
        const goal = {
            x: Math.random() * map.tileSize * 20,
            y: Math.random() * map.tileSize * 20,
            width: map.tileSize,
            height: map.tileSize * 2,
            color: 'yellow'
        };
        map.goals.push(goal);
    }
}

// Dibujar el fondo (mapa)
function drawBackground() {
    for (let x = -player.x % map.tileSize; x < canvas.width; x += map.tileSize) {
        for (let y = -player.y % map.tileSize; y < canvas.height; y += map.tileSize) {
            ctx.fillStyle = (Math.floor((x + player.x) / map.tileSize) % 2 === 0) ^ (Math.floor((y + player.y) / map.tileSize) % 2 === 0) ? '#3498db' : '#2980b9';
            ctx.fillRect(x, y, map.tileSize, map.tileSize);
        }
    }
}

// Dibujar las paredes
function drawWalls() {
    for (const wall of map.walls) {
        ctx.fillStyle = wall.color;
        ctx.fillRect(wall.x - player.x + canvas.width / 2 - player.size / 2, wall.y - player.y + canvas.height / 2 - player.size / 2, wall.size, wall.size);
    }
}

// Dibujar los arcos
function drawGoals() {
    for (const goal of map.goals) {
        ctx.fillStyle = goal.color;
        ctx.fillRect(goal.x - player.x + canvas.width / 2 - player.size / 2, goal.y - player.y + canvas.height / 2 - player.size / 2, goal.width, goal.height);
    }
}

// Dibujar el jugador
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width / 2 - player.size / 2, canvas.height / 2 - player.size / 2, player.size, player.size);
}

// Limpiar el lienzo
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Actualizar la posición del jugador
function updatePlayerPosition() {
    player.x += player.dx;
    player.y += player.dy;
    detectCollisions();
}

// Detectar colisiones con las paredes y arcos
function detectCollisions() {
    for (const wall of map.walls) {
        if (player.x < wall.x + wall.size &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.size &&
            player.y + player.size > wall.y) {
            // Colisión con una pared verde
            player.x -= player.dx;
            player.y -= player.dy;
        }
    }

    for (const goal of map.goals) {
        if (player.x < goal.x + goal.width &&
            player.x + player.size > goal.x &&
            player.y < goal.y + goal.height &&
            player.y + player.size > goal.y) {
            // Colisión con un arco amarillo
            alert('Has encontrado el arco de tenis!');
            // Puedes agregar lógica para iniciar el mini juego de tenis aquí
        }
    }
}

// Manejar el movimiento del jugador
function movePlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
            player.dy = -player.speed;
            break;
        case 'ArrowDown':
            player.dy = player.speed;
            break;
        case 'ArrowLeft':
            player.dx = -player.speed;
            break;
        case 'ArrowRight':
            player.dx = player.speed;
            break;
    }
}

// Detener el movimiento del jugador
function stopPlayer(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            player.dy = 0;
            break;
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
}

// Actualizar el juego
function update() {
    clear();
    drawBackground();
    updatePlayerPosition();
    drawWalls();
    drawGoals();
    drawPlayer();
    requestAnimationFrame(update);
}

// Iniciar el juego
function startGame() {
    generateMapElements();
    update();
}

// Escuchar eventos de teclado
window.addEventListener('keydown', movePlayer);
window.addEventListener('keyup', stopPlayer);

// Iniciar el juego cuando se carga la página
window.onload = startGame;
