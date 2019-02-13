let canva = document.querySelector('#ps');
let ctx = canva.getContext('2d');
const imgSource = './photo/flowerPhoto.jpg';

let img = new Image();
img.src = imgSource;
img.addEventListener('load', () => {
  ctx.drawImage(img, 0, 0, canva.width, canva.height);
})

document.querySelector('#moreBrightnessBtn')
  .addEventListener('click', ()=> {changeBrightness(20)});

document.querySelector('#lessBrightnessBtn')
  .addEventListener('click', ()=> {changeBrightness(-20)});

document.querySelector('#moreContrastBtn')
  .addEventListener('click', () => {changeContrast(10)});

document.querySelector('#lessContrastBtn')
  .addEventListener('click', () => {changeContrast(-10)});

document.querySelector('#moreSaturationBtn')
  .addEventListener('click', ()=> {changeSaturation(20)});

document.querySelector('#lessSaturationBtn')
  .addEventListener('click', ()=> {changeSaturation(-20)});

// zmiana jasnosci obrazu
function changeBrightness(factor) {
  // pobranie pixeli z canvasa
  let imageData = ctx.getImageData(0, 0, canva.width, canva.height);
  for (let i = 0; i < imageData.data.length; i+=4) {
    imageData.data[i]   = Math.min(255, imageData.data[i] + factor);
    imageData.data[i+1] = Math.min(255, imageData.data[i+1] + factor);
    imageData.data[i+2] = Math.min(255, imageData.data[i+2] + factor);
  }
  ctx.putImageData(imageData, 0, 0);
}

// zmiana kontrastu
function changeContrast(factor) {
  let imageData = ctx.getImageData(0, 0, canva.width, canva.height);
  let contrast = (factor/100) + 1;
  let intercept = 128 * (1 - contrast);
  for(let i = 0; i < imageData.data.length; i+=4){
    imageData.data[i]   = Math.min(255, imageData.data[i] * contrast + intercept);
    imageData.data[i+1] = Math.min(255, imageData.data[i+1] * contrast + intercept);
    imageData.data[i+2] = Math.min(255, imageData.data[i+2] * contrast + intercept);
  }
  ctx.putImageData(imageData, 0, 0);
}

function changeSaturation(factor) {
  let imageData = ctx.getImageData(0, 0, canva.width, canva.height);
  for(let i = 0; i < imageData.data.length; i+=4){
    imageData.data[i]   = Math.min(255, imageData.data[i] - factor);
  }
  ctx.putImageData(imageData, 0, 0);
}