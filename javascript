// Obtenir une référence au canvas et au contexte de dessin
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

// Ajoutez un écouteur d'événements pour redimensionner le canvas lorsque la fenêtre est redimensionnée
window.addEventListener("resize", resizeCanvas);
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
  // Musique et sons
const collisionSound = new Audio('collision.mp3');
const powerUpSound = new Audio('powerup.mp3');
const backgroundMusic = new Audio('gamesong.mp3');
backgroundMusic.loop = true;

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
  
  
  let powerUps = [];
  let obstacles = [];
  function drawScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 10, 50);
  }
  
  function drawRover() {
    // ... (code pour dessiner le rover)
  }
  
  function drawScore() {
    // ... (code pour dessiner le score)
  }
  
  function update() {
    // ... (code pour mettre à jour le jeu)
  }
  
  function endGame() {
    // ... (code pour terminer le jeu)
  }
  
  function generateObstacles() {
    // ... (code pour générer des obstacles)
  }
  
  function generatePowerUps() {
    // ... (code pour générer des power-ups)
  }
  