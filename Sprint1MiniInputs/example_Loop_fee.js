// new file :)

function setup() {
    createCanvas(800,800);
    // frameRate(2);
    noLoop();
    
    background(255);

    backgroundCircles();
}

function backgroundCircles(){
    for (let x = 1; x < 801; x+=50) {
        for (let y = 1; y < 801; y+=50) {
            noStroke();
            fill(255,10+x/3,10+y/3); 
            ellipse(x,y,120,120);   
        }
    }
}

function sinCircle(x,y){
    let rad = 200;
    let mid_point = createVector(x,y);

  for (let a=0; a<=360; a+=5)
    {
        stroke(255,150,0);
        strokeWeight(10);
        let x = rad*sin(radians(a))+mid_point.x;
        let y = rad*cos(radians(a))+mid_point.y;
        point(x,y);
    }
}

function draw() {
    sinCircle(400,400);
     sinCircle(100,100);
     sinCircle(700,700);
    // sinCircle(100,700);
    // sinCircle(700,100);

}