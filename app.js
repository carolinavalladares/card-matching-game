const cardNames = [
  "chess",
  "controller",
  "cards",
  "die",
  "gb",
  "gba",
  "pacman",
  "puzzle",
  "wii",
  "chess",
  "controller",
  "cards",
  "die",
  "gb",
  "gba",
  "pacman",
  "puzzle",
  "wii",
];
const gameBoard = document.querySelector(".game");
const attemptsDisplay = document.querySelector(".attempts-num");
const gameOverscreen = document.querySelector(".game-over");
const score = document.querySelector(".game-over-score");
const restartBtn = document.querySelector(".restart-btn");
let matched = [];
let cards = [];
let selectedCards = [];
let attempts = 0;
let i;

// ============================================================================

game();

// ==========================================================================

// FUNCTIONS

function game() {
  createAndDisplayCards();
}

function createAndDisplayCards() {
  cardNamesSorted = cardNames.sort(() => Math.random() - 0.5);

  console.log(cardNamesSorted);

  for (i = 0; i < cardNames.length; i++) {
    cards[i] = document.createElement("div");
    cards[i].classList.add("card");
    cards[i].setAttribute("name", `${cardNamesSorted[i]}`);
    cards[
      i
    ].innerHTML = `<img src="./images/${cardNamesSorted[i]}.png" class="card-img"></img>
    <img src="./images/card back 2.png" class="card-back"></img>`;
    gameBoard.appendChild(cards[i]);
  }

  // adding event listeners to all cards
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      turnAndCompareCards(e);
    });
  });
}

function turnAndCompareCards(e) {
  selectedCards.push(e.currentTarget);

  selectedCards.forEach((card) => {
    card.children[1].style.display = "none";
  });

  if (selectedCards.length === 2) {
    if (
      selectedCards[0].getAttribute("name") ===
      selectedCards[1].getAttribute("name")
    ) {
      //  cards matched
      selectedCards.forEach((card) => {
        card.style.pointerEvents = "none";
        matched.push(card);
      });
      console.log(selectedCards);
      selectedCards = [];
    } else {
      // cards didn't match
      setTimeout(() => {
        selectedCards.forEach((card) => {
          card.children[1].style.display = "block";
        });
        selectedCards = [];
      }, 500);
    }

    attempts++;
    attemptsDisplay.innerText = attempts;

    checkGameOver();
  }
}

function checkGameOver() {
  if (matched.length === cardNames.length) {
    gameOver();
  }
}

function gameOver() {
  gameOverscreen.style.transform = "scale(1)";
  restartBtn.onclick = () => {
    resetGame();
  };
}

function resetGame() {
  cards.forEach((card) => {
    gameBoard.removeChild(card);
  });

  matched = [];
  cards = [];
  attempts = 0;
  gameOverscreen.style.transform = "scale(0)";

  createAndDisplayCards();
}
