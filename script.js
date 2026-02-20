document.getElementById("auditForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let score = 0;
  let tips = [];

  const password = document.getElementById("password").value;
  const twoFA = document.getElementById("twoFA").checked;
  const updates = document.getElementById("updates").checked;
  const publicWifi = document.getElementById("publicWifi").checked;
  const passwordReuse = document.getElementById("passwordReuse").checked;

  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (strongRegex.test(password)) {
    score += 40;
  } else if (password.length >= 6) {
    score += 20;
    tips.push("Use uppercase, numbers, and special characters.");
  } else {
    score += 5;
    tips.push("Use a stronger password (min 8 chars).");
  }

  if (twoFA) score += 20;
  else tips.push("Enable Two-Factor Authentication.");

  if (updates) score += 20;
  else tips.push("Keep your software updated.");

  if (!publicWifi) score += 10;
  else tips.push("Avoid public WiFi or use a VPN.");

  if (!passwordReuse) score += 10;
  else tips.push("Do not reuse passwords.");

  displayResult(score, tips);
});

function displayResult(score, tips) {
  const resultDiv = document.getElementById("result");
  const progressBar = document.getElementById("progressBar");
  const scoreText = document.getElementById("scoreText");
  const feedback = document.getElementById("feedback");
  const lastScoreText = document.getElementById("lastScore");

  resultDiv.classList.remove("hidden");

  progressBar.style.width = score + "%";
  scoreText.textContent = score + "% Secure";

  if (score >= 80) {
    feedback.innerHTML = "🟢 Excellent Security Practices!";
  } else if (score >= 50) {
    feedback.innerHTML = "🟡 Moderate Risk – Improve your habits.";
  } else {
    feedback.innerHTML = "🔴 High Risk – Take action immediately.";
  }

  if (tips.length > 0) {
    feedback.innerHTML += "<br><br><strong>Recommendations:</strong><br>" + tips.join("<br>");
  }

  const prev = localStorage.getItem("lastScore");
  if (prev) {
    lastScoreText.textContent = "Previous Score: " + prev + "%";
  }

  localStorage.setItem("lastScore", score);
}
