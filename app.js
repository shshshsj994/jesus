const symbols = ["🍕", "🚀", "🐱", "🎮", "🌈", "⚽", "🍉", "⭐"];
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const timerEl = document.getElementById("timer");
const messageEl = document.getElementById("message");
const winModal = document.getElementById("winModal");
const finalStats = document.getElementById("finalStats");
let firstCard = null, secondCard = null, lockBoard = false;
let moves = 0, matchedPairs = 0, seconds = 0, timerInterval = null, started = false;
let installPrompt = null;

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function formatTime(value) {
  const min = String(Math.floor(value / 60)).padStart(2, "0");
  const sec = String(value % 60).padStart(2, "0");
  return `${min}:${sec}`;
}
function startTimer() {
  if (started) return;
  started = true;
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}
function updateStats() {
  movesEl.textContent = moves;
  pairsEl.textContent = `${matchedPairs} / ${symbols.length}`;
  timerEl.textContent = formatTime(seconds);
}
function createBoard() {
  board.innerHTML = "";
  const deck = shuffle([...symbols, ...symbols]);
  deck.forEach((symbol, index) => {
    const card = document.createElement("button");
    card.className = "card";
    card.type = "button";
    card.dataset.symbol = symbol;
    card.setAttribute("aria-label", `Carta ${index + 1}, oculta`);
    card.innerHTML = `<span class="card-inner"><span class="card-face card-back">?</span><span class="card-face card-front">${symbol}</span></span>`;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}
function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched") || card.classList.contains("flipped")) return;
  startTimer();
  card.classList.add("flipped");
  card.setAttribute("aria-label", `Carta ${card.dataset.symbol}`);
  if (!firstCard) {
    firstCard = card;
    return;
  }
  secondCard = card;
  moves++;
  updateStats();
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    messageEl.textContent = "¡Muy bien! Encontraste una pareja.";
    resetTurn();
    updateStats();
    if (matchedPairs === symbols.length) finishGame();
  } else {
    lockBoard = true;
    messageEl.textContent = "No coinciden. ¡Intenta de nuevo!";
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.setAttribute("aria-label", "Carta oculta");
      secondCard.setAttribute("aria-label", "Carta oculta");
      resetTurn();
    }, 850);
  }
}
function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
function finishGame() {
  clearInterval(timerInterval);
  finalStats.textContent = `Movimientos: ${moves} · Tiempo: ${formatTime(seconds)}`;
  messageEl.textContent = "¡Completaste el memorama!";
  setTimeout(() => winModal.classList.remove("hidden"), 350);
}
function restartGame() {
  clearInterval(timerInterval);
  firstCard = secondCard = null;
  lockBoard = false;
  moves = matchedPairs = seconds = 0;
  started = false;
  winModal.classList.add("hidden");
  messageEl.textContent = "¡Tú puedes! Encuentra las 8 parejas.";
  updateStats();
  createBoard();
}
document.getElementById("restartBtn").addEventListener("click", restartGame);
document.getElementById("playAgainBtn").addEventListener("click", restartGame);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .catch(error => console.error("No se pudo registrar el Service Worker:", error));
  });
}
window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPrompt = event;
  document.getElementById("installBtn").classList.remove("hidden");
});
document.getElementById("installBtn").addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  document.getElementById("installBtn").classList.add("hidden");
});
restartGame();
