let durchmesser;

let rotSlider;

let groesseSlider;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  durchmesser=width/2;

  rotSlider=createSlider(0, 255);
  rotSlider.position(50,50);

  groesseSlider=createSlider(10, 100);
  groesseSlider.position(50, 100);
}

function draw() {

  background(0);
 /* let r=rotSlider.value();

  background(r,0, 100, r);

 
  let hoehe=random(100, 500);

  let dd=sin(frameCount/100);

  let nv=map(dd, -1,1,300, 500);

  

  //console.log(frameCount)

  fill(255, 10);
  ellipse(mouseX, mouseY, nv,r);
  */

  randomSeed(10);

  let radius=groesseSlider.value();
  let anzahl = width/radius*2;
  stroke(255);
  noFill();
  beginShape();
  for(let i=0; i<anzahl; i=i+1){
   //ellipse(radius+i*2*radius, radius, 2*radius,2*radius);
   vertex(radius+i*2*radius, radius+random(-100,100)+200);
  }
  endShape();


  let x=0;
  beginShape();
  for(let i=0; i<anzahl; i=i+1){
   //ellipse(radius+i*2*radius, radius, 2*radius,2*radius);
   let y=noise(x) *200;
   vertex(radius+i*2*radius, y+500);

   x=x+0.1;
  }
  endShape();

 
}


/*function keyPressed(){
  saveCanvas("meinbild", "png");
}*/


function keyTyped() {
  if (key == 's') {
    let d=new Date();
    /* ~~~~~~~~~~~~ export SVG */
    save(d+".svg")
    noLoop();
  }
  
}