(() => {
  const keyboard = new Keyboard('game');
  const word = new Word('game');
  const hangman = new Hangman('game');
  const mouse = { x: 0, y: 0 };


  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
      this.sound.currentTime = 0;
      this.sound.play();
    }
    this.stop = function () {
      this.sound.pause();
    }
  }
  const music = {
    ok: new sound("./sound/typewriter.mp3"),
    error: new sound("./sound/typewriter-error.mp3"),
    gameover: new sound("./sound/game-over.mp3"),
    find: new sound("./sound/find.mp3")
  }

  const game = document.getElementById('game');
  game.width = 800;
  game.height = 600;
  const ctx = game.getContext("2d");

  let gameover = false;
  let discover = 0;

  // INTERCEPTION DES TOUCHES
  const keyDown = (k) => {
    const key = k.key.toUpperCase();
    if (k.keyCode >= 65 && k.keyCode <= 90) {
      verifKey(key);
    }
    if (k.keyCode === 27) console.log(word.word);
  }
  document.onkeydown = keyDown;

  const verifKey = (key) => {
    if (keyboard.pressed(key) === "" && word.find) {
      const findletter = word.findLetter(key);
      keyboard.keyDown(key, findletter);
      findletter ? music.ok.play() : music.error.play();
      update();
    }
  }
  const update = async () => {
    if (word.error > 6) {
      if (gameover === false) {
        music.gameover.play();
        gameover = true;
      }
      return;
    }

    if (word.completed) {
      discover++;
      music.find.play();
      await word.findWord();
      keyboard.init();
    }
  }
  // DEMMARAGE DU JEU
  const init = async () => {
    gameover = false;
    keyboard.init();
    discover = 0;
    await word.findWord();
  }

  // AFFICHAGE DU JEU
  const draw = () => {
    ctx.clearRect(0, 0, game.width, game.height);
    if (!gameover) {
      word.draw();
      keyboard.draw();
      hangman.draw(word.error, discover);
    } else {

      ctx.font = '60px serif';
      ctx.strokeStyle = '#333333';
      ctx.fillStyle = '#330033';
      const msg = 'GAME OVER';
      ctx.fillText(msg, (game.width - ctx.measureText(msg).width) / 2, 100);
      ctx.strokeText(msg, (game.width - ctx.measureText(msg).width) / 2, 100);


      ctx.font = '30px serif';
      const restart = 'Rejouer une partie';
      const width = ctx.measureText(restart).width

      ctx.fillStyle = '#cc00cc';
      const posX = (game.width - width) / 2 - 25;
      if (mouse.x > posX && mouse.x < posX + width + 50 && mouse.y > 350 && mouse.y < 390) {
        ctx.fillStyle = '#cccc00';
        game.style.cursor = 'pointer';
      } else {
        game.style.cursor = 'default';
      }

      ctx.fillRect(posX, 350, width + 50, 40);
      ctx.strokeRect(posX, 350, width + 50, 40);
      ctx.strokeText(restart, posX + 25, 380);

    }
  }
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - game.offsetLeft;
    mouse.y = e.clientY - game.offsetTop;
    if (!gameover) {
      keyboard.setMousePos(mouse.x, mouse.y);
    }
  }, false);

  game.addEventListener('click', () => {
    if (!gameover && keyboard.mouse.currentLetter !== '') {
      verifKey(keyboard.mouse.currentLetter);
    } else if (gameover) {
      if (game.style.cursor === 'pointer') {
        init();
      }
    }
  }, false);

  setInterval(draw, 1000 / 25);
  init();
})();