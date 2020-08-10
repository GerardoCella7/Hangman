class Keyboard {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.case = { width: 40, height: 40, space: 10, font: 30 };
    this.lineCar = ['AZERTYUIOP', 'QSDFGHJKLM', 'WXCVBN'];
    this.chars = this.lineCar.join('').split('').sort().join('');
    this.mouse = { x: 0, y: 0, currentLetter: '' };
    this.init();
  }

  init() {
    const lst = {};
    const chars = this.chars.split('');
    for (let i = 0; i < chars.length; i++) {
      lst[chars[i]] = "";
    }
    this.lstChars = lst;
  }

  setMousePos(posX, posY) {
    this.mouse = { x: posX, y: posY };
  }

  numbersCharError() {
    let count = 0;

    this.chars.split('').forEach(e => {
      if (this.lstChars[e] === false) count++;
    });

    return count;
  }

  keyDown(key, value) {
    this.lstChars[key] = value;
  }

  pressed(key) {
    return this.lstChars[key];
  }

  fillColor(key) {
    let color = '#777777';
    if (this.lstChars[key] !== "") color = this.lstChars[key] ? '#007700' : '#770000';
    return color;
  }

  draw() {
    const ctx = this.ctx;

    const width = this.case.width * 10 + this.case.space * 11;
    const height = this.case.height * 3 + this.case.space * 4;
    const x = (this.canvas.width - width) / 2;
    const y = this.canvas.height - height - this.case.space;


    ctx.strokeStyle = '#000099';
    ctx.fillStyle = '#999999';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    ctx.font = `${this.case.font}px serif`;

    let cursorOnChar = false;
    for (let i = 0; i < this.lineCar.length; i++) {
      const char = this.lineCar[i].split('');
      for (let j = 0; j < char.length; j++) {
        const wx = (j * this.case.width + (j + 1) * this.case.space) + ((10 - char.length) / 2) * (this.case.width + this.case.space);
        const wy = i * this.case.height + (i + 1) * this.case.space;
        const cw = ctx.measureText(char[j]).width;

        ctx.fillStyle = this.fillColor(char[j]);

        // Verifie si la souris est sur la case et qu'elle n'est pas déja validée
        if (ctx.fillStyle === '#777777' &&
          this.mouse.x > x + wx && this.mouse.x < x + wx + this.case.width &&
          this.mouse.y > y + wy && this.mouse.y < y + wy + this.case.height) {
          ctx.fillStyle = '#770077';
          this.mouse.currentLetter = char[j];
          cursorOnChar = true;
        }

        ctx.fillRect(x + wx, y + wy, this.case.width, this.case.height);
        ctx.strokeRect(x + wx, y + wy, this.case.width, this.case.height);
        ctx.fillStyle = '#000000';
        ctx.fillText(char[j], x + wx + (this.case.width - cw) / 2, y + wy + this.case.height / 2 + this.case.space);
      }
    }

    if (cursorOnChar) {
      this.canvas.style.cursor = 'pointer';
    } else {
      this.canvas.style.cursor = 'default';
      this.mouse.currentLetter = '';
    }

    ctx.closePath();
  }
}