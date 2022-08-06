import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'

const maxImage = 21;
const randImageIndex = Math.floor(Math.random() * maxImage);
const randImagePath = `images/${randImageIndex}.png`;

console.log("Image selected: " + randImagePath);

const img = document.querySelector('img.logo');

img.setAttribute('src', randImagePath);
document.body.style.backgroundImage = "url('" + randImagePath + "')";

const colorThief = new ColorThief();

if (img.complete) {
  colorThief.getColor(img);
} else {
  image.addEventListener('load', function() {
    colorThief.getColor(img);
  });
}