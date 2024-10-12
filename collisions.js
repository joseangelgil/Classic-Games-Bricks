// Colisiones ball/brick

function brickCollisionBottom(brick, ball) {
  return (
    ball.x >= brick.x &&
    ball.x <= brick.x + brick.width &&
    ball.y <= brick.y + brick.height + ball.radius - ball.speedY &&
    !(ball.y < brick.y + brick.height) &&
    ball.speedY < 0
  ) 
} 

function brickCollisionTop(brick, ball) {
  return (
    ball.x >= brick.x &&
    ball.x <= brick.x + brick.width &&
    ball.y + ball.radius + ball.speedY >= brick.y &&
    !(ball.y > brick.y) &&
    ball.speedY > 0
  )
}

function brickCollisionLeft(brick, ball) { 
  return (
    ball.y >= brick.y && 
    ball.y <= brick.y + brick.height &&
    ball.x + ball.radius + ball.speedX >= brick.x && 
    !(ball.x > brick.x) && 
    ball.speedX > 0
  )
}

function brickCollisionRight(brick, ball) { 
  return (
    ball.y >= brick.y && 
    ball.y <= brick.y + brick.height &&
    ball.x - ball.radius + ball.speedX <= brick.x + brick.width && 
    !(ball.x < brick.x + brick.width) && 
    ball.speedX < 0
  )
}

// Brick Corner Collisions

function brickCornerCollisions(brick, ball) {
  const topLeftCorner = (
    ball.radius > Math.abs(brick.x - ball.x) &&
    ball.radius > Math.abs(brick.y - ball.y) &&
    !(ball.x > brick.x) &&
    !(ball.y > brick.y) &&
    ball.speedX > 0 &&
    ball.speedY > 0
  )
  const topRightCorner = (
    ball.radius > Math.abs(brick.x + brick.width - ball.x) &&
    ball.radius > Math.abs(brick.y - ball.y) &&
    !(ball.x < brick.x + brick.width) &&
    !(ball.y > brick.y) &&
    ball.speedX < 0 &&
    ball.speedY > 0
  )
  const bottomLeftCorner = (
    ball.radius > Math.abs(brick.x - ball.x) &&
    ball.radius > Math.abs(brick.y + brick.height - ball.y) &&
    !(ball.x > brick.x) &&
    !(ball.y < brick.y + brick.height) &&
    ball.speedX > 0 &&
    ball.speedY < 0
  )

  const bottomRightCorner = (
    ball.radius > Math.abs(brick.x + brick.width - ball.x) &&
    ball.radius > Math.abs(brick.y + brick.height - ball.y) &&
    !(ball.x < brick.x + brick.width) &&
    !(ball.y < brick.y + brick.height) &&
    ball.speedX < 0 &&
    ball.speedY < 0
  )

  return (topLeftCorner || topRightCorner || bottomLeftCorner || bottomRightCorner)
}


// Collisiions paddle/ball

function paddleCollisionTop(paddle, ball) {
  return (
    paddle.x + paddle.width >= ball.x - ball.radius &&
    paddle.x <= ball.x + ball.radius &&
    paddle.y <= ball.y + ball.radius &&
    !(paddle.y < ball.y) &&
    ball.speedY > 0
  )
}

function paddleCollisionLeft(paddle, ball) {
  return (
    paddle.y + paddle.height > ball.y - ball.radius &&
    paddle.y < ball.y + ball.radius &&
    paddle.x <= ball.x + ball.radius &&
    !(paddle.x < ball.x)
  )
}

function paddleCollisionRight(paddle, ball) {
  return (
    paddle.y + paddle.height > ball.y - ball.radius &&
    paddle.y < ball.y + ball.radius &&
    paddle.x + paddle.width >= ball.x - ball.radius &&
    !(paddle.x + paddle.width > ball.x)
  )
}

function collisionRightCorner(paddle, ball) {
  return (
    paddle.y < ball.y &&
    paddle.x + paddle.width >= ball.x - ball.radius &&
    !(paddle.x + paddle.width > ball.x) &&
    (ball.speedX < 0 || ball.speedX < paddle.speed)
  )
}

function collisionLeftCorner(paddle, ball) {
  return (
    paddle.y < ball.y &&
    paddle.x <= ball.x + ball.radius &&
    !(paddle.x < ball.x) &&
    (ball.speedX < 0 || ball.speedX < paddle.speed)
  )
}