const matches = [
  {
    id: 1,
    day: 1,
    titleMatch: true,
    champion: "Roman Reigns",
    wrestlerA: "Roman Reigns",
    wrestlerB: "Cody Rhodes",
  },
  {
    id: 2,
    day: 2,
    titleMatch: false,
    champion: null,
    wrestlerA: "Dominik Mysterio",
    wrestlerB: "Finn Bálor",
  }
];

// User picks
const picks = {
  Scott: {
    1: { winner: "Cody Rhodes" },
    2: { winner: "Finn Bálor" },
    outsideGuess: { 1: 2, 2: 1 }
  },
  GF: {
    1: { winner: "Roman Reigns" },
    2: { winner: "Dominik Mysterio" },
    outsideGuess: { 1: 1, 2: 2 }
  }
};

// Actual results
const results = {
  1: {
    winner: "Cody Rhodes",
    interference: false
  },
  2: {
    winner: "Finn Bálor",
    interference: true
  }
};

// Scoring logic
function calculateScore(name) {
  const user = picks[name];
  let score = 0;

  matches.forEach((match) => {
    const pick = user[match.id];
    const result = results[match.id];

    if (pick && pick.winner === result.winner) {
      score += 1;
      if (match.titleMatch && match.champion !== result.winner) {
        score += 1;
      }
    }

    if (user.outsideGuess[match.day] === match.id && result.interference) {
      score += 1;
    }
  });

  return score;
}

function renderScores() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="match">Scott's Score: ${calculateScore("Scott")}</div>
    <div class="match">GF's Score: ${calculateScore("GF")}</div>
  `;
}

renderScores();
