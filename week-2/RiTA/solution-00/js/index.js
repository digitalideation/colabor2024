const original = document.querySelector('.left p')
const transformed = document.querySelector('.right p')
const rhymes = document.querySelector('#rhymes')

let og_text = ''
let split_text = null
let text_loaded = false
function load_text(txt) {
  for (let i = 0; i < txt.length; i++) {
    const t = txt[i];
    og_text += t + ' '
  }
  text_loaded = true
  original.innerHTML = highlight_nouns(og_text)
}

function highlight_nouns(txt) {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    console.log(RiTa.pos(word), RiTa.pos(word)[0] === 'nn');
    if (RiTa.pos(word)[0] === 'nn') {
      html_txt += make_span(word, '#33f', 'this is a noun') + ' '
    } else {
      html_txt += word + ' '
    }
  }
  return html_txt
}

rhymes.addEventListener('click', () => {
  if (text_loaded) {
    rhyme_nouns()
  }
})

function rhyme_nouns() {
  const txt_elements = RiTa.tokenize(og_text)
  console.log(txt_elements)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      let pos = RiTa.tagger.allTags(word)[0];
      const rhyme = RiTa.rhymesSync(word, {pos})
      if (rhyme.length > 0) {
        html_txt += make_span(random(rhyme), '#f33', `rhyme found for ${word}`) + ' '
      } else {
        html_txt += make_span(word, '#33f', 'rhyme not found') + ' '
      }
    } else {
      html_txt += word + ' '
    }
  }
  transformed.innerHTML = html_txt
}

function get_random(arr) {
  return random(arr)
}

function make_span(word, color, title) {
  return `<span class="word" style="color:${color}" title="${title}">${word}</span>`
}

function setup() {
  noCanvas()
  loadStrings('assets/txt/shelley.txt', load_text)
}

