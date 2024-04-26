let rotSlider;
let gruenSlider;
let blueSlider;

function setup() {
  /*
  ~~~~~~~~~
  windowWidth, windowHeight sind Systemvariablen, die die aktuelle Fenstergrösse beinhalten
  */
  createCanvas(windowWidth, windowHeight);
 /* rotSlider=createSlider(0,255);
  rotSlider.position(50,50);
  gruenSlider=createSlider(0,255);
  gruenSlider.position(50,100);
  blueSlider=createSlider(0,255);
  blueSlider.position(50,150);*/
}

function draw() {
  background(0, 50);
  noFill();
  stroke(255);
  /*
  ~~~~~~~~~
  Zufall 
  https://p5js.org/reference/#/p5/random
  random(300); 
  liefert Kommazahlen zwischen 0 (inkl) und 300 (exkl) 
  */
 
  /*
  
  let d=random(300);
  ellipse(mouseX, mouseY, d,d);
  */

  /*
  ~~~~~~~~~
  Smoothe Veränderung mit sinus 
  https://setosa.io/ev/sine-and-cosine/
  */
  
  /*let d=sin(frameCount/100); //Werte zwischen -1,1
  d=map(d, -1,1, 10, 500);//Wertebereich umrechnen 
  ellipse(width/2, height/2, d,d);
  */

  /* 
  ~~~~~~~~~
  Farbe über Slider steuern
  */
 /* noStroke();
  // Werte der Slider in Variablen speichern?
  let r=rotSlider.value();
  let g=gruenSlider.value();
  let b=blueSlider.value();;
  background(255-r, 255-g, 255-b);//inverse Farbe
  fill(rotSlider.value(), gruenSlider.value(), blueSlider.value());
  ellipse(width/2, height/2, windowWidth,windowHeight);*/


  /*
  ~~~~~~~~~
  Wiederholung Loop
  */
  
  
  let breite=10;
  let anzahl=width/breite;
  let xoff=1.0;
  /*randomSeed(3); //random Algorithmus 'impfen'
  // ~~~~~~~~~ Punkte verbinden mit beginShape, endShape
  beginShape();
  for(let i=0;i<anzahl;i++){
    
    //line(i*100, height/2, (i+1)*100,height/2+100);
    vertex(i*breite, height/2);
    //let d=random(100);
    // ~~~~~~~~~ statt randomness noise? https://genekogan.com/code/p5js-perlin-noise/

    let d=noise(xoff) *100;
    vertex((i+1)*breite,height/2+d);
    xoff+=0.1;
  }
  endShape();
  */

  xoff=schreibeZeile(anzahl, xoff, 50);
  xoff=schreibeZeile(anzahl, xoff, 100);
  xoff=schreibeZeile(anzahl, xoff, 150);
  xoff=schreibeZeile(anzahl, xoff, 200);
  xoff=schreibeZeile(anzahl, xoff, 250);
  xoff=schreibeZeile(anzahl, xoff, 300);
}


//~~~~~Auslagerung in eine Funktion

function schreibeZeile(anzahl, xoff, y){

  // ~~~~~~~~~ Punkte verbinden mit beginShape, endShape
  beginShape();
  for(let i=0;i<anzahl;i++){
    
    let d=noise(xoff) * y / 2;//abweichung abhängig von y Position
    vertex(i*10,y+d);
    xoff+=0.2;
  }
  endShape();
  
  return xoff;
}