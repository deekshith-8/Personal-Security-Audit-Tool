document.getElementById("auditForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let score = 0;
  const password = document.getElementById("password").value;
  const twoFA = document.getElementById("twoFA").checked;
  const updates = document.getElementById("updates").checked;
  const publicWifi = document.getElementById("publicWifi").checked;
  const passwordReuse = document.getElementById("passwordReuse").checked;

  // Password Strength Check
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (strongRegex.test(password)) {
    score += 40;
  } else if (password.length >= 6) {
    score += 20;
  } else {
    score += 5;
  }

  if (twoFA) score += 20;
  if (updates) score += 20;
  if (!publicWifi) score += 10;
  if (!passwordReuse) score += 10;

  displayResult(score);
});

function displayResult(score) {
  const resultDiv = document.getElementById("result");
  const scoreCircle = document.getElementById("scoreCircle");
  const feedback = document.getElementById("feedback");
  const lastScoreText = document.getElementById("lastScore");

  resultDiv.classList.remove("hidden");

  scoreCircle.textContent = score + "%";

  if (score >= 80) {
    scoreCircle.style.background = "#22c55e";
    feedback.textContent = "Excellent! Your digital security practices are strong.";
  } else if (score >= 50) {
    scoreCircle.style.background = "#facc15";
    feedback.textContent = "Moderate security. Consider improving password habits and enabling 2FA.";
  } else {
    scoreCircle.style.background = "#ef4444";
    feedback.textContent = "High risk! Strengthen your security habits immediately.";
  }

  // Save previous score
  const prev = localStorage.getItem("lastScore");
  if (prev) {
    lastScoreText.textContent = "Previous Score: " + prev + "%";
  }

  localStorage.setItem("lastScore", score);
}
