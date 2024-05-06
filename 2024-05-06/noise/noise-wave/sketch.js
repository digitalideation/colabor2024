function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(1)
}

function draw() {
  background(200);
  translate(-frameCount, 0)

  let waveScale = frameCount * 0.003;
  let colorMultiplier = 2;
  
  for (let x = frameCount; x <= width + frameCount; x += 1) {
    const xScale = x * 0.001;
    stroke(
      255 * noise(xScale * colorMultiplier),
      255 * noise(xScale * colorMultiplier + 100),
      155 * noise(xScale * colorMultiplier + 200) + 100);
    line(x, height, x, height * noise(xScale, waveScale));
  }
}