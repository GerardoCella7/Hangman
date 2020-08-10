class Word {
  constructor(canvas) {
    this.canvas = document.getElementById(canvas);
    this.ctx = this.canvas.getContext("2d");
    this.word = null;
    this.find = false;
    this.search = '';
    this.y = 100;
    this.letterWidth = 30;
    this.errors = 0;
  }
  async findWord() {
    this.find = false;
    try {
      await fetch('http://becode.gerardo-cella.net/api/hangman')
        .then(res => res.json())
        .then(d => { this.init(d); });
    } catch (e) {
      console.error(e);
      return;
    }
  }

  init(o) {
    this.word = o.word;
    this.search = '';
    for (let i = 0; i < this.word.length; i++) {
      this.search += '_';
    }
    this.errors = 0;
    this.find = true;
    // console.log(this.word);
  }

  findLetter(letter) {
    let find = false;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i] === letter) {
        const search = this.search.split('');
        search[i] = letter;
        this.search = search.join('');
        find = true;
      }
    }
    if (!find) this.errors++;
    return find;
  }

  draw() {
    if (!this.find) {
      return;
    }
    let view = this.search;

    this.ctx.font = '30px serif';
    this.ctx.fillStyle = '#000000';

    const instruction = 'Veuillez choisir une lettre.';
    const x = (this.canvas.width - this.ctx.measureText(instruction).width) / 2;
    this.ctx.fillText(instruction, x, this.y - 50);

    const v = view.split('');
    const offsetX = (this.canvas.width - this.letterWidth * v.length) / 2;
    for (let i = 0; i < v.length; i++) {
      this.ctx.fillText(v[i], offsetX + i * this.letterWidth + ((this.letterWidth - this.ctx.measureText(v[i]).width) / 2), this.y);
    }
  }

  get error() {
    return this.errors;
  }

  get completed() {
    return this.search.indexOf('_') < 0;
  }
}