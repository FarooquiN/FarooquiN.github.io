const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;

document.body.style.margin = "0";
document.body.style.overflow = "hidden";

// Garden sprite
const tileset = new Image();
tileset.src = "8bit-garden.png"; // Replace with your garden sprite

// Player character sprite
const player = {
    x: 100,
    y: 400,
    width: 64, // Increased size
    height: 64, // Increased size
    sprite: new Image(),
    frame: 0,
    moving: false
};
player.sprite.src = "8bit-character.png"; // Replace with character sprite

// House sprite
const houseSprite = new Image();
houseSprite.src = "8bit-house.png"; // Replace with house sprite image

// Houses coordinates and actions
const houses = [
    { x: 600, y: 250, width: 150, height: 100, action: () => window.location.href = "list-of-reasons.html" },
    { x: 200, y: 250, width: 190, height: 120, action: () => window.location.href = "singing-video.html" }
];

let showMessage = true;
let keys = {};
let bgMusic = new Audio("background-music.mp3"); // Replace with actual file
bgMusic.loop = true;

// Play music when the user interacts
document.addEventListener('keydown', () => {
    bgMusic.play();
}, { once: true });

let stepSound = new Audio("step-sound.mp3"); // Replace with actual file

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
    player.moving = true;
    stepSound.play();
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
    player.moving = false;
});

// Variables for touch controls
let touchStartX, touchStartY, touchEndX, touchEndY;
let touchMoveDirection = '';

// Touch events
canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
    determineTouchDirection();
});

canvas.addEventListener('touchend', () => {
    touchMoveDirection = '';
});

// Increase sensitivity for touch swipes
const touchSensitivity = 50; // Increase this value for more sensitivity

// Determine touch direction with higher sensitivity
function determineTouchDirection() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > touchSensitivity || Math.abs(diffY) > touchSensitivity) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
            touchMoveDirection = diffX < 0 ? 'left' : 'right';
        } else {
            touchMoveDirection = diffY < 0 ? 'up' : 'down';
        }
    }
}

function update() {
    let speed = 2;
    if (keys["ArrowUp"] || keys["w"] || touchMoveDirection === 'up') player.y -= speed;
    if (keys["ArrowDown"] || keys["s"] || touchMoveDirection === 'down') player.y += speed;
    if (keys["ArrowLeft"] || keys["a"] || touchMoveDirection === 'left') player.x -= speed;
    if (keys["ArrowRight"] || keys["d"] || touchMoveDirection === 'right') player.x += speed;

    // Collision detection for houses
    houses.forEach(house => {
        // Check if the player is touching or inside the house
        if (
            player.x + player.width > house.x &&
            player.x < house.x + house.width &&
            player.y + player.height > house.y &&
            player.y < house.y + house.height
        ) {
            // Trigger transition immediately upon collision
            fadeOut(house.action);
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tileset, 0, 0, canvas.width, canvas.height);

    // Draw the player character
    ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);

    // Draw the houses
    houses.forEach(house => {
        ctx.drawImage(houseSprite, house.x, house.y, house.width, house.height);
    });

    // Display message
    if (showMessage) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(50, 50, 700, 100);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Hi Bablu, see those two houses there? Why not check them out?", 60, 100);
        setTimeout(() => (showMessage = false), 5000);
    }
}

function fadeOut(callback) {
    let opacity = 1;
    let fadeInterval = setInterval(() => {
        opacity -= 0.05;
        canvas.style.opacity = opacity;
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            callback(); // Trigger the action (e.g., navigate to another page or show content)
        }
    }, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
