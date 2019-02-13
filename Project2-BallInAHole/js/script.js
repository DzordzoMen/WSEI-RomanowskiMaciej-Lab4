var ball = document.querySelector('.ball');

var canvas = document.querySelector('canvas');
canvas.width = this.canvas.scrollWidth;
canvas.height = this.canvas.scrollHeight;

var context = canvas.getContext('2d');
var timeDiv = document.querySelector('.time');

var actualX = canvas.width/2, actualY = canvas.height/2; //pozycja kulki

let time = new Date().getTime()/1000;

function main() { //glowna funkcja
  let tempTime = new Date().getTime()/1000 - time; //obsluga czasu
  timeDiv.innerHTML = Math.floor(tempTime);
  drawObstacles();
  draw();
  chceckIfWin();
  window.requestAnimationFrame(main);
}

let obstacleAmount = 11;
let obstacleArray = [];
createObstacles();

function createObstacles() {  //stworzenie przeszkod
  for(var i = 0; i < obstacleAmount; i++) {
    let x = Math.floor(Math.random() * canvas.width),
        y = Math.floor(Math.random() * canvas.height),
        sizeX = Math.floor(40 +Math.random() * 60),
        sizeY = Math.floor(40 +Math.random() * 60);
    obstacleArray.push({x: x, y: y, sizeX: sizeX, sizeY: sizeY});
  }
}

function drawObstacles() {
  for(var i = 0; i < obstacleAmount; i++) {
    context.fillRect(obstacleArray[i].x, obstacleArray[i].y, obstacleArray[i].sizeX, obstacleArray[i].sizeY);
  }
}

let rotateLR = 0, rotateFor = 0, upDown = 0;
let circleRadius = 10;

function draw() {
  context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.closePath();

  context.fillStyle = "#9ac457";
  drawObstacles(); //stworzenie przeszkod
  chcekCollision();
  actualY += upDown/10; //dodanie wartosci pochylenia ekranu
  actualX += rotateLR/10;

  createHoles();

  context.fillStyle = "#9ac457";
  context.moveTo(actualX, actualY);
  context.beginPath();
  context.arc(actualX, actualY, circleRadius ,Math.PI/3.1, true);
  context.closePath();
  context.fill();
  context.stroke();
}


function handlePhoneOrientation(event) { //zdarzenia pochylenia ekranu
  rotateLR = event.alpha; //obrot wokol wlasnej osi
  rotateFor = event.gamma; //obrot pod katem
  upDown = event.beta - 90; //gora dol
}

function chcekCollision() { //srawdznie czy kulka uderzyla w zly prostokąt
  obstacleArray.forEach(function(bar, index) {
    if(actualX > bar.x && actualX < bar.x+bar.sizeX) {
      if(actualY > bar.y && actualY <bar.y+bar.sizeY) {
        let wrapper = document.querySelector('.wrapper');
        let canvas = document.querySelector('#canvas');
        let end = wrapper.removeChild(canvas);
        let score = document.querySelector('.end').style.display = "block";
      }
    }
  });
}

function chceckIfWin() {
  let z = false;
  if(actualX < 50 && actualY < 50) {
    z = true;
  } else if(actualX > canvas.width - 50 && actualY > canvas.height - 50) {
    z = true;
  }

  if(z) {
    let wrapper = document.querySelector('.wrapper');
    let canvas = document.querySelector('#canvas');
    let end = wrapper.removeChild(canvas);
    let score = document.querySelector('.win').style.display = "block";
  }
}

function createHoles() {
  let size = 50;
  context.fillStyle = "orange";
  context.fillRect(0, 0, size, size);
  context.fillRect(canvas.width - size, canvas.height - size, size, size);
}


window.addEventListener('deviceorientation', handlePhoneOrientation);
window.requestAnimationFrame(main);
