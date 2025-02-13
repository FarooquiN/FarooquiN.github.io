window.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Load sprites
    const tileset = new Image();
    tileset.src = "8bit-garden.png"; // Replace with garden sprite

    const player = {
        x: 100,
        y: 400,
        width: 64,
        height: 64,
        sprite: new Image(),
        frame: 0,
        moving: false
    };
    player.sprite.src = "8bit-character.png"; // Character sprite

    const houseSprite = new Image();
    houseSprite.src = "8bit-house.png"; // House sprite

    // Houses coordinates and actions
    const houses = [
        { x: 600, y: 250, width: 150, height: 100, action: () => window.location.href = "list-of-reasons.html" },
        { x: 200, y: 250, width: 190, height: 120, action: () => window.location.href = "singing-video.html" }
    ];

    let showMessage = true;
    let keys = {};
    let speed = 4; // Increased speed for smoother movement

    // Background music autoplay fix
    let bgMusic = new Audio("background-music.mp3");
    bgMusic.loop = true;

    document.addEventListener("DOMContentLoaded", () => {
        const playMusic = () => {
            bgMusic.play().catch(() => {
                console.log("Autoplay blocked, retrying...");
                setTimeout(playMusic, 1000);
            });
        };
        playMusic();
    });

    // Keyboard Controls
    document.addEventListener("keydown", (e) => {
        keys[e.key] = true;
        player.moving = true;
    });

    document.addEventListener("keyup", (e) => {
        keys[e.key] = false;
        player.moving = false;
    });

    // Touch Controls
    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener("touchmove", (e) => {
        touchEndX = e.touches[0].clientX;
        touchEndY = e.touches[0].clientY;
    });

    document.addEventListener("touchend", () => {
        let dx = touchEndX - touchStartX;
        let dy = touchEndY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30) player.x += speed * 5;  // Swipe Right
            else if (dx < -30) player.x -= speed * 5; // Swipe Left
        } else {
            if (dy > 30) player.y += speed * 5;  // Swipe Down
            else if (dy < -30) player.y -= speed * 5; // Swipe Up
        }
    });

    function update() {
        // Keyboard movement
        if (keys["ArrowUp"] || keys["w"]) player.y -= speed;
        if (keys["ArrowDown"] || keys["s"]) player.y += speed;
        if (keys["ArrowLeft"] || keys["a"]) player.x -= speed;
        if (keys["ArrowRight"] || keys["d"]) player.x += speed;

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

        // Draw player
        ctx.drawImage(player.sprite, player.x, player.y, player.width, player.height);

        // Draw houses
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
            opacity -= 0.1;
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
};
