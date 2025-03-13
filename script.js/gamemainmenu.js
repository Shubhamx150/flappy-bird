document.addEventListener("DOMContentLoaded", function () {
    // Get all difficulty buttons
    const difficultyButtons = document.querySelectorAll(".difficulty-btn");

    difficultyButtons.forEach(button => {
        button.addEventListener("click", function () {
            let selectedDifficulty = this.getAttribute("data-difficulty");

            // Save difficulty selection
            localStorage.setItem("difficulty", selectedDifficulty);

            console.log("Difficulty Selected:", selectedDifficulty); // Debugging

            // Navigate to the game page
            window.location.href = "game.html";
        });
    });

    // Exit button functionality
    const exitButton = document.getElementById("exit-button");
    if (exitButton) {
        exitButton.addEventListener("click", function () {
            if (confirm("Are you sure you want to exit?")) {
                window.close();
            }
        });
    }
});
