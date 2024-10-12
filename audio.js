function brickBreakingSound() {
  if(soundOn) {
    const brickAudio = new Audio("audio/brick.mp3"); 
    brickAudio.duration = 0.05;               
    brickAudio.volume = 0.2;
    brickAudio.play() 
  }  
}

function ballHitSound() {  
  if(soundOn) {
    const ballAudio = new Audio("audio/ball.mp3");    
    ballAudio.currentTime = 0.4;
    ballAudio.play();
  }  
}

function gameOverSound() {
  if(soundOn) {
    const gameOverAudio = new Audio("audio/game-over.mp3");
    gameOverAudio.volume = 0.7;
    gameOverAudio.play();
  }
}

function winLevelSound() {
  if(soundOn) {
    const winLevelAudio = new Audio("audio/crowd-cheering.mp3");
    winLevelAudio.volume = 0.7;
    winLevelAudio.play(); 
  }
}

function gameMusic() {  
  // Stop currentMusic if any
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0; // Reset currentTime
  }
    switch (level) {
      case 1:        
        songOnePartOne()
        break; 
      case 2:
        songOnePartTwo()
        break;
      case 3:        
        songTwoPartOne()
        break; 
      case 4:
        songTwoPartTwo()
        break;
      case 5:
        songOnePartOne()
        break; 
      case 6:
        songTwoPartOne()
        break;
      case 7:
        songTwoPartTwo()
        break;
    }
}

function songOnePartOne() {
  currentMusic = new Audio("audio/lady-of-the-80.mp3");
  songNumber = 1;              
  currentMusic.volume = volumeLevel;  
  currentMusic.play();
}

function songOnePartTwo() {
  currentMusic = new Audio("audio/lady-of-the-80.mp3");
  songNumber = 1;
  currentMusic.currentTime = 90              
  currentMusic.volume = volumeLevel;    
  currentMusic.play();
}

function songTwoPartOne() {
  currentMusic = new Audio("audio/adventure-time.mp3");
  songNumber = 2;              
  currentMusic.volume = volumeLevel;  
  currentMusic.play();
}

function songTwoPartTwo() {
  currentMusic = new Audio("audio/adventure-time.mp3");
  songNumber = 2;        
  currentMusic.currentTime = 90              
  currentMusic.volume = volumeLevel;  
  currentMusic.play();
}


if(2.53982254.toFixed(1) < 2.2) console.log(true)