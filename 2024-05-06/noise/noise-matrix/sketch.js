function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  noFill();

  let colorScale = 0.01
  background(
    255 * noise((frameCount + 2000) * colorScale),
    255 * noise( colorScale * (frameCount + 1000)),
    255 * noise(frameCount * colorScale)
  );

  let noiseLevel = 255;
  let noiseScale = 0.004;

  for (let y = 0; y < height + 10; y += 10) {
    for (let x = 0; x < width + 10; x += 10) {
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      let nt = noiseScale * frameCount;

      let c = noiseLevel * noise(nx, ny, nt);

      stroke(c);
      strokeWeight(5)
      square(x, y, 10 * noise(frameCount * 0.02, nx, ny))
    }
  }
}