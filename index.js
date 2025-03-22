const container = document.getElementById('container');
const gameViewer = document.getElementById('gameViewer');
const gameFrame = document.getElementById('gameFrame');
const apiURL = "https://cdn.jsdelivr.net/gh/genizy/ugs-files@main/allGames.txt";
const baseURL = "https://cdn.jsdelivr.net/gh/genizy/ugs-files@main/";

function formatTitle(fileName) {
    let nameWithoutExtension = fileName.replace(".html", "").replace("cl", "");
    const cleanName = nameWithoutExtension.replace(/[-_]/g, " ");
    return cleanName.replace(/\b\w/g, char => char.toUpperCase());
}
async function listGames() {
    try {
        const response = await fetch(apiURL);
        const resText = await response.text();
        const files = resText.split("\n");
        container.innerHTML = "";
        files.forEach(file => {
            if (file.endsWith(".html")) {
                const button = document.createElement("button");
                button.textContent = formatTitle(file);
                button.onclick = () => openGame(baseURL + file);
                container.appendChild(button);
            }
        });
        if (container.innerHTML === "") {
            container.innerHTML = "No HTML files found.";
        }
    } catch (error) {
        container.innerHTML = `Error loading games: ${error}`;
    }
}

function openGame(url) {
    fetch(url).then(response => response.text()).then(html => {
        gameFrame.contentDocument.open();
        gameFrame.contentDocument.write(html);
        gameFrame.contentDocument.close();
        gameViewer.style.display = "block";
    }).catch(error => alert("Failed to load game: " + error));
}

function closeGame() {
    gameViewer.style.display = "none";
    gameFrame.src = "about:blank";
}

function fullscreenGame() {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.mozRequestFullScreen) {
        gameFrame.mozRequestFullScreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
}
listGames();
