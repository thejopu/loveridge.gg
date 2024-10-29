document.addEventListener("DOMContentLoaded", () => {
    loadItems();
    loadTime();
    setInterval(loadTime, 1000); // Update time every second
});

function loadItems() {
    var items = [
        { "icon": "fa-solid fa-robot", "text": "ChatGPT", "link": "https://chatgpt.com/", "accent": "#8b89cc" },
        { "icon": "fa-brands fa-discord", "text": "Bot Analytics", "link": "https://discordanalytics.xyz/dash", "accent": "#8b89cc" },
        { "icon": "fa-solid fa-terminal", "text": "Bot Console", "link": "https://logs.jdf.gg", "accent": "#8b89cc" },
        { "icon": "fa-solid fa-user-shield", "text": "Simple Login", "link": "https://app.simplelogin.io/", "accent": "#8b89cc" },
        { "icon": "fa-solid fa-chalkboard-teacher", "text": "AT Training", "accent": "#8b89cc", "subItems": [
            { "icon": "fa-solid fa-dragon", "text": "Dragon", "link": "dragon_training.html" }
            
        ]}
    ];

    let html = "";
    items.forEach((obj, index) => {
        if (obj.subItems) {
            // Wrap the AT Training button and sub-items in a container
            html += `<div class="training-container">`;
            html += `
                <div class="w-24 shadow item flex flex-col items-center p-4" onclick="toggleSubItems(${index})">
                    <i class="${obj.icon} text-3xl"></i>
                    <div>${obj.text}</div>
                </div>
                <div class="sub-items" id="sub-items-${index}">
            `;
            obj.subItems.forEach(sub => {
                html += `
                    <a href="${sub.link}" class="w-20 shadow sub-item flex flex-col items-center p-2">
                        <i class="${sub.icon} text-2xl"></i>
                        <div>${sub.text}</div>
                    </a>
                `;
            });
            html += `</div></div>`;
        } else {
            // Generate regular buttons
            html += `
                <a target="_blank" href="${obj.link}" class="w-24 shadow item flex flex-col items-center p-4">
                    <i class="${obj.icon} text-3xl"></i>
                    <div>${obj.text}</div>
                </a>
            `;
        }
    });

    document.querySelector(".items").innerHTML = html;
}


function toggleSubItems(index) {
    const subItems = document.getElementById(`sub-items-${index}`);
    const trainingButton = subItems.previousElementSibling; // "AT Training" button

    subItems.classList.toggle("expanded");
    trainingButton.classList.toggle("active"); // Add or remove the active class
}


function toggleATTraining() {
    const subItems = document.getElementById("at-sub-items");
    subItems.classList.toggle("hidden"); // Toggle visibility of sub-items

    // Slide-down effect
    if (!subItems.classList.contains("hidden")) {
        subItems.style.maxHeight = subItems.scrollHeight + "px"; // Expand to full height
    } else {
        subItems.style.maxHeight = "0"; // Collapse
    }
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

    document.querySelector('.time').innerHTML = formattedTime;  // Set HTML instead of textContent for colon
    document.querySelector(".day").textContent = weekday[currentDate.getDay()];
    document.querySelector("#date").textContent = formattedDate;
}
