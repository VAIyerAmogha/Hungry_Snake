// game constants

let inputDir = { x: 0, y: 0 };
const EatSound = new Audio("eating.mp3");
const GameOverSound = new Audio("game_over.mp3");
const MoveSound = new Audio("move.mp3");
const Music = new Audio("music.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 13 }];
let food = { x: 4, y: 7 };
let a = 1;
let b = 17;
let intro = document.querySelector(".intro")
let GO = document.querySelector(".GameOver")

// Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
  }
  // console.log(ctime)
  gameEngine();
}

function isCollide(snake) {
  // bumping into snake
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
      return true;
    }
  }
  // bumping into wall
  if(snake[0].x>=18 || snake[0].x <=0 || snake[0].y>=18 || snake[0].y <=0){
    return true;
  }
}

function gameEngine() {
  // updating snake position
  if (isCollide(snakeArr)) {
    Music.pause();
    GameOverSound.play();

    // display the score
    GO.classList.remove("hide")
    GO.innerHTML=`<h1>!GAME OVER!</h1> <br> <b><p> your score is ${score}</p> <br> <p>Press any any to continue </p> <b> `;
    window.addEventListener("keydown",(e)=>{
      GO.classList.add("hide")
    })

    // reseting
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 10, y: 13 }];
    food = { x: 4, y: 7 }
    score = 0;
  }

  //   After eating food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    EatSound.play();
    score++;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //   moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    // const element = array[i];
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // displaying Snake
  grid.innerHTML = "";
  snakeArr.forEach((e, index) => {
    SnakeElement = document.createElement("div");
    SnakeElement.style.gridRowStart = e.y;
    SnakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      SnakeElement.classList.add("head");
    } else {
      SnakeElement.classList.add("SBody");
    }
    grid.appendChild(SnakeElement);
  });

  // displaying Food
  FoodElement = document.createElement("div");
  FoodElement.style.gridRowStart = food.y;
  FoodElement.style.gridColumnStart = food.x;
  FoodElement.classList.add("food");
  grid.appendChild(FoodElement);
}

// main logic
// alert("Welcome to Hungry Snake");
// alert("Use W,A,S,D to control the snake");
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  intro.classList.add("hide")
  inputDir = { x: 0, y: 0 };
  switch (e.key) {
    case "w":
      Music.play();
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      MoveSound.play();
      break;
    case "s":
      Music.play();
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      MoveSound.play();
      break;
    case "d":
      Music.play();
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      MoveSound.play();
      break;
    case "a":
      Music.play();
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      MoveSound.play();
      break;

    default:
      break;
  }
});
