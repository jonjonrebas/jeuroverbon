
// Obtenir une référence au canvas et au contexte de dessin
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
function startAnimation() {
    const kidnapper = document.getElementById("kidnapper");
    const victim = document.getElementById("victim");
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");
  
    kidnapper.style.left = "300px"; // Ajustez selon vos besoins
    victim.style.left = "400px"; // Ajustez selon vos besoins
  
    let yKidnapper = -50;
    let yVictim = -50;
    let animationStep = 0;
  
    function animate() {
      if (animationStep < 100) {
        yKidnapper += 2;
        yVictim += 1;
        kidnapper.style.top = yKidnapper + "px";
        victim.style.top = yVictim + "px";
        text1.style.top = (yKidnapper + 60) + "px";
        text1.style.left = "300px";
        text1.style.display = "block";
      } else if (animationStep < 200) {
        yKidnapper -= 2;
        yVictim -= 1;
        kidnapper.style.top = yKidnapper + "px";
        victim.style.top = yVictim + "px";
        text1.style.display = "none";
        text2.style.top = (yVictim + 60) + "px";
        text2.style.left = "400px";
        text2.style.display = "block";
      } else {
        // Animation terminée, vous pouvez démarrer le jeu ici
        text2.style.display = "none";
        return;
      }
  
      animationStep++;
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  
  window.onload = function() {
    startAnimation(); // Appeler cette fonction pour démarrer l'animation
  };
  

window.onload = function() {
    startAnimation(); // Appeler cette fonction pour démarrer l'animation
};
window.onload = function() {
    startAnimation(); // Appeler cette fonction pour démarrer l'animation
};

// Variables pour contrôler les touches
let touchStartX = null;
let touchStartY = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Ajustez ici les autres paramètres du jeu si nécessaire, comme la position du rover
  }
  
  // Appelez la fonction au démarrage
  resizeCanvas();

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        obstacleSpeed = 1; // Réduisez la vitesse pour les appareils mobiles
        // Autres ajustements spécifiques au mobile
      }
      canvas.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchmove", function (event) {
  let touchCurrentX = event.touches[0].clientX;
  let touchDiffX = touchCurrentX - touchStartX;

  // Ajuster la sensibilité en fonction de l'appareil
  let sensitivity = isMobile ? 0.5 : 1;

  if (touchDiffX < 0 && roverX - roverSpeed * sensitivity > 0) {
    roverX -= roverSpeed * sensitivity;
  }
  if (touchDiffX > 0 && roverX + roverSpeed * sensitivity + roverWidth < canvasWidth) {
    roverX += roverSpeed * sensitivity;
  }

  touchStartX = touchCurrentX;
});

canvas.addEventListener("touchend", function () {
  touchStartX = null;
  touchStartY = null;
});

  // Ajoutez un écouteur d'événements pour redimensionner le canvas lorsque la fenêtre est redimensionnée
  window.addEventListener("resize", resizeCanvas);
  

// Écouteur d'événement pour le début du toucher
canvas.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

// Écouteur d'événement pour le mouvement du toucher
canvas.addEventListener("touchmove", function (event) {
  let touchCurrentX = event.touches[0].clientX;
  let touchCurrentY = event.touches[0].clientY;
  // Logique pour déplacer le rover en fonction du mouvement du toucher
});

// Écouteur d'événement pour la fin du toucher
canvas.addEventListener("touchend", function () {
  touchStartX = null;
  touchStartY = null;
});

canvas.addEventListener("touchstart", function (event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
});

canvas.addEventListener("touchmove", function (event) {
  let touchCurrentX = event.touches[0].clientX;
  // Calculer la différence entre la position actuelle et la position de départ
  let touchDiffX = touchCurrentX - touchStartX;

  // Déplacer le rover en fonction de la différence
  if (touchDiffX < 0 && roverX - roverSpeed > 0) {
    roverX -= roverSpeed;
  }
  if (touchDiffX > 0 && roverX + roverSpeed + roverWidth < canvasWidth) {
    roverX += roverSpeed;
  }

  // Mettre à jour la position de départ pour le prochain mouvement
  touchStartX = touchCurrentX;
});

canvas.addEventListener("touchend", function () {
  touchStartX = null;
  touchStartY = null;
});

// Musique et sons
const collisionSound = new Audio('collision.mp3');
const powerUpSound = new Audio('powerup.mp3');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let roverWidth = 40;
let roverHeight = 40;
let roverX = canvasWidth / 2;
let roverY = canvasHeight - roverHeight - 10;
const baseRoverSpeed = 5;
let roverSpeed = baseRoverSpeed;
let gameRunning = true;
let gameOver = false;
let gamePaused = false; // Ajouté pour gérer la pause
let score = 0;
let obstacleSpeed = 2;
let invincibility = false;

const keys = {
  left: false,
  right: false
};
function applyPowerUp(type) {
    switch (type) {
      case "speed":
        roverSpeed *= 2;
        setTimeout(() => {
          roverSpeed = baseRoverSpeed;
        }, 5000);
        break;
      case "invincibility":
        invincibility = true;
        setTimeout(() => {
          invincibility = false;
        }, 5000);
        break;
    }
  }
  
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") keys.left = true;
  if (event.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", function (event) {
  if (event.key === "ArrowLeft") keys.left = false;
  if (event.key === "ArrowRight") keys.right = false;
});

function drawRover() {
  ctx.fillStyle = "green";
  ctx.fillRect(roverX, roverY, roverWidth, roverHeight);
}
class PowerUp {
    constructor(x, y, width, height, speed, type) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.type = type;
    }
  
    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;
  
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
  
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  
    draw() {
      this.drawStar(this.x + this.width / 2, this.y + this.height / 2, 5, this.width / 2, this.width / 4);
    }
  
    update() {
      this.y += this.speed;
    }
  
    checkCollision(roverX, roverY, roverWidth, roverHeight) {
      return (
        this.x < roverX + roverWidth &&
        this.x + this.width > roverX &&
        this.y < roverY + roverHeight &&
        this.y + this.height > roverY
      );
    }
  }
  
  let powerUps = [];
  
  class Obstacle {
    constructor(x, y, width, height, speed, color, type) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = speed;
      this.color = color;
      this.type = type || 'rect';
    }
  
    draw() {
      ctx.fillStyle = this.color;
      switch (this.type) {
        case 'rect':
          ctx.fillRect(this.x, this.y, this.width, this.height);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);
          ctx.fill();
          break;
      }
    }
  
    update() {
      this.y += this.speed;
    }
  
    checkCollision(roverX, roverY, roverWidth, roverHeight) {
      return (
        this.x < roverX + roverWidth &&
        this.x + this.width > roverX &&
        this.y < roverY + roverHeight &&
        this.y + this.height > roverY
      );
    }
  }
  
  let obstacles = [];
  function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 50);
  }
  
  function update() {
    if (gameOver || gamePaused) return;
  
    if (keys.left && roverX - roverSpeed > 0) {
      roverX -= roverSpeed;
    }
    if (keys.right && roverX + roverSpeed + roverWidth < canvasWidth) {
      roverX += roverSpeed;
    }
  
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    drawRover();
  
    obstacles.forEach((obstacle, index) => {
      obstacle.update();
      obstacle.draw();
      if (obstacle.checkCollision(roverX, roverY, roverWidth, roverHeight) && !invincibility) {
        collisionSound.play();
        endGame();
      }
    });
  
    powerUps.forEach((powerUp, index) => {
      powerUp.update();
      powerUp.draw();
      if (powerUp.checkCollision(roverX, roverY, roverWidth, roverHeight)) {
        powerUpSound.play();
        applyPowerUp(powerUp.type);
        powerUps.splice(index, 1);
      }
    });
  
    drawScore();
  
    if (!gameOver) requestAnimationFrame(update);
  }
  
  function endGame() {
    gameOver = true;
    ctx.font = "50px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", canvasWidth / 2 - 150, canvasHeight / 2);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Press 'R' to restart", canvasWidth / 2 - 120, canvasHeight / 2 + 40);
  }
  
  function generateObstacles() {
    if (gameOver || gamePaused) return;
    let obstacleX = Math.random() * (canvasWidth - 50);
    let obstacleWidth = 50;
    let obstacleHeight = 50;
    let obstacleType = Math.random() < 0.5 ? 'rect' : 'circle';
    let obstacleColor = obstacleType === 'rect' ? 'red' : 'blue';
    let obstacle = new Obstacle(obstacleX, 0, obstacleWidth, obstacleHeight, obstacleSpeed, obstacleColor, obstacleType);
    obstacles.push(obstacle);
    score++;
  
    if (score % 10 === 0) {
      obstacleSpeed += 1;
    }
  
    setTimeout(generateObstacles, 300);
  }
  function generatePowerUps() {
    if (!gameRunning || gamePaused) return;
    let powerUpX = Math.random() * (canvasWidth - 50);
    let powerUpType = Math.random() < 0.5 ? "speed" : "invincibility";
    let powerUp = new PowerUp(powerUpX, 0, 50, 50, 2, powerUpType);
    powerUps.push(powerUp);
  
    setTimeout(generatePowerUps, 10000);
  }
  
  window.addEventListener("keydown", function (event) {
    if (event.key === "r" || event.key === "R") {
      restartGame();
    }
  
    if (event.key === "p" || event.key === "P") {
      togglePause();
    }
  });
  
  function restartGame() {
    if (!gameOver) return;
  
    gameOver = false;
    gamePaused = false;
    roverX = canvasWidth / 2;
    roverY = canvasHeight - roverHeight - 10;
    obstacles = [];
    score = 0;
    obstacleSpeed = 2;
    invincibility = false;
    roverSpeed = baseRoverSpeed;
    powerUps = [];
  
    update();
    generateObstacles();
    generatePowerUps();
  }
  
  function togglePause() {
    gamePaused = !gamePaused;
  }
  
  // Bouton de pause
  const pauseButton = document.getElementById('pauseButton');
  pauseButton.addEventListener('click', togglePause);
  
  // Tableau des scores
  const scoreTable = document.getElementById('scoreTable');

// generate a table row for a score
function generateScoreRow(score) {
    const row = document.createElement('tr');
    const scoreCell = document.createElement('td');
    const dateCell = document.createElement('td');
    scoreCell.textContent = score.score;
    dateCell.textContent = score.date;
    row.appendChild(scoreCell);
    row.appendChild(dateCell);
    return row;
  }
  
  
  function updateScoreTable() {
    // Mettre à jour le tableau des scores ici
    // Par exemple, ajouter le score actuel à la liste des scores
  }
  
  update();
  generateObstacles();
  generatePowerUps();
  
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackInput = document.getElementById('feedbackInput');
  const feedbackList = document.getElementById('feedbackList');
  
  feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const feedbackText = feedbackInput.value;
    if (feedbackText.trim() !== '') {
      const feedbackItem = document.createElement('div');
      feedbackItem.textContent = feedbackText;
      feedbackList.appendChild(feedbackItem);
      feedbackInput.value = '';
    }
  });
  

