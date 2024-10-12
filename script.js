const livesEl = document.querySelector('.lives');
const v1 = document.getElementById('v1');
const v2 = document.getElementById('v2');
const v3 = document.getElementById('v3');
const startingScreenEl = document.getElementById('starting-screen')
const containerEl = document.querySelector('.container');
const $score = document.getElementById('score');
const $maxScore = document.getElementById('max-score');
const $time = document.getElementById('time');
const $startGameBtn = document.getElementById('start-game');
const $nextBtn = document.getElementById('next-level');
const displayInfo = document.getElementById('info');
const displayResult = document.getElementById('results');
const infoBtns = document.getElementById('info-buttons');
const infoControls = document.getElementById('info-controls');
const controlsMenu = document.getElementById('controls');
const infoPowers = document.getElementById('info-powers');
const powersMenu = document.getElementById('powers');
const infoMusicVolume = document.getElementById('info-music-volume');
const reduceVolumeBtn = document.getElementById('reduce-volume');
const incrementVolumeBtn = document.getElementById('increment-volume');
const volumeSquares = Array.from(document.getElementsByClassName('volume-square'));
const musicVolumeMenu = document.getElementById('music-volume');
const returnMenu = document.getElementById('return-menu');
const exitGame = document.getElementById('exit-game');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 720;

const regularColors = ['red', 'brown', 'orangered'];
const specialColors = ['blue', 'yellow', 'green', 'purple'];
let setAbility;
let abilityTime;
let speed = 0;
let increaseSpeed = 0;
let numLives = 3;
let score = 0;
let maxScore = localStorage.getItem('max-score') || 0;
let bricks = [];
let time = 150;
let level = 1;
let currentMusic;
let volumeLevel = 0.3;
let timeInterval;
let isAlive = true;
let completed = false;
let gamePaused = false;
let soundOn = true;
let musicOn = true; //This variable is to pause the music.
let pausedSpeedX = 0;
let pausedSpeedY = 0;
let lastKey;
const keys = {
  arrowRight: {
    isPressed: false
  },
  arrowLeft: {
    isPressed: false
  }    
}
const powerProperty = {
  radius: 25,
  speed: 3,
  color: {
    blue: 'rgba(0,0,255,0.3)',
    green: 'rgba(0,255,0,0.3)',
    purple: 'rgba(118, 2, 181,0.3)',
    yellow: 'rgba(255,255,0,0.3)'
  }  
}


let paddle = new Paddle(canvas.width/2 - 100, canvas.height - 35);
let ball = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, speed);

let powers = [];
let bullets = [];
let ballExtra = '';

const widthOriginal = paddle.width;
const colorOriginal = paddle.color;

getLevel();
getVolumeSquares();

function startGame() {

  speed = 0;
  increaseSpeed = 0;
  numLives = 3;  
  v3.style.opacity = 1;
  v2.style.opacity = 1;
  v1.style.opacity = 1;
  score = 0;
  $score.innerText = score;
  maxScore = localStorage.getItem('max-score') || 0;
  bricks = [];
  time = 150;
  $time.innerText = time;
  level = 1;
  volumeLevel = 0.3;
  isAlive = true;
  completed = false;
  soundOn = true;
  musicOn = true; 
  pausedSpeedX = 0;
  pausedSpeedY = 0;
  paddle = new Paddle(canvas.width/2 - 100, canvas.height - 35);
  ball = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, speed);
  powers = [];
  bullets = [];
  ballExtra = '';

  getLevel();
  getVolumeSquares();

  startingScreenEl.style.display = 'none';

  resumeGame();

  $maxScore.innerText = maxScore;
}


function getNextLevel() {
  
  document.getElementById('results').style.display = 'none';
  $nextBtn.disabled = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  bricks = [];
  speed = 0;
  if(level === 1 && increaseSpeed === 0) {
    score = 0;    
    $score.innerText = score;
    numLives = 3;
    v3.style.opacity = 1;
    v2.style.opacity = 1;
    v1.style.opacity = 1;
  }
  time = 150;
  $time.innerText = time;  
  isAlive = true;
  completed = false;
  bullets = [];
  powers = [];
  ballExtra = '';

  paddle = new Paddle(canvas.width/2 - 100, canvas.height - 35);
  ball = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, speed)

  getLevel();

  // Timer

  timeInterval = setInterval(() => {
    time--
    $time.innerText = time;  
    if(time < 10 && time > 0) $time.style.color = 'red';
    else $time.style.color = 'black';
  }, 1000)

  animate();
}


function checkColor(brick) {

  switch (brick.color) {
    case 'blue':
      let bluePower = new Ball(brick.x + brick.width/2, brick.y + brick.height, powerProperty.radius, 0);
      bluePower.color = powerProperty.color.blue;
      bluePower.speedY = powerProperty.speed;
      powers.push(bluePower);
      break;
    case 'green':
      let greenPower = new Ball(brick.x + brick.width/2, brick.y + brick.height, powerProperty.radius, 0);
      greenPower.color = powerProperty.color.green;
      greenPower.speedY = powerProperty.speed;
      powers.push(greenPower);
      break;
    case 'purple':
      let purplePower = new Ball(brick.x + brick.width/2, brick.y + brick.height, powerProperty.radius, 0);
      purplePower.color = powerProperty.color.purple;
      purplePower.speedY = powerProperty.speed;
      powers.push(purplePower);
      break;
    case 'yellow':
      let yellowPower = new Ball(brick.x + brick.width/2, brick.y + brick.height, powerProperty.radius, 0);
      yellowPower.color = powerProperty.color.yellow;
      yellowPower.speedY = powerProperty.speed;
      powers.push(yellowPower);
      break;
  }
}

function brickCollisionBehavior(brick) {
  if(brick.color !== 'white') {
    brick.deactivate();
    score += 10;
    $score.innerText = score;
    checkColor(brick)
    brickBreakingSound()
  } else {       
    brick.hits++   
    if(brick.hits < 5) {            
      ballHitSound()
    } else {
      brick.deactivate()
      brickBreakingSound()
    }
  }
}

function checkResults() {
  clearInterval(timeInterval);
  results(); 
}

function pauseGame() {
  clearInterval(timeInterval)
  gamePaused = true;
  displayInfo.style.display = 'flex';
  infoBtns.style.display = 'flex';
}

function resumeGame() {
  timeInterval = setInterval(() => {
    time--
    $time.innerText = time;  
    if(time < 10 && time > 0) $time.style.color = 'red';
    else $time.style.color = 'black';
  }, 1000)
  gamePaused = false;
  displayInfo.style.display = 'none';
  animate() 
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  bricks.forEach(brick => brick.update());
  paddle.update();
  ball.update();

  if(ballExtra) ballExtra.update();

  if(powers.length) {
    powers.forEach(power => power.update())
  }

  if(bullets.length) {
    bullets.forEach(bullet => bullet.update())
  }


  paddle.speed = 0;
  if(ball.speedY === 0) ball.speedX = 0;

  if(paddle.speed <= 0 && lastKey === 'ArrowRight' && keys.arrowRight.isPressed) {
    paddle.speed = 10;
    
  }
  if(paddle.speed >= 0 && lastKey === 'ArrowLeft' && keys.arrowLeft.isPressed) {
    paddle.speed = -10;    
  }

  if(ball.speedY === 0 && !gamePaused && paddle.x > 11 && paddle.x < canvas.width - paddle.width - 11) {
    ball.speedX = paddle.speed;
  }


  // Collisions Bricks

  bricks.forEach(brick => {
    if(brick.isActive){
      if(brickCollisionBottom(brick, ball) || brickCollisionTop(brick, ball)) {
        ball.speedY = -ball.speedY;
        brickCollisionBehavior(brick)
      }
      if(brickCollisionLeft(brick, ball) || brickCollisionRight(brick, ball)) {
        ball.speedX = -ball.speedX;
        brickCollisionBehavior(brick)
      }
      if(brickCornerCollisions(brick, ball)) {
        ball.speedX = -ball.speedX;
        ball.speedY = -ball.speedY;
        brickCollisionBehavior(brick)
      }


      // Collision Brick/ballExtra

      if(brickCollisionBottom(brick, ballExtra) || brickCollisionTop(brick, ballExtra)) {
        ballExtra.speedY = -ballExtra.speedY;
        brickCollisionBehavior(brick)
      }
      if(brickCollisionLeft(brick, ballExtra) || brickCollisionRight(brick, ballExtra)) {
        ballExtra.speedX = -ballExtra.speedX;
        brickCollisionBehavior(brick)
      }
      if(brickCornerCollisions(brick, ballExtra)) {
        ballExtra.speedX = -ballExtra.speedX;
        ballExtra.speedY = -ballExtra.speedY;
        brickCollisionBehavior(brick)
      }


      // Collision Bullet/Brick

      bullets.forEach(bullet => {
        
        if(brickCollisionBottom(brick, bullet)) {            
          bullets.splice(bullets.indexOf(bullet), 1);
          brickCollisionBehavior(brick)
        }
        
        if(bullet.y < 15) bullets.splice(bullets.indexOf(bullet), 1);
      })
    }    
  })


  // Collisions paddle/ball

  if(paddleCollisionTop(paddle, ball)) {
    if(paddle.sticky) {
      speed = 0;
      ball.speedX = 0;
      ball.speedY = 0;
    } else {
      ball.speedY = -ball.speedY;      
      ballHitSound()
    }
  }
  if((paddleCollisionRight(paddle, ball) && ball.speedX < 0) || paddleCollisionLeft(paddle, ball) && ball.speedX > 0) ball.speedX = -ball.speedX;
  
  if(collisionRightCorner(paddle, ball) || collisionLeftCorner(paddle, ball)) {
    if(paddle.sticky) {
      speed = 0;
      ball.speedX = 0;
      ball.speedY = 0;
    } else {
      ball.speedX = paddle.speed;
    }
  }  


  // Collisions paddle/ballExtra

  if(paddleCollisionTop(paddle, ballExtra)) {
    ballExtra.speedY = -ballExtra.speedY;    
    ballHitSound()
  }

  if((paddleCollisionRight(paddle, ballExtra) && ballExtra.speedX < 0) || paddleCollisionLeft(paddle, ballExtra) && ballExtra.speedX > 0) ballExtra.speedX = -ballExtra.speedX;
  
  if(collisionRightCorner(paddle, ballExtra) || collisionLeftCorner(paddle, ballExtra)) ballExtra.speedX = paddle.speed;


  // ballExtra out  
  if(ballExtra.y > canvas.height) {
    if(paddle.color === 'yellow') {
      ballExtra = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, (5+increaseSpeed));
      ballExtra.color = 'yellow';
    } else {
      ballExtra = '';
    }
  }


  // Colisiones paddle/Poderes
  powers.forEach(power => {
    if(paddleCollisionTop(paddle, power)) {
      powers.splice(powers.indexOf(power), 1);
      clearTimeout(setAbility);
      switch (power.color) {
        case powerProperty.color.blue:
          getBlueAbility();
          break;
        case powerProperty.color.green:
          getGreenAbility();
          break;
        case powerProperty.color.purple:
          getPurpleAbility();
          break;
        case powerProperty.color.yellow:          
          ballExtra = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, (5+increaseSpeed));
          ballExtra.color = 'yellow';
          getYellowAbility();
          break;        
      }
    }
  })  

  // Take life

  if(ball.y > canvas.height) {
    numLives--
    speed = 0
    if(numLives === 2) {    
      v3.style.opacity = 0;      
      ball = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, speed);
    } else if(numLives === 1) {    
      v2.style.opacity = 0; 
      ball = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, speed);
    } else {    
      v1.style.opacity = 0;
      isAlive = false;
      checkResults();
    }
  }  
  
  if(time <= 0) {
    isAlive = false;
    checkResults();
  }
  
  if(bricks.every(brick => {
    return (
      brick.color === 'white' ||
      !brick.isActive
    )
  })) {
    completado = true;
    isAlive = false;
    checkResults(); 
  }
  if(isAlive && !gamePaused) requestAnimationFrame(animate);
}

// Actions

window.addEventListener('keydown', ( {key} ) => {
  switch (key) {
    case 'ArrowRight':
      lastKey = 'ArrowRight';
      keys.arrowRight.isPressed = true;
      break;
    case 'ArrowLeft':      
      lastKey = 'ArrowLeft';
      keys.arrowLeft.isPressed = true;
      break;
    case ' ':
      resetInfoDisplay()
      if(gamePaused) resumeGame();
      else pauseGame();
      break;
    case 'a':
    case 'A':
      if(speed === 0 && !gamePaused) {
        speed = 5 + increaseSpeed;
        ball.speedY = -speed;
        ball.speedX = -speed;
      }
      break;
    case 'd':
    case 'D':
      if(speed === 0 && !gamePaused) {
        speed = 5 + increaseSpeed;
        ball.speedY = -speed;
        ball.speedX = speed;
      }
      break;
    case 'ArrowUp':
      if(paddle.powerUp && bullets.length < 3) {
        let bullet = new Ball(paddle.x + paddle.width/2, paddle.y - 12.5, 12.5, 0);
        bullet.color = 'black';
        bullet.speedY = -3;
        bullets.push(bullet);
      }
      break;
    case 's':
    case 'S':
      if(soundOn) soundOn = false;
      else soundOn = true;
      break; 
    case 'm':
    case 'M':
      if(musicOn) {
        musicOn = false;
        currentMusic.pause();        
      } else {        
        musicOn = true;
        currentMusic.play();
      }      
      break; 
    case '-':
      volumeDown();
      break;
    case '+':
      volumeUp();
      break;
    default:
      console.log(key)
  }
})

window.addEventListener('keyup', ( {key} ) => {
  switch(key) {
    case 'ArrowRight':
      keys.arrowRight.isPressed = false;
      break;
    case 'ArrowLeft':
      keys.arrowLeft.isPressed = false;
      break;
  }
})

// next-level-button listener

$nextBtn.addEventListener('click', () => {
  getNextLevel()
  gameMusic()
})


// Start Game listener

$startGameBtn.addEventListener('click', () => {
  startGame()
  gameMusic()
})


// Info Buttons

infoControls.addEventListener('click', () => {
  resetInfoDisplay()
  controlsMenu.style.display = 'flex';  
  returnMenu.style.display = 'block';
})

infoPowers.addEventListener('click', () => {
  resetInfoDisplay()
  powersMenu.style.display = 'flex';  
  returnMenu.style.display = 'block';
})

infoMusicVolume.addEventListener('click', () => {
  resetInfoDisplay()
  musicVolumeMenu.style.display = 'flex';
  returnMenu.style.display = 'block';
})

returnMenu.addEventListener('click', () => {
  resetInfoDisplay();
  infoBtns.style.display = 'flex';
})


function resetInfoDisplay() {
  controlsMenu.style.display = 'none';
  powersMenu.style.display = 'none';
  musicVolumeMenu.style.display = 'none';
  infoBtns.style.display = 'none';
  returnMenu.style.display = 'none';
  displayResult.style.display = 'none';
}


// Volume Buttons

reduceVolumeBtn.addEventListener('click', volumeDown)

incrementVolumeBtn.addEventListener('click', volumeUp)

function volumeDown() {
  if(currentMusic && currentMusic.volume > 0) {
    if(currentMusic.volume - 0.1 < 0) currentMusic.volume = 0;
    else currentMusic.volume -= 0.1;
    volumeLevel = currentMusic.volume;        
    console.log(volumeLevel)
    getVolumeSquares()
  }  
}

function volumeUp() {
  if(currentMusic && currentMusic.volume < 1) {
    if(currentMusic.volume + 0.1 > 1) currentMusic.volume = 1;
    else currentMusic.volume += 0.1;        
    volumeLevel = currentMusic.volume;
    console.log(volumeLevel)
    getVolumeSquares()
  }
}

function getVolumeSquares() {

  volumeSquares.forEach(square => square.style.backgroundColor = 'transparent');

  for(let i = 0.1; i.toFixed(1) <= volumeLevel.toFixed(1); i=i+0.1) {
    volumeSquares[(i.toFixed(1))*10-1].style.backgroundColor = 'white';
  }
}

// Exit Game

exitGame.addEventListener('click', () => {

  clearInterval(timeInterval);
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }
  resetInfoDisplay();
  startingScreenEl.style.display = 'flex';
})










  
  
