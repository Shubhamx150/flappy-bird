function saveUserData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    if (name && age) {
        localStorage.setItem('userData', JSON.stringify({ name, age }));
        localStorage.setItem('player_logged_in', 'true');
        window.location.href = 'mainmenu_animation.html'; // Redirect to animation for returning players
    } else {
        alert('Please enter your name and age.');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let userData = localStorage.getItem("userData");
    
    if (!userData) {
        // If user data is not found, redirect to login page
        window.location.href = "index.html";
        return;
    }

    let isReturningPlayer = localStorage.getItem("player_logged_in");
    if (isReturningPlayer) {
        window.location.href = "mainmenu_animation.html"; // Redirect returning players to animation
        return;
    }
});

