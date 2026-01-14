/*
We need an algorithm
 */
let x = 1;
let y = 0;
let speed = 4;
let direction = 1;
const maxWindowWidth = window.innerWidth;
const maxWindowHeight = window.innerHeight;
const buttonElement = document.querySelector('button');


setInterval (()=> {
  x+= 1 * direction;
  if(x === maxWindowWidth){
    direction *= -1;
  }
  else if (x === 0){
    direction *= 1;
  }
  buttonElement.style.transform = `translate(${x}px, ${y}px)`;
  }
  ,16
)
