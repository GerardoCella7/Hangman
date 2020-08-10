class Hangman {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.width = 500;
    this.height = 300;
    this.y = 115;
    this.x = 150;
  }

  draw(error, discover) {
    const ctx = this.ctx;

    ctx.strokeStyle = '#cccccc';
    ctx.fillStyle = '#003300';
    ctx.lineWidth = 4;

    // tableau du pendu
    ctx.beginPath();
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.closePath();

    // pendu
    this.wood();
    this.rope();
    this.man(error);
    this.overlay(error, discover);
  }

  overlay(error, discover) {
    const ctx = this.ctx;
    ctx.fillStyle = '#cccccc';
    ctx.fillText('Essai restant', this.x + 310, this.y + 100);
    ctx.fillText(6 - error, this.x + 370, this.y + 140);
    ctx.fillText('Mot trouvé', this.x + 310, this.y + 200);
    ctx.fillText(discover, this.x + 370, this.y + 240);

  }

  man(error) {
    const ctx = this.ctx;

    ctx.strokeStyle = '#e0b963';
    ctx.fillStyle = '#9e7d34';
    ctx.lineWidth = 2;

    // Tete
    if (error >= 1) {
      ctx.beginPath();
      ctx.arc(this.x + 227, this.y + 95, 20, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillRect(this.x + 220, this.y + 115, 14, 5);
      ctx.strokeRect(this.x + 220, this.y + 115, 14, 5);
    }

    // Torse
    if (error >= 2) {
      ctx.beginPath();
      ctx.moveTo(this.x + 210, this.y + 120);
      ctx.lineTo(this.x + 244, this.y + 120);
      ctx.quadraticCurveTo(this.x + 250, this.y + 130, this.x + 240, this.y + 160);
      ctx.lineTo(this.x + 214, this.y + 160);
      ctx.quadraticCurveTo(this.x + 204, this.y + 130, this.x + 210, this.y + 120);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Bras gauche
    if (error >= 3) {
      ctx.beginPath();
      ctx.moveTo(this.x + 210, this.y + 120);
      ctx.lineTo(this.x + 200, this.y + 120);
      ctx.quadraticCurveTo(this.x + 185, this.y + 140, this.x + 195, this.y + 180);
      ctx.lineTo(this.x + 200, this.y + 180);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Bras droit
    if (error >= 4) {
      ctx.beginPath();
      ctx.moveTo(this.x + 244, this.y + 120);
      ctx.lineTo(this.x + 254, this.y + 120);
      ctx.quadraticCurveTo(this.x + 269, this.y + 140, this.x + 259, this.y + 180);
      ctx.lineTo(this.x + 254, this.y + 180);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Jambe gauche
    if (error >= 5) {
      ctx.beginPath();
      ctx.moveTo(this.x + 214, this.y + 160);
      ctx.quadraticCurveTo(this.x + 190, this.y + 200, this.x + 200, this.y + 230);
      ctx.lineTo(this.x + 210, this.y + 230);
      ctx.quadraticCurveTo(this.x + 230, this.y + 200, this.x + 227, this.y + 160);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    // Jambe droite
    if (error >= 6) {
      ctx.beginPath();
      ctx.moveTo(this.x + 240, this.y + 160);
      ctx.quadraticCurveTo(this.x + 264, this.y + 200, this.x + 254, this.y + 230);
      ctx.lineTo(this.x + 244, this.y + 230);
      ctx.quadraticCurveTo(this.x + 226, this.y + 200, this.x + 227, this.y + 160);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

  }

  wood() {
    const ctx = this.ctx;

    ctx.strokeStyle = '#966135';
    ctx.fillStyle = '#5e2e06';
    ctx.lineWidth = 1;
    // Barre du bas
    ctx.fillRect(this.x + 25, this.y + this.height - 50, 220, 25);
    ctx.strokeRect(this.x + 25, this.y + this.height - 50, 220, 25);
    // Barre du bas pied gauche
    ctx.fillRect(this.x + 50, this.y + this.height - 30, 40, 25);
    ctx.strokeRect(this.x + 50, this.y + this.height - 30, 40, 25);
    // Barre du bas pied droite
    ctx.fillRect(this.x + 180, this.y + this.height - 30, 40, 25);
    ctx.strokeRect(this.x + 180, this.y + this.height - 30, 40, 25);
    // Mat
    ctx.fillRect(this.x + 60, this.y + 30, 20, 230);
    ctx.strokeRect(this.x + 60, this.y + 30, 20, 230);
    // Barre du haut
    ctx.fillRect(this.x + 25, this.y + 40, 220, 20);
    ctx.strokeRect(this.x + 25, this.y + 40, 220, 20);
    // Barre digonale
    ctx.beginPath();
    ctx.moveTo(this.x + 75, this.y + 100);
    ctx.lineTo(this.x + 125, this.y + 55);
    ctx.lineTo(this.x + 150, this.y + 55);
    ctx.lineTo(this.x + 75, this.y + 125);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  rope() {
    const ctx = this.ctx;

    ctx.strokeStyle = '#825f12';
    ctx.fillStyle = '#c78c0c';
    ctx.lineWidth = 1;
    ctx.fillRect(this.x + 225, this.y + 50, 5, 20);
    ctx.strokeRect(this.x + 225, this.y + 50, 5, 20);
    ctx.fillRect(this.x + 220, this.y + 70, 15, 5);
    ctx.strokeRect(this.x + 220, this.y + 70, 15, 5);
    ctx.fillRect(this.x + 220, this.y + 75, 15, 5);
    ctx.strokeRect(this.x + 220, this.y + 75, 15, 5);
    ctx.fillRect(this.x + 220, this.y + 80, 15, 5);
    ctx.strokeRect(this.x + 220, this.y + 80, 15, 5);

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(this.x + 227, this.y + 100, 16, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
  }
}