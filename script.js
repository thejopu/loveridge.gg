
document.addEventListener("DOMContentLoaded", () => {
    loadTime();
    setInterval(loadTime, 1000); // Update time every second
});

function toggleSubItems(index) {
    const subItems = document.getElementById(`sub-items-${index}`);
    const trainingButton = subItems.previousElementSibling;

    subItems.classList.toggle("expanded");
    trainingButton.classList.toggle("active"); // Toggle the active class for the accent color
}

function loadTime() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}<span class="colon">:</span>${minutes < 10 ? '0' : ''}${minutes}`;

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    document.querySelector('.time').innerHTML = formattedTime;
    document.querySelector(".day").textContent = weekday[currentDate.getDay()];
    document.querySelector("#date").textContent = formattedDate;
}

function checkPassword(index) {
    const password = prompt("Enter the password to access AT Training:");
    const correctPassword = "AT2024";  // Change this to your desired password

    if (password === correctPassword) {
        toggleSubItems(index);
    } else {
        alert("Incorrect password!");
    }
}
