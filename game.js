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

// Touch control variables
let touchStartX, touchStartY, touchMoveX, touchMoveY;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    touchMoveX = e.touches[0].clientX;
    touchMoveY = e.touches[0].clientY;

    // Calculate movement direction
    let deltaX = touchMoveX - touchStartX;
    let deltaY = touchMoveY - touchStartY;

    player.x += deltaX * 0.1;  // Scale the movement for smoother control
    player.y += deltaY * 0.1;

    touchStartX = touchMoveX; // Update start position to prevent jarring movement
    touchStartY = touchMoveY;
});

canvas.addEventListener('touchend', () => {
    player.moving = false;
});

function update() {
    let speed = 2;

    // Collision detection for houses
    houses.forEach(house => {
        if (
            player.x + player.width > house.x &&
            player.x < house.x + house.width &&
            player.y + player.height > house.y &&
            player.y < house.y + house.height
        ) {
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
            callback();
        }
    }, 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
