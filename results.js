function results() {

  displayResult.style.display = 'flex';
  const finalScoreEl = document.getElementById('final-score');
  let finalScore = score;
  let remainingTimeInterval;

  if((time <= 0 && numLives === 0) || (time <= 0 && !completed) || numLives <= 0) {
    document.getElementById('win-lose').innerText = 'YOU LOSE';
    document.getElementById('next-level').innerText = 'Try again';
    currentMusic.pause();
    currentMusic.currentTime = 0;
    
    finalScoreEl.innerText = score;    
    $nextBtn.disabled = false
    level = 1;
    increaseSpeed = 0;

    // update localStorage
    if(score > maxScore) {
      updateLocalStorage()
    }
    gameOverSound();
        
  } else {
    document.getElementById('win-lose').innerText = 'YOU WIN';
    document.getElementById('next-level').innerText = 'Next Level';
    level++;

    if(level > 7) {
      level = 1;
      increaseSpeed++
    }

    winLevelSound();
         
    finalScoreEl.innerText = finalScore;               
    setTimeout(() => {
      remainingTimeInterval = setInterval(() => {
        if (time <= 0) {        
          clearInterval(remainingTimeInterval);
          score = finalScore;
          setTimeout(() => $score.innerText = score, 1000);
          $nextBtn.disabled = false;

          // update localStorage
          if(score > maxScore) {
            updateLocalStorage()
          }
        } else {
          if(time > 10) {
            time-=10;
            finalScore+=100;
            $time.innerText = time;     
            finalScoreEl.innerText = finalScore;
          } else if(time > 0) {
            time--;
            finalScore+=10;
            $time.innerText = time;     
            finalScoreEl.innerText = finalScore;
          }
        }         
      }, 100)
    }, 1500)
  }
}

function updateLocalStorage() {
  maxScore = score;
  setTimeout(() => $maxScore.innerText = maxScore, 1000);
  localStorage.setItem('max-score', maxScore);
}