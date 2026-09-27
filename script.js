const TRAINER_NAME = "Ms. Cherry Lang Sakalam";
const EVENT_DURATION = 5;

const gameItems = [
{
id: "opening",
title: "Opening Spiel",
image: "images/opening.jpe",
message: '"Hi, thank you for calling Cigna Healthcare. How may I help you?"'
},
{
id: "bio",
title: "Busseng",
image: "images/paul.png",
message: 'Bio Break Madam(BBM)'
},
{
id: "ben&ben",
title: "Julian",
image: "images/motik.png",
message: 'October 2, 2026'
},
{
id: "tulog",
title: "Alex",
image: "images/tigas.png",
message: 'Sleepwell'
},
{
id: "mekus",
title: "Faiz",
image: "images/habibi.png",
message: 'Habibi'
},
{
id: "riz",
title: "Riza",
image: "images/ogriz.png",
message: 'OG R__'
},
{
id: "amazing",
title: "Verendale",
image: "images/amazing.png",
message: 'AMAZINGGGG!!!'
},
{
id: "tahimik",
title: "Jan",
image: "images/jan.png",
message: '....'
},
{
id: "girlie",
title: "Jay",
image: "images/jay.png",
message: "Girling Pie"
},
{
id: "scam",
title: "Kean",
image: "images/kean.png",
message: "Scammer"
},
{
id: "koya",
title: "Rex",
image: "images/rex.png",
message: "Mga 8080"
},
{
id: "innet",
title: "In-Network Benefits",
image: "images/disclaimer.jpg",
message: "Based on medical necessity and contracted rates"
},
{
id: "outnet",
title: "Out-Network Benefits",
image: "images/disclaimer.jpg",
message: "Based on medical necessity and maximum reimbursable charge"
},
{
id: "mrc",
title: "MRC2",
image: "images/disclaimer.jpg",
message: "Based on medicare rate"
},
{
id: "wa",
title: "Work Assist",
image: "images/tools.jpg",
message: "Tool for transcript and summarize the call"
},
{
id: "viper",
title: "ViPr",
image: "images/tools.jpg",
message: "Tool for navigating CPT. Diagnosis, HCPCS code"
},
{
id: "CED",
title: "CED",
image: "images/tools.jpg",
message: 'Tool for navigating the Eligibility of the member'
},
{
id: "cpf",
title: "CPF",
image: "images/tools.jpg",
message: 'Tool for navigating the participation of the provider'
},
{
id: "ptrack",
title: "PTrack",
image: "images/tools.jpg",
message: "Tool for third party as Payers"
},
{
id: "tpa",
title: "TPA Excel file",
image: "images/tools.jpg",
message: "Tool for third party as Alliances"
},
{
id: "pxdx",
title: "PXDX List",
image: "images/tools.jpg",
message: "Tool for verifying the corresponding CPT code that match to Diagnosis code"
},
{
id: "funds",
title: "Choice Funds",
image: "images/disclaimer.jpg",
message: "has an additional funds, designed to pick up of customer responsibility"
},
{
id: "accu",
title: "Accumulators",
image: "images/disclaimer.jpg",
message: "The Amount is subject to change"
},
{
id: "close",
title: "Closing Spiel",
image: "images/opening.jpe",
message: "'Its my pleasure to help you with your concern...'"
}
];

const playerModal = document.getElementById("playerModal");
const playerNameInput = document.getElementById("playerNameInput");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameDisplay = document.getElementById("playerName");
const trainerNameDisplay = document.getElementById("trainerName");
const modalTrainer = document.getElementById("modalTrainer");

const bingoCard = document.getElementById("bingoCard");
const messageText = document.getElementById("messageText");

const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");
const eventCounter = document.getElementById("eventCounter");

const bingoContainer = document.getElementById("bingoContainer");
const bingoBtn = document.getElementById("bingoBtn");

const bingoModal = document.getElementById("bingoModal");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainBtn = document.getElementById("playAgainBtn");

const timerText = document.getElementById("timerText");
const timerProgress = document.getElementById("timerProgress");

let playerName = "";
let cardItems = [];
let appearedMessages = [];
let activeItemId = null;
let checkedItems = new Set();
let bingoShown = false;
let timerInterval = null;
let timeRemaining = EVENT_DURATION;
let tooltip = null;

modalTrainer.textContent = TRAINER_NAME;
trainerNameDisplay.textContent = TRAINER_NAME;

function shuffle(array) {
return [...array].sort(() => Math.random() - 0.5);
}

function createCard() {
bingoCard.innerHTML = "";
checkedItems = new Set();
bingoShown = false;

bingoContainer.classList.remove("show");

const shuffledItems = shuffle(gameItems);

const cardLayout = [...shuffledItems];

cardLayout.splice(12, 0, null);

cardItems = cardLayout;

cardLayout.forEach((item, index) => {

    if (index === 12) {
        const freeTile = document.createElement("div");

        freeTile.className = "bingo-tile free-tile checked";

        freeTile.innerHTML = `
            <span><img class="tile-images" src="images/che.jpg" alt="cherrybomb"></span>
            <strong>FREE</strong>
            <small>SPACE</small>
        `;

        bingoCard.appendChild(freeTile);

        checkedItems.add("free");

        return;
    }

    const tile = document.createElement("div");

    tile.className = "bingo-tile locked";
    tile.dataset.id = item.id;

    tile.innerHTML = `
        <img class="tile-image" src="${item.image}" alt="${item.title}">
        <div class="tile-content">
            <span class="tile-text">${item.title}</span>

            <input
                type="checkbox"
                class="tile-checkbox"
                data-id="${item.id}"
                disabled
            >
        </div>
    `;

    const checkbox = tile.querySelector(".tile-checkbox");

    checkbox.addEventListener("change", function () {

        if (!activeItemId || activeItemId !== item.id) {
            checkbox.checked = false;
            return;
        }

        if (checkbox.checked) {
            checkedItems.add(item.id);
            tile.classList.add("checked");
            tile.classList.remove("available");
            checkbox.disabled = true;
        } else {
            checkedItems.delete(item.id);
            tile.classList.remove("checked");
        }

        checkForBingo();
    });

    bingoCard.appendChild(tile);
});

}

function showNextMessage() {
const remainingItems = gameItems.filter(
item => !appearedMessages.includes(item.id)
);

if (remainingItems.length === 0) {
    clearInterval(timerInterval);

    messageText.textContent = "All office events have appeared! 🌿";
    timerText.textContent = "DONE";
    timerProgress.style.transition = "none";
    timerProgress.style.width = "0%";

    document.querySelectorAll(".bingo-tile").forEach(tile => {
        tile.classList.remove("available");

        const checkbox = tile.querySelector(".tile-checkbox");

        if (checkbox) {
            checkbox.disabled = true;
        }
    });

    return;
}

const selected =
    remainingItems[Math.floor(Math.random() * remainingItems.length)];

activeItemId = selected.id;

appearedMessages.push(selected.id);

messageText.textContent = selected.message;

activateTile(selected.id);

addHistory(selected);

eventCounter.textContent =
    `${appearedMessages.length} / ${gameItems.length}`;

startTimer();

}

function activateTile(id) {
document.querySelectorAll(".bingo-tile").forEach(tile => {
tile.classList.remove("available");

    const checkbox = tile.querySelector(".tile-checkbox");

    if (checkbox && !checkbox.checked) {
        checkbox.disabled = true;
    }
});

const tile = document.querySelector(
    `.bingo-tile[data-id="${id}"]`
);

if (!tile) return;

const checkbox = tile.querySelector(".tile-checkbox");

if (!checkbox.checked) {
    tile.classList.remove("locked");
    tile.classList.add("available");
    checkbox.disabled = false;
}

}

function addHistory(item) {
const empty = historyList.querySelector(".empty-history");

if (empty) {
    empty.remove();
}

const historyItem = document.createElement("div");

historyItem.className = "history-item";

historyItem.innerHTML = `
    <button class="history-eye" type="button">👁</button>
    <div class="history-name">${item.title}</div>
`;

const eye = historyItem.querySelector(".history-eye");

eye.addEventListener("mouseenter", event => {
    showTooltip(item.message, event);
});

eye.addEventListener("mousemove", event => {
    moveTooltip(event);
});

eye.addEventListener("mouseleave", hideTooltip);

historyList.prepend(historyItem);

historyCount.textContent = appearedMessages.length;

}

function showTooltip(text, event) {
hideTooltip();

tooltip = document.createElement("div");

tooltip.className = "history-tooltip";
tooltip.textContent = text;

document.body.appendChild(tooltip);

positionTooltip(event);

}

function moveTooltip(event) {
if (!tooltip) return;

positionTooltip(event);

}

function positionTooltip(event) {
if (!tooltip) return;

const offset = 15;

let left = event.clientX + offset;
let top = event.clientY + offset;

const width = tooltip.offsetWidth;
const height = tooltip.offsetHeight;

if (left + width > window.innerWidth - 15) {
    left = event.clientX - width - offset;
}

if (top + height > window.innerHeight - 15) {
    top = event.clientY - height - offset;
}

tooltip.style.left = `${left}px`;
tooltip.style.top = `${top}px`;
tooltip.style.opacity = "1";
tooltip.style.transform = "translateY(0)";

}

function hideTooltip() {
if (tooltip) {
tooltip.remove();
tooltip = null;
}
}

function checkForBingo() {
const checked = cardItems.map((item, index) => {
if (index === 12) return true;

    return checkedItems.has(item.id);
});

const winningLines = [];

for (let row = 0; row < 5; row++) {
    const start = row * 5;

    winningLines.push([
        start,
        start + 1,
        start + 2,
        start + 3,
        start + 4
    ]);
}

for (let col = 0; col < 5; col++) {
    winningLines.push([
        col,
        col + 5,
        col + 10,
        col + 15,
        col + 20
    ]);
}

winningLines.push([
    0,
    6,
    12,
    18,
    24
]);

winningLines.push([
    4,
    8,
    12,
    16,
    20
]);

const hasBingo = winningLines.some(line =>
    line.every(index => checked[index])
);

if (hasBingo && !bingoShown) {
    bingoShown = true;

    clearInterval(timerInterval);

    bingoContainer.classList.add("show");
}

}

function startTimer() {
clearInterval(timerInterval);

timeRemaining = EVENT_DURATION;

updateTimerDisplay();

timerProgress.style.transition = "none";
timerProgress.style.width = "100%";

requestAnimationFrame(() => {
    timerProgress.style.transition =
        `width ${EVENT_DURATION}s linear`;

    timerProgress.style.width = "0%";
});

timerInterval = setInterval(() => {

    timeRemaining--;

    updateTimerDisplay();

    if (timeRemaining <= 0) {
        clearInterval(timerInterval);

        showNextMessage();
    }

}, 1000);

}

function updateTimerDisplay() {
timerText.textContent = Math.max(0, timeRemaining);
}

function startGame() {
const enteredName = playerNameInput.value.trim();

if (!enteredName) {
    playerNameInput.focus();
    playerNameInput.placeholder = "Please enter your name";
    return;
}

clearInterval(timerInterval);

playerName = enteredName;

playerNameDisplay.textContent = playerName;

playerModal.classList.add("hidden");

appearedMessages = [];
activeItemId = null;
checkedItems = new Set();
bingoShown = false;

historyList.innerHTML = `
    <div class="empty-history">
        <span>🍃</span>
        <p>No messages yet...</p>
    </div>
`;

historyCount.textContent = "0";

eventCounter.textContent =
    `0 / ${gameItems.length}`;

messageText.textContent = "Waiting for an event...";

timerText.textContent = EVENT_DURATION;

timerProgress.style.transition = "none";
timerProgress.style.width = "100%";

createCard();

setTimeout(() => {
    showNextMessage();
}, 500);

}

function showBingo() {
clearInterval(timerInterval);

winnerMessage.textContent =
    `Congratulations, ${playerName}! You survived the office jungle. 🌿`;

bingoModal.classList.remove("hidden");

}

function resetGame() {
clearInterval(timerInterval);

bingoModal.classList.add("hidden");

appearedMessages = [];
activeItemId = null;
checkedItems = new Set();
bingoShown = false;

historyList.innerHTML = `
    <div class="empty-history">
        <span>🍃</span>
        <p>No messages yet...</p>
    </div>
`;

historyCount.textContent = "0";

eventCounter.textContent =
    `0 / ${gameItems.length}`;

messageText.textContent = "Waiting for an event...";

timerText.textContent = EVENT_DURATION;

timerProgress.style.transition = "none";
timerProgress.style.width = "100%";

createCard();

setTimeout(() => {
    showNextMessage();
}, 500);

}

startGameBtn.addEventListener("click", startGame);

playerNameInput.addEventListener("keydown", event => {
if (event.key === "Enter") {
startGame();
}
});

bingoBtn.addEventListener("click", showBingo);

playAgainBtn.addEventListener("click", resetGame);

createCard();