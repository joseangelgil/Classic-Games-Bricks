function getBlueAbility() {
  resetPaddle()
  paddle.x = paddle.x - paddle.width/2;  
  paddle.width = widthOriginal * 2;
  paddle.color = 'blue';
  setAbility = setTimeout(() => {
    resetPaddle()    
    paddle.x = paddle.x + paddle.width/2;
  }, abilityTime)
}
function getGreenAbility() {
  resetPaddle()
  paddle.sticky = true;
  paddle.color = 'green';
  setAbility = setTimeout(() => {
    resetPaddle()
  }, abilityTime)
}
function getPurpleAbility() {
  resetPaddle()
  paddle.width = widthOriginal / 2; 
  paddle.x = paddle.x + paddle.width/2;
  paddle.color = 'purple';  
  paddle.powerUp = true;
  setAbility = setTimeout(() => {
    paddle.x = paddle.x - paddle.width/2;
    resetPaddle()
  }, abilityTime)
}
function getYellowAbility() {  
  resetPaddle()
  paddle.color = 'yellow';  
  setAbility = setTimeout(() => {
    resetPaddle()
  }, abilityTime)
}

function resetPaddle(){
  paddle.width = widthOriginal;
  paddle.color = colorOriginal;
  paddle.powerUp = false;
  paddle.sticky = false;
  abilityTime = 10000;
}