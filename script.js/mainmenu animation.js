document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('canvas'); // Fix ID
    const ctx = canvas.getContext('2d');
    canvas.width = 480;
    canvas.height = 640;

    let isReturningPlayer = localStorage.getItem("player_logged_in");

    if (!isReturningPlayer) {
        localStorage.setItem("player_logged_in", "true");
        window.location.href = "index.html";
        return;
    }

    const bgImage = new Image();
    const birdImage = new Image();
    bgImage.src = 'image/background.jpg';
    birdImage.src = 'image/bgr.png';

    let birdX = -50;
    let birdY = canvas.height / 2;
    let velocity = 3; // Speed of movement
    let amplitude = 50; // Wave height
    let frequency = 0.05; // Wave frequency
    let frame = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
        
        // Create a wave motion using sine function
        birdY = (canvas.height / 2) + amplitude * Math.sin(frame * frequency);

        ctx.drawImage(birdImage, birdX, birdY, 50, 40);
        birdX += velocity;
        frame += 1;

        if (birdX < canvas.width) {
            requestAnimationFrame(animate);
        } else {
            window.location.href = "main_menu.html";
        }
    }

    bgImage.onload = function () {
        birdImage.onload = animate;
    };
});
