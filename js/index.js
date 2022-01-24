window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let isGameOn = false;

  const car = new Image();
  car.src = "../images/car.png";
  // car.onload = () => {
  //   // ctx.drawImage(car, canvas.width / 2, canvas.height - 100, 50, 90);
  // };

  class Player {
    constructor() {
      this.x = canvas.width / 2;
      this.y = canvas.height - 100;
      this.w = 50;
      this.h = 90;
      this.image = car;
    }

    move(direction) {
      switch (direction) {
        case "ArrowLeft":
          this.x -= 15;
          break;
        case "ArrowRight":
          this.x += 15;
          break;
      }
    }
  }
  //create a class with a move function. Every time it is called, it will make the obstacles move
  class Obstacle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.w = 100;
      this.h = 25;
    }

    move() {
      this.y = this.y + 3;
    }
  }

  const driver = new Player();

  const ob1 = new Obstacle();

  const obstacleArr = [];

  obstacleArr.push(ob1);

  //Movements
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("ArrowLeft");
        break;
      case "ArrowRight":
        driver.move("ArrowRight");
        break;
    }
  });

  function createObj() {
    obstacleArr.push(new Obstacle());
  }

  let score;

  //every 2000 milliseconds, this will call the function and push a new obstacle into the obstacle array.
  function startGame() {
    score = 0;
    if (!isGameOn) {
      isGameOn = true;
      setInterval(createObj, 2000);
      animate();
    } else {
      console.log("Game is already running");
    }
  }

  let game;
  let gameWillEnd = false;

  //animating the obstacle.
  //x and y start at the top left corner
  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(driver.image, driver.x, driver.y, driver.w, driver.h);
    ctx.fillStyle = "white";
    ctx.font = "20px, Arial";
    score++;
    ctx.fillText(`Score: ${score}`, 10, 10);

    for (let i = 0; i < obstacleArr.length; i++) {
      ctx.fillStyle = "red";
      obstacleArr[i].move();
      ctx.fillRect(
        obstacleArr[i].x,
        obstacleArr[i].y,
        obstacleArr[i].w,
        obstacleArr[i].h
      );

      //Call the collision function, and compare it to every object
      didCollide = detectCollision(driver, obstacleArr[i]);
      if (didCollide) {
        // gameWillEnd = true;
        // console.log("COLLISION");
        break;
        // itemArr.splice(i, 1);
      }
    }

    // if (counter >= 100) {
    //   obstacleArr.push(new Obstacle());
    //   counter = 0;
    // } else {
    //   counter++;
    // }
    if (didCollide) {
      console.log("COLLISION");
      gameOver();
    }
  }

  function gameOver() {
    window.cancelAnimationFrame(game);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 500, 700);

    ctx.font = "60px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER!", 60, 310);
  }
  //if any part of the player intersect with the object, it will return true. If it is true, it will call collision
  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
};
