let mic;
let midi_out;

  // Enable WEBMIDI.js and trigger the onEnabled() function when ready
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  // Function triggered when WEBMIDI.js is ready
  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.outputs.length < 1) {
      console.log("No device detected.");
    } else {
      WebMidi.outputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
      });
      midi_out = WebMidi.outputs[0].channels[1]
    }
  }

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 16);
  fft.setInput(mic)
}

function draw() {
  background(0);
  
  // if(frameCount % 10 === 0){
  //   const value = round(random(127))
  //   midi_out.sendControlChange(33, value);
  //   console.log(`send midi cc: ${value}`);
  // }
  text('tap to start', width / 2, 20);

  micLevel = mic.getLevel();
  let y = height - micLevel * height * 20;
  // console.log(y);
  ellipse(width / 2, y, 10, 10);


  let spectrum = fft.analyze();
  let waves = fft.waveform()
  noStroke();
  fill('#3f3')
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h)
    // if(frameCount % 10 === 0){
    //   const value = round(map(spectrum[i], 0, 255, 0, 127))
    //   midi_out.sendControlChange(i, value);
    //   // console.log(`send midi cc: ${value}`);
    // }
  }
  beginShape()
  
  noFill()
  stroke('#f3f')
  strokeWeight(3)
  for (let i = 0; i < waves.length; i++) {
    let x = map(i, 0, waves.length, 0, width);
    // let h = -height + map(waves[i], -1, 1, height, 0);
    let y = map(waves[i], -1, 1, 0, height)
    vertex(x, y)
    // point(x, y)
  }
  endShape()
  rectMode(CENTER)
  const w = map(spectrum[0], 0, 255, 0, width)
  const h = map(spectrum[4], 0, 255, 0, height)
  // rect(width / 2, 300, w, h)
  rectMode(CORNER)
}