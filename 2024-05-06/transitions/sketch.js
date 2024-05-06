let winkel = 0;

let breite = 80;
let anzahl;
let distanzRand=100;

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



let colorA, colorB;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  anzahl = (width - 2 * distanzRand )/ breite;
  colorA = color(102, 93, 156, 110);
  colorB = color(212, 17, 56, 110);
}

function draw() {
  background(247, 243, 215);
  noStroke();
  rectMode(CENTER);
  push();
  translate(0, height / 2 -breite);
  let winkel=0;
  for (let j = 1; j < anzahl; j++) {
    //mit lerpColor eine Farbmischung rechnen 
    //lerpColor erwartet einen Wert zwischen 0 und 1
    let pos = map(j * breite, 0, width, 0, 1);
    let colorC = lerpColor(colorA, colorB, pos);
    fill(colorC)

    push();
    //in die mitte des rechtecks schieben
    translate(j * breite+breite/2 , breite/2);
  
    //let winkel= map(j * breite, 0, width, 0, 180);

    //oder winkel mit lerp rechnen
    winkel = lerp(winkel, 135, 0.05)
    rotate(winkel);
    
   
   
    

    //mit sinusfunktion vergrössern 
    let w = map(j * breite, 0, width, 0, 180);
    let s = sin(w); //sinus von -1 zu 1
    s = (s + 1.1) * 2//s geht nun von 0.4 bis 4
    scale(s);
    translate(- breite/ 2, -breite/2);
    //rect(0, 0, breite, breite);
    // statt rechteck bezier
    let t=map(j * breite, 0, width, 0.5, 2);
    zeichneBezierShape(t);
    pop();
    

  }
  pop();

  //bezier nach Shiffman
  //https://editor.p5js.org/codingtrain/sketches/Z53a719cQ

  // zeichneSimpleBezier()
 
}


function zeichneSimpleBezier(){
  stroke(0);
  strokeWeight(24);
  point(0, 300);
  point(mouseX, mouseY);
  point(400, 400);
  point(600, 300);

  strokeWeight(4);
  noFill();
  bezier(0, 300, mouseX, mouseY, 400, 400, 600, 300);

  strokeWeight(2);
  line(0, 300, mouseX, mouseY);
  line(400, 400, 600, 300);
}


function zeichneBezierShape(t){
 
  //rechne die punkte abhängig von t und breite
  //O/O Koordinate in der Ecke
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

  //zeichnet die Grundform, anhand von vier Bezierkurven, jeweils mit anchor, control, control, anchor
  beginShape();
  vertex(x1,y1);
  bezierVertex(cx11,cy11,cx21,cy21,x2,y2);
  bezierVertex(cx22,cy22,cx31,cy31,x3,y3);
  bezierVertex(cx32,cy32,cx41,cy41,x4,y4);
  bezierVertex(cx42,cy42,cx12,cy12,x1,y1); 
  endShape();
}