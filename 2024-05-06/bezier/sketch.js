//Inspired by http://aleksandrajovanic.com/chromatlas/

let breite = 500; //breite und hoehe der grundform
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

let allPoints ;

let t = 0.9;//bestimmt den abstand der kontrollpunkte zu den ankerpunkten, faktor multipliziert mit der hälfte der breite

let tSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  tSlider=createSlider(10,500,55);//range für den faktor t, für bessere varianz mit 100 multipliziert, wird in zeile 32 dividiert
  tSlider.position(100,100);

 
  
}

function draw() {
  background(255, 50);
  //wert des sliders wird durch 100 geteilt, um den faktor t zu bestimmen
  t=tSlider.value()/100;

  fill(255,0,0)
  noStroke();
  text(t,100,140);
  noFill();

  //rechnet die punkte und kontrollpunkte, basierend auf breite und position der kontrollpunkte
  setPoints();

  //zeichnet die form
  drawShape();


}


function setPoints(){
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

  //speichert die punkte in einem array, um sie später zu zeichnen und zu beschriften
  allPoints = [
    {"x1":x1}, {"y1":y1}, {"x2":x2}, {"y2":y2}, {"x3":x3}, {"y3":y3},{"x4":x4}, {"y4":y4},
    {"cx11":cx11}, {"cy11":cy11}, {"cx12":cx12}, {"cy12":cy12},
    {"cx21":cx21}, {"cy21":cy21}, {"cx22":cx22}, {"cy22":cy22},
    {"cx31":cx31}, {"cy31":cy31}, {"cx32":cx32}, {"cy32":cy32},
    {"cx41":cx41}, {"cy41":cy41}, {"cx42":cx42}, {"cy41":cy42}
  
  ]

}

function drawShape() {
  stroke(0);
  //speichert den aktuellen zustand des koordinatensystems
  push();
  //verschiebt den ursprung des koordinatensystems in die mitte des canvas
  translate(width/2-breite/2, height/2-breite/2);
 
 
  //zeichnet die Grundform, anhand von vier Bezierkurven, jeweils mit anchor, control, control, anchor
  bezier(x1,y1,cx11,cy11,cx21,cy21,x2,y2);
  bezier(x2,y2,cx22,cy22,cx31,cy31,x3,y3);
  bezier(x3,y3,cx32,cy32,cx41,cy41,x4,y4);
  bezier(x4,y4,cx42,cy42,cx12,cy12,x1,y1);
 

  //zeichne die linien zwischen den punkten und kontrollpunkten
  stroke(100, 50);
  line(x1, y1, cx11, cy11);
  line(x1, y1, cx12, cy12);
  line(x2, y2, cx21, cy21);
  line(x2, y2, cx22, cy22);
  line(x3, y3, cx31, cy31);
  line(x3, y3, cx32, cy32);
  line(x4, y4, cx41, cy41);
  line(x4, y4, cx42, cy42);

  //zeichne die kontrollpunkte und beschrifte die punkte und kontrollpunkte
  fill(255,0,0)
  for(let p=0;p<allPoints.length;p+=2){
    let p1=allPoints[p];
    let p2=allPoints[p+1];
    ellipse(Object.values(p1), Object.values(p2), 5, 5);
    push()
    translate(10, 0);
    text(Object.keys(p1),Object.values(p1), Object.values(p2));
    pop();
  }

  //setze das koordinatensystem zurück
  pop();

  
}