document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 480;
    canvas.height = 640;

    let difficulty = localStorage.getItem('difficulty') || 'normal';

    const difficulties = {
        "easy": { pipeSpeed: 2, gapHeight: 150, gravity: 0.4 },
        "normal": { pipeSpeed: 3, gapHeight: 120, gravity: 0.5 },
        "hard": { pipeSpeed: 4, gapHeight: 100, gravity: 0.6 },
        "extreme": { pipeSpeed: 5, gapHeight: 80, gravity: 0.7 },
        "impossible": { pipeSpeed: 6, gapHeight: 60, gravity: 0.8 }
    };

    let pipeSpeed = difficulties[difficulty]?.pipeSpeed || 3;
    let gapHeight = difficulties[difficulty]?.gapHeight || 120;
    let birdGravity = difficulties[difficulty]?.gravity || 0.5;

    let bird = { 
        x: 50, 
        y: 150, 
        width: 30, 
        height: 30, 
        gravity: birdGravity, 
        lift: -8, 
        velocity: 0, 
        started: false 
    };

    let pipes = [];
    let frame = 0;
    let score = 0;
    let gameRunning = true;
    let gameStarted = false;

    const bgImage = new Image();
    const pipeTopImage = new Image();
    const pipeBottomImage = new Image();
    const birdImage = new Image();
    const groundImage = new Image();

    bgImage.src = 'image/background.jpg';
    pipeTopImage.src = 'image/top.jpg';
    pipeBottomImage.src = 'image/bottom.jpg';
    birdImage.src = 'image/bgr.png';
    groundImage.src = 'image/ground.jpg';

    let groundX = 0; // ✅ Ground scroll position
    let groundSpeed = pipeSpeed; // ✅ Move ground at same speed as pipes

    function drawBackground() {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }

    function drawBird() {
        ctx.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    }

    function drawPipes() {
        pipes.forEach(pipe => {
            ctx.drawImage(pipeTopImage, pipe.x, pipe.y - pipe.height, pipe.width, pipe.height);
            ctx.drawImage(pipeBottomImage, pipe.x, pipe.y + gapHeight, pipe.width, canvas.height - (pipe.y + gapHeight));
        });
    }

    function drawGround() {
        ctx.drawImage(groundImage, groundX, canvas.height - 50, canvas.width, 50);
        ctx.drawImage(groundImage, groundX + canvas.width, canvas.height - 50, canvas.width, 50);

        if (gameStarted) {
            groundX -= groundSpeed;
            if (groundX <= -canvas.width) {
                groundX = 0;
            }
        }
    }

    function checkCollision() {
        if (bird.y + bird.height >= canvas.height - 50 || bird.y <= 0) {
            gameOver();
        }

        pipes.forEach(pipe => {
            if (
                bird.x < pipe.x + pipe.width &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.y || bird.y + bird.height > pipe.y + gapHeight)
            ) {
                gameOver();
            }
        });
    }

    function updateGame() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawPipes();
        drawGround();
        drawBird();

        if (gameStarted) {
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            if (frame % 100 === 0) {
                let minPipeHeight = 100;
                let maxPipeHeight = canvas.height / 2;
                let height = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight);
                
                let pipeWidth = 150;  
                pipes.push({ x: canvas.width, y: height, width: pipeWidth, height: height, passed: false });
            }

            pipes.forEach(pipe => {
                pipe.x -= pipeSpeed;

                if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                    pipe.passed = true;
                    score++;
                }
            });

            pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
        }

        checkCollision();
        frame++;

        requestAnimationFrame(updateGame);
    }

    function gameOver() {
        if (!gameRunning) return;
        gameRunning = false;
        localStorage.setItem("lastScore", score);
        window.location.href = "gameover.html";
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            bird.started = true;
            bird.velocity = bird.lift;
        } else {
            bird.velocity = bird.lift;
        }
    }

    document.addEventListener('keydown', (event) => {
        if (event.code === "Space" && gameRunning) {
            startGame();
        }
    });

    document.addEventListener('touchstart', () => {
        if (gameRunning) {
            startGame();
        }
    });

    document.addEventListener('click', () => {
        if (gameRunning) {
            startGame();
        }
    });

    updateGame();
});
