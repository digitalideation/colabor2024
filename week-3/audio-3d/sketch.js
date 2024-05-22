let mic;
let midi_out;
let midi_enabled = false


let img

function preload(){
  img = loadImage('desktop.png')
}

function setup() {
  let cnv = createCanvas(innerWidth - 10, innerHeight - 20, WEBGL);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  // ******************************************
  // ******************************************
  // ATTENTION IT CAN CREATE FEEDBACK!!!!!!
  // ONLY if VB cable is set as microphone!!!!
  mic.connect();
  // ******************************************
  // ******************************************
  fft = new p5.FFT(0.8, 128);
  fft.setInput(mic)


  // ******************************************
  // ******************************************
  // initialize midi 
  init_midi()
  // ******************************************
  // ******************************************
}


function draw() {
  background(0);

  // ******************************************
  // ******************************************
  // MIDI
  if (midi_enabled) {
    // within this if statement you can 
    // send midi notes and cc values
    if (frameCount % 60 === 0) {
      let value = round(random(127))
      send_note(value, 100);
    }
    
    let value2 = sin(frameCount * 0.1) * 127 // sin values
    value2 = round(value2) // remove floating point values
    value2 = abs(value2) // remove negative values
    send_cc(value2, 0);
    send_cc(round(value2 / 3), 1);
  }
  // ******************************************
  // ******************************************

  strokeWeight(1)
  lights()
  // noStroke()
  // fill(255, 0, 0)
  // normalMaterial()
  // ambientMaterial(255, 0, 0)
  specularMaterial(0, 0, 255)
  // text('tap to start', 0, -height/2);
  micLevel = mic.getLevel();
  // let y = height - micLevel * height * 20;
  // ellipse(width / 2, y, 10, 10);

  // ******************************************
  // spectrum analysis ARRAY contains from 16 to 1024 values
  // depending on setup above
  // all values are between 0 => 255
  let spectrum = fft.analyze();
  let value1 = spectrum[100]
  let value2 = spectrum[40]


  // ******************************************
  // 3D Elements
  texture(img)

  push()
  rotateY(frameCount * 0.01)
  sphere(width * 1.5)
  pop()

  push()
  translate(0, 0, 0)
  // rotateX(map(value1, 0, 255, 0, 2 * PI))
  rotateY(frameCount * 0.01)
  // rotateZ(frameCount * 0.034)
  sphere(map(value2, 0, 255, 100, 250))
  box(map(value1, 0, 255, 100, 5000))
  pop()

  

  // push()
  // translate(0, 0, 0)
  // box(100, 200, 50)
  // pop()
  // ******************************************
  // ******************************************
  // FFT analysis
  // let spectrum = fft.analyze();
  // let waves = fft.waveform()
  // noStroke();
  // fill('#3f3')
  // for (let i = 0; i < spectrum.length; i++) {
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h)
  // }
  // beginShape()

  // noFill()
  // stroke('#f3f')
  // strokeWeight(3)
  // for (let i = 0; i < waves.length; i++) {
  //   let x = map(i, 0, waves.length, 0, width);
  //   let y = map(waves[i], -1, 1, 0, height)
  //   vertex(x, y)
  // }
  // endShape()
  // ******************************************
  // ******************************************
}



// ******************************************
// ******************************************
// MIDI FUNCTIONS!

function send_cc(value, cc) {
  const val = parseInt(abs(value)) % 128
  midi_out.sendControlChange(cc, value);
  // console.log(`send midi cc: ${val}`);
}
function send_note(note, duration) {
  midi_out.playNote(note, { duration });
  // console.log(`send midi note: ${note}`);
}


function init_midi() {
  WebMidi
    .enable()
    .then(onEnabled)
    .catch(err => alert(err));

  function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.outputs.length < 1) {
      console.log("No device detected.");
    } else {
      WebMidi.outputs.forEach((device, index) => {
        console.log(`${index}: ${device.name}`);
      });
      // midi_out = WebMidi.outputs[0].channels[1]
      create_buttons()
    }
  }
}

function create_buttons() {
  for (let i = 0; i < WebMidi.outputs.length; i++) {
    const midi = WebMidi.outputs[i];
    let btn = createButton(midi.name);
    btn.position(50, 40 * (i + 1));
    btn.mousePressed(() => {
      midi_out = midi.channels[1];
      console.log(`midi port selected: ${midi.name}`);
      removeElements()
      midi_enabled = true
    })
  }
}
// ******************************************
// ******************************************