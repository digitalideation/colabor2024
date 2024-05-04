let winkel=0;

let breite=50;
let anzahl;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  frameRate(2);
  anzahl=width/breite;
}

function draw() {
  background(255);
  rectMode(CENTER);
  push();
  translate(0,height/2);
  winkel=0;
  for(let j=0;j<anzahl;j++){
      push();
      translate(j*breite + breite/2, 0);
      rotate(winkel);
      rect(0,0,breite,breite);
      pop();
      winkel+=1;
   
  }
  pop();
}
