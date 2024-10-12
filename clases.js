class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = Math.random() > 0.2 ? 
                 regularColors[Math.floor(Math.random() * regularColors.length)] :
                 specialColors[Math.floor(Math.random() * specialColors.length)]
    this.width = 100;
    this.height = 40;
    this.isActive = true;
    this.image = new Image(),
    this.image.src = './img/broken-brick.jpg';
    this.hits = 0;
  }
  draw() {
    if(this.color === 'white' && this.hits === 4) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }        
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(){
    if(this.isActive) this.draw();
  }
  deactivate(){
    this.isActive = false;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 25;
    this.speed = 0;
    this.color = 'white';
    this.powerUp = false;
    this.sticky = false;
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  update(){
    this.draw();
    this.x += this.speed;
    if(this.color === 'blue') {           
      if(this.x <= -90) this.x = -90;
      else if(this.x + this.width >= canvas.width + 90) this.x = canvas.width - this.width + 90;

    } else {        
      if(this.x <= 10) this.x = 10;
      else if(this.x + this.width >= canvas.width - 10) this.x = canvas.width - this.width - 10;
    }
  }
}

class Ball {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speed; 
    this.speedY = -speed;
    this.color = 'white';
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);    
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = this.color === 'white' || this.color === 'yellow' ? 'black' :
                      this.color === 'black' ? 'purple' : 'transparent';
    ctx.stroke();
  }
  update(){
    this.draw();
    this.x += this.speedX;
    this.y += this.speedY;
    if((this.x + this.radius >= canvas.width) || (this.x - this.radius <= 0)) {
      this.speedX = -this.speedX;
      ballHitSound()
    } 
    if(this.y - this.radius <= 0) {
      this.speedY = -this.speedY;  
      ballHitSound()
    }
  }
}

