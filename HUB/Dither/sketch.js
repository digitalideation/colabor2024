/* 
Hanna Zuellig, HUB HSLU, 2024
Example of dithering an image using error diffusion
After Daniel Shiffman Processing Example https://www.youtube.com/watch?v=0L2n8Tg2FwI
*/

let original;
let newImage;
let noiseSlider;

// Scale factor
let sc=2;

let n=4;

function preload() {
  original = loadImage("David.jpg");

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set pixel density to 1 so the resulting image is the same size as the original
  pixelDensity(1);
  
  // Create a new image with scaled dimensions
  newImage = createGraphics(original.width, original.height);
  newImage.background(255);
  newImage.noStroke();
  newImage.pixelDensity(1);

  // Scale the original image to improve performance
  original.resize(round(original.width/sc), round(original.height/sc));
  image(original, 0 , 0);
  // Apply the dithering effect, the second parameter is the number of steps regarding the color
  // The higher the number, the more colors will be used
  // 1 is actually two steps, either 0 or 255, this means full color or zero
  makeDithered(original, 2);
  
  image(newImage, original.width, 0);

  noiseSlider = createSlider(0, 100, 50);
  noiseSlider.position(10, 10);

  noiseSlider.changed(() => {
    background(255);
    image(original, 0 , 0);
    n=noiseSlider.value()/10;
    newImage.fill(255);
    newImage.rect(0,0,newImage.width,newImage.height);
    makeDithered(original, 2);
    image(newImage, original.width, 0);
  });
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function xyFromIndex(img, idx) {
  let x = idx / 4 % img.width;
  let y = (idx / 4 - x) / img.width;
  return { x: x, y: y };
}

//function does the same as get(x,y) but is faster
function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

//function does the same as set(x,y,clr) but is faster
function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}



// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();
  //newImage.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      //faster than get()
      let clr = getColorAtindex(img, x, y);
      //let clr = img.get(x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);

      let brightness = (0.299*oldR + 0.587*oldG + 0.114 * oldB) ;
      let newBrightness = closestStep(255, steps, brightness);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newR, newG, newB);

      //setColorAtIndex(newImage, x, y, newClr);

      drawDot(x,y,newClr)

      //drawDot(x,y,color(newBrightness));

      //difference between old and new color
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
  //newImage.updatePixels();
}

// Floyd-Steinberg error diffusion
// https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering

function distributeError(img, x, y, errR, errG, errB) {
  let idx = imageIndex(img, x, y);
  let pos={x:x,y:y};
  //if(y%2==0){
   // pos=xyFromIndex(img, idx+img.width*2);
  //}
  //Pixel at x+1, y (right)
  addError(img, 7 / 16.0, pos.x + 1, pos.y, errR, errG, errB);
  //Pixel at x-1, y+1 (left down)
  addError(img, 3 / 16.0, pos.x - 1, pos.y + 1, errR, errG, errB);
  //Pixel at x, y+1 (down)
  addError(img, 5 / 16.0, pos.x, pos.y + 1, errR, errG, errB);
  //Pixel at x+1, y+1 (right down)
  addError(img, 1 / 16.0, pos.x + 1, pos.y + 1, errR, errG, errB);


  //misuse the error diffusion for some random effect
  //pixel right down gets the full error
  
  //addError(img, 16.0 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}

function drawDot(x,y,c){
  newImage.fill(c);
 
  let pos={x:x,y:y};
  
 

  let idx = imageIndex(newImage, x, y);
  let xshift=sin(idx/10)*noise(x/10)*n; //add some noise
  let yshift=cos(frameCount/10)*noise(idx/20, sin(frameCount))*n; //add some noise
  
 
  if(y%4==0){
    pos.x+=xshift;
  }
 
  //add some noise
  newImage.ellipse(pos.x*sc,pos.y*sc,sc,sc)
}

