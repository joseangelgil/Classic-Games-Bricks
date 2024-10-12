function getLevel() {

  switch(level){
    case 1:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (i > 8) || (j < 1) || (j > 8)) brick.deactivate();
          bricks.push(brick);
        }
      }
      break;
    case 2:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (j < 1) || (j > 8)) brick.deactivate();
          if(j === 1 || j === 8) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
    case 3:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (j < 1) || (j > 8)) brick.deactivate();
          if((i === 2 || i === 3 || i === 8 || i === 9) && (j === 2 || j === 7)) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
    case 4:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (j < 1) || (j > 8)) brick.deactivate();
          if((i === 5 || i === 6) && (j > 1 && j < 8)) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
    case 5:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (j < 2) || (j > 7)) brick.deactivate();
          if((i === 8 && (j > 1 && j < 8) && !(j === 5) && !(j === 4)) || (i === 2 && (j > 3 && j < 6))) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
    case 6:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i < 2) || (i > 9) || (j < 1) || (j > 8)) brick.deactivate();
          if(((i === 2 || i === 3) && (j > 2 && j < 7) && !(j === 5) && !(j === 4)) ||
             (i > 7) && (j > 2 && j < 7)) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
    case 7:
      for (let i = 0; i < 10; i++){
        for (let j = 0; j < 10; j++){
          let x = 12 + 100 * j;
          let y = 12 + 40 * i;
        
          const brick = new Brick(x, y);
          if((i > 9) || (i < 2) || (j < 1) || (j > 8)) brick.deactivate();
          if((i === 3 && j === 2) ||
             (i === 2 && j === 7) ||
             (i === 9 && j === 1) ||
             (i === 6 && j === 8) ||
             (i === 7 && j === 6) ||
             (i === 6 && j === 3) ||
             (i === 9 && j === 4) ||
             (i === 2 && j === 5)) brick.color = 'white';
          bricks.push(brick);
        }
      }
      break;
  } 
  
  return bricks;
}

