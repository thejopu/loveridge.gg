document.addEventListener("DOMContentLoaded", () => {
    loadItems();
    loadTime();
    setInterval(loadTime, 1000); // Update time every second
});

function loadItems() {
    var items = [
        {
            "icon": "fa-solid fa-user-shield",
            "text": "Simple Login",
            "link": "https://app.simplelogin.io/",
            "accent": "#8b89cc"
        },
        {
            "icon": "fa-brands fa-discord",
            "text": "Wizarding Cards Analytics",
            "link": "https://discordanalytics.xyz/dash",
            "accent": "#8b89cc"
        },
        {
            "icon": "fa-solid fa-terminal",
            "text": "Wizarding Cards Console",
            "link": "https://logs.jdf.gg",
            "accent": "#8b89cc"
        }
    ];

    let html = "";
    items.forEach((obj, index) => {
        html += `
<a
target="_blank"
href="${obj.link}"
class="w-24 shadow item flex flex-col items-center p-4">
<i class="${obj.icon} text-3xl"></i>
<div>${obj.text}</div>
</a>
`;
    });
    document.querySelector(".items").innerHTML = html;
    addItemEvents(items);
}

function addItemEvents(items) {
    document.querySelectorAll(".item").forEach((div, index) => {
        div.addEventListener("mouseover", function(event) {
            div.style.color = items[index].accent;
        });
        div.addEventListener("mouseout", function(event) {
            div.style.color = "#cccccc";
        });
    });
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


