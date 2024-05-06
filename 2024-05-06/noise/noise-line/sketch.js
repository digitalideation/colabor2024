function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}

function draw() {
  // Calculate the coordinates.
  let x = width * noise(0.008 * frameCount);
  let y = height * noise(0.008 * frameCount + 10000);

  // Draw the point.
  strokeWeight(3);
  point(x, y);
  background(200, 20)
}
