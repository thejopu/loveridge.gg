
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

const gistId = "9c2f3820b8359437d5ac8a767d1d64c9"; // Replace with your Gist ID
const token = "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n"; // Replace with your GitHub token

// Function to load the note from GitHub Gist
async function loadNote() {
    try {
        const response = await fetch(`https://api.github.com/gists/${gistId}`, {
            headers: {
                "Authorization": `token ${token}`
            }
        });
        const gist = await response.json();
        const noteContent = gist.files["notepad.json"].content;
        document.getElementById("notepad").value = noteContent;
    } catch (error) {
        console.error("Failed to load note:", error);
        alert("Error loading note. Please try again later.");
    }
}

// Function to save the note to GitHub Gist with content filtering
async function saveNote() {
    const noteContent = document.getElementById("notepad").value;
    const blockedWords = ["rudeWord1", "rudeWord2", "racistTerm"]; // Add your custom filter words here

    // Check for blocked words
    for (const word of blockedWords) {
        if (noteContent.toLowerCase().includes(word)) {
            alert("Your note contains inappropriate language and cannot be saved.");
            return;
        }
    }

    const payload = {
        files: {
            "notepad.json": {
                content: noteContent
            }
        }
    };

    try {
        await fetch(`https://api.github.com/gists/${gistId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        alert("Note saved successfully!");
    } catch (error) {
        console.error("Failed to save note:", error);
        alert("Error saving note. Please try again later.");
    }
}

// Load the note when the page loads
document.addEventListener("DOMContentLoaded", loadNote);

