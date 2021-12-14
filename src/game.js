window.onload = function () {
  let stage = document.getElementById("main-stage");
  let ctx = stage.getContext("2d");
  document.addEventListener("keydown", keyPush);

  setInterval(game, 90);

  const vel = 1;
  let velX = 0;
  let velY = 0;
  let posX = 10;
  let posY = 15;
  let square = 20;
  let amountSquare = 20;
  let apple = [15, 15];
  let trail = [{ x: posX, y: posY }];
  let tail = 5;

  function game() {
    posX += velX;
    posY += velY;

    posX = validatePosition(posX);
    posY = validatePosition(posY);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, stage.width, stage.height);

    ctx.fillStyle = "red";
    ctx.fillRect(apple[0] * square, apple[1] * square, square, square);

    ctx.fillStyle = "gray";
    for (let i = 0; i < trail.length; i++) {
      ctx.fillRect(
        trail[i].x * square,
        trail[i].y * square,
        square - 1,
        square - 1
      );
      if (trail[i].x == posX && trail[i].y == posY) {
        velX = 0;
        velY = 0;
        tail = 5;
      }
    }

    trail.push({ x: posX, y: posY });

    while (trail.length > tail) {
      trail.shift();
    }
    if (apple[0] == posX && apple[1] == posY) {
      tail++;
      apple[0] = Math.floor(Math.random() * amountSquare);
      apple[1] = Math.floor(Math.random() * amountSquare);
    }
  }

  function validatePosition(position) {
    if (position < 0) {
      return square - 1;
    }
    if (position > square - 1) {
      return 0;
    }
    return position;
  }

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // left
        velX = -vel;
        velY = 0;
        break;
      case 38: // up
        velX = 0;
        velY = -vel;
        break;
      case 39: // right
        velX = vel;
        velY = 0;
        break;
      case 40: // down
        velX = 0;
        velY = vel;
        break;

      default:
        break;
    }
  }
};
