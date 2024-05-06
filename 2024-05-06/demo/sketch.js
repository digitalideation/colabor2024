let breite=100;

let anzahl;

let winkel;

let colorA, colorB;

let skalierung=1;


//anchorpunkte
let x1, y1, x2, y2, x3, y3, x4, y4;
//kontrollpunkte p1
let cx11, cy11, cx12, cy12;
//kontrollpunkte p2
let cx21, cy21, cx22, cy22;
//kontrollpunkte p3
let cx31, cy31, cx32, cy32;
//kontrollpunkte p4
let cx41, cy41, cx42, cy42;


function setup() {
  createCanvas(windowWidth, windowHeight);

  anzahl=floor(width/breite);

  angleMode(DEGREES);
  rectMode(CENTER);

 
  colorA=color(102,93,156,110);
  colorB=color(212,17,56,110);
}

function draw() {
  background(220);


  skalierung=1;

  winkel=0;
  noStroke();

  for(let i=0;i<anzahl;i++){

      push();
      translate(i*breite, 200);
      rotate(winkel);

      let sinuswinkel=map(i*breite, 0, width, 0, 180);
      skalierung=sin(sinuswinkel) * 2 + 0.5;

      scale(skalierung);

      let mischwert=map(i*breite, 0,width, 0, 1);
      let colorC=lerpColor(colorA, colorB, mischwert);


      fill(colorC);
      
     // rect(0, 0, breite, breite);

     let t=map(i*breite, 0,width, 0.5, 2.2);
     setPoints(t);
     zeichneBezierShape()

      fill(255,0,0);
      ellipse(0,0,5,5);

      pop();
      winkel=winkel+2;

      //skalierung=skalierung*1.1;
  }
}


function zeichneBezierShape(){
     //zeichnet die Grundform, anhand von vier Bezierkurven, jeweils mit anchor, control, control, anchor
  bezier(x1,y1,cx11,cy11,cx21,cy21,x2,y2);
  bezier(x2,y2,cx22,cy22,cx31,cy31,x3,y3);
  bezier(x3,y3,cx32,cy32,cx41,cy41,x4,y4);
  bezier(x4,y4,cx42,cy42,cx12,cy12,x1,y1);
}


function setPoints(t){
  //studiere die abbildung shape_vol1_001.png um die berechnung der punkte zu verstehen
    x1 = breite;
    y1 = breite / 2;
    cx11 = x1;
    cy11 = y1 + t * breite / 2;
    cx12 = x1;
    cy12 = y1 - t * breite / 2;
  
    x2 = breite / 2;
    y2 = breite;
    cx21 = x2 + t * breite / 2;
    cy21 = y2;
    cx22 = x2 - t * breite / 2;
    cy22 = y2;
  
    x3 = 0;
    y3 = breite / 2;
    cx32 = x3;
    cy32 = y3 - t * breite / 2;
    cx31 = x3;
    cy31 = y3 + t * breite / 2;
  
    x4 = breite / 2;
    y4 = 0;
    cx41 = x4 - t * breite / 2;
    cx42 = x4 + t * breite / 2;
    cy41 = y4;
    cy42 = y4;
  
 
  
  }