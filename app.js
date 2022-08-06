const maxImage = 21;
// const randImageIndex = 1 + Math.floor(Math.random() * (maxImage - 1));
// const randImagePath = `images/${randImageIndex}.jpeg`;

// Get image from cookie
var imageIndex = getCookie("image");
if (!imageIndex){
    imageIndex = 1;
}
const imagePath = `images/${imageIndex}.jpeg`;
console.log("Image selected: " + imagePath);

let nextImage =  parseInt(imageIndex) + 1;
if (nextImage > maxImage) { nextImage = 1 }

// Set cookie for next load
setCookie("image", nextImage);

const img = document.querySelector('img.logo');
const background = document.querySelector('div.background');
const link = document.querySelector("link[rel='shortcut icon']");

// Cancel loading
img.setAttribute('src', "");
background.style.backgroundImage = "";

img.setAttribute('src', imagePath);
background.style.backgroundImage = "url('" + imagePath + "')";
link.href = imagePath;

if (img.complete) {
    updateTextColor(img);
} else {
  img.addEventListener('load', function() {
    updateTextColor(img);
  });
}

function updateTextColor(img) {
    const colorThief = new ColorThief();

    // Extract the two most prominant colors from the image
    var palette = colorThief.getPalette(img, 2);

    console.log(palette);

    // Set the text background as a gradient between those two colors
    const textGradient = `linear-gradient(45deg, rgb(${palette[1][0]}, ${palette[1][1]}, ${palette[1][2]}), rgb(${palette[0][0]}, ${palette[0][1]}, ${palette[0][2]}))`

    const text = document.querySelector('div.text');
    text.style.backgroundImage = textGradient;
}

function setCookie(name, value){
    document.cookie = `${name}=${value}`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}