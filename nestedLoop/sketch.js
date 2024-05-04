let breiteX = 200;
let anzahlX;

let hoeheY = 60;
let anzahlY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  anzahlX = width / breiteX;
  anzahlY = height / hoeheY;
}

function draw() {
  background(0);

  //Einfacher Loop, der eine Funktion aufruft, die selber einen Loop enthält
  /*for(let j=0;j<anzahlY;j++){
    zeichneZeile(j);
  }*/




  // Nested (verschachtelter) Loop
  for (let j = 0; j < anzahlY; j++) {
    //zeichneZeile(j);
    for (let i = 0; i < anzahlX; i = i + 1) {
      rect(i * breiteX, j * hoeheY, breiteX/(i+1), hoeheY);

    }
  }





}


function zeichneZeile(faktor) {
  for (let i = 0; i < anzahlX; i = i + 1) {
    rect(i * breiteX, faktor * hoeheY, breiteX, hoeheY);

  }
}