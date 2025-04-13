let matches = [];

function startSetup() {
  document.getElementById('landing').style.display = 'none';
  document.getElementById('setup').style.display = 'block';
  addMatchForm();
}

function addMatchForm() {
  const container = document.createElement('div');
  container.className = 'match-form';
  const matchId = `match-${Date.now()}`;
  container.innerHTML = `
    <label>Match Title: <input type="text" name="title" /></label><br/>
    <label>Day: 
      <select name="day">
        <option value="1">Day 1</option>
        <option value="2">Day 2</option>
      </select>
    </label><br/>
    <label>Is Title Match? <input type="checkbox" name="isTitle" /></label><br/>
    <label>Champion Name (if title match): <input type="text" name="champion" /></label><br/>
    <div>
      <strong>Participants:</strong><br/>
      <input type="text" name="participant" placeholder="Enter participant 1" />
      <input type="text" name="participant" placeholder="Enter participant 2" />
      <input type="text" name="participant" placeholder="Enter participant 3 (optional)" />
      <input type="text" name="participant" placeholder="Enter participant 4 (optional)" />
    </div>
  `;
  document.getElementById('match-form-list').appendChild(container);
}

function submitMatches() {
  const matchForms = document.querySelectorAll('.match-form');
  matches = [];

  matchForms.forEach(form => {
    const inputs = form.querySelectorAll('input, select');
    const title = inputs[0].value;
    const day = parseInt(inputs[1].value);
    const isTitle = inputs[2].checked;
    const champion = inputs[3].value.trim();
    const participants = [
      inputs[4].value, inputs[5].value,
      inputs[6].value, inputs[7].value
    ].filter(p => p.trim() !== "");

    if (participants.length < 2) {
      alert("Each match needs at least 2 participants.");
      return;
    }

    matches.push({
      id: Date.now() + Math.random(),
      title,
      day,
      titleMatch: isTitle,
      champion: isTitle ? champion : null,
      participants
    });
  });

  document.getElementById('setup').style.display = 'none';
  renderMatchSummary();
}

function renderMatchSummary() {
  const summary = document.getElementById('summary');
  summary.innerHTML = "<h2>Saved Matches</h2>";

  matches.forEach(match => {
    summary.innerHTML += `
      <div class="match">
        <strong>${match.title}</strong> (Day ${match.day})<br/>
        ${match.titleMatch ? `🏆 Title Match (Champion: ${match.champion})<br/>` : ""}
        Participants: ${match.participants.join(", ")}
      </div>
    `;
  });

  summary.style.display = 'block';
}
