const original = document.querySelector('.left p')
const transformed = document.querySelector('.right p')
const rhymes = document.querySelector('#rhymes')

let og_text = ''
let split_text = null
let text_loaded = false

let pos_words_left = []
let pos_words_right = []

function load_text(txt) {
  for (let i = 0; i < txt.length; i++) {
    const t = txt[i];
    og_text += t + ' '
  }
  text_loaded = true
  original.innerHTML = highlight_nouns(og_text)
  pos_words_left = document.querySelectorAll('div.left p.txt span.word')
  console.log(pos_words_left);
}

function highlight_nouns(txt) {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    // console.log(RiTa.pos(word));
    if (RiTa.pos(word)[0] === 'nn') {
      html_txt += make_span(word, '#0f0') + ' '
    } else {
      html_txt += word + ' '
    }
  }
  return html_txt
}

// ignore this for now
rhymes.addEventListener('click', () => {
  console.log('click');
  if (text_loaded) {
    console.log('text loaded');
    rhyme_nouns()
  }
})

let was_it_rhymed = false
function rhyme_nouns() {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    let bar = ''
    let perc = round((i / txt_elements.length) * 100)
    for (let j = 0; j < perc; j+=2) {
      bar += '#'
    }
    bar += ` ${perc}%`
    console.log(bar);
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      let pos = RiTa.tagger.allTags(word)[0];
      const rhyme = RiTa.soundsLikeSync(word, { pos })
      if (rhyme.length > 0) {
        html_txt += make_span(random(rhyme), '#f00') + ' '
      } else {
        html_txt += make_span(word, '#00f') + ' '
      }
    } else {
      html_txt += word + ' '
    }
  }
  transformed.innerHTML = html_txt
  pos_words_right = transformed.querySelectorAll('span')
  console.log(pos_words_right);
  was_it_rhymed = true
}

function get_random(arr) {
  return random(arr)
}

// 'axhf;ohfo;uhf'
// "JKSHFSGDFLGsflgiuy"
// ``

function make_span(word, color) { //color = hex value
  return `<span class="word" style="color:${color}">${word}</span>`
}


function setup() {
  let canvas = createCanvas(innerWidth, innerHeight)
  canvas.parent('#p5')
  background(255)
  loadStrings('assets/txt/shelley.txt', load_text)
}

function draw() {
  background(255)
  for (let i = 0; i < pos_words_left.length; i++) {
    let span_left = pos_words_left[i]
    let left_x = span_left.getBoundingClientRect().x
    let left_y = span_left.getBoundingClientRect().y
    if (was_it_rhymed) {
      let span_right = pos_words_right[i]
      let right_x = span_right.getBoundingClientRect().x
      let right_y = span_right.getBoundingClientRect().y
      // console.log(left_x, left_y, right_x, right_y);
      line(left_x, left_y, right_x, right_y)
    }
  }
}

