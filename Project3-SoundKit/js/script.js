document.addEventListener('DOMContentLoaded', appStart);

// tablica dzwięków dla kawiszy od [1-9]
const sounds = {
  49: "boom",
  50: "clap",
  51: "hihat",
  52: "kick",
  53: "openhat",
  54: "ride",
  55: "snare",
  56: "tink",
  57: "tom",
}

// tablie kanałów do zapisania dzwięków
const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];

// pomocnicze zmienne
let recording = false;
let recStart = 0;

// metoda ktora uruchamia sie na starcie
function appStart() {
  window.addEventListener('keypress', playSound);
  document.querySelector('#rec1').addEventListener('click', recAudio1);
  document.querySelector('#rec2').addEventListener('click', recAudio2);
  document.querySelector('#rec3').addEventListener('click', recAudio3);
  document.querySelector('#rec4').addEventListener('click', recAudio4);
  document.querySelector('#play').addEventListener('click', playAudio);
}

// nagrywanie kanału 1
var recAudio1 = (e) => {
  recStart = Date.now();
  recording = !recording

  if (recording) {
    e.target.innerHTML = "Stop"
    playAudio()
  } else {
    e.target.innerHTML = "Utwór 1 [Nagrano]"
  }
};

// nagrywanie kanału 2
var recAudio2 = (e) => {
  recStart = Date.now();
  recording = !recording

  if (recording) {
    e.target.innerHTML = "Stop"
    playAudio()
  } else {
    e.target.innerHTML = "Utwór 2 [Nagrano]"
  }
};

// nagrywanie kanału 3
var recAudio3 = (e) => {
  recStart = Date.now();
  recording = !recording

  if (recording) {
    e.target.innerHTML = "Stop"
    playAudio()
  } else {
    e.target.innerHTML = "Utwór 3 [Nagrano]"
  }
};

// nagrywanie kanału 4
var recAudio4 = (e) => {
  recStart = Date.now();
  recording = !recording

  if (recording) {
    e.target.innerHTML = "Stop"
    playAudio()
  } else {
    e.target.innerHTML = "Utwór 4 [Nagrano]"
  }
};

// odtworzenie kanałów
var playAudio = () => {
  channel1.forEach(sound => {
    setTimeout(
      () => {
        const audioDom = document.querySelector(`#${sound.name}`)
        audioDom.currentTime = 0
        audioDom.play()
      }, sound.time
    )
  });

  channel2.forEach(sound => {
    setTimeout(
      () => {
        const audioDom = document.querySelector(`#${sound.name}`)
        audioDom.currentTime = 0
        audioDom.play()
      }, sound.time
    )
  });

  channel3.forEach(sound => {
    setTimeout(
      () => {
        const audioDom = document.querySelector(`#${sound.name}`)
        audioDom.currentTime = 0
        audioDom.play()
      }, sound.time
    )
  });

  channel4.forEach(sound => {
    setTimeout(
      () => {
        const audioDom = document.querySelector(`#${sound.name}`)
        audioDom.currentTime = 0
        audioDom.play()
      }, sound.time
    )
  });
};

// funkcja odgrywajaca pojedynczy dzwiek po wcisnieciu przycisku
function playSound(e) {

  if (!sounds[e.charCode]) return

  const soundName = sounds[e.charCode]
  const audioDom = document.querySelector(`#${soundName}`)

  audioDom.currentTime = 0
  audioDom.play();

  if (recording) {
    var elems = document.getElementsByClassName('square')
    for (i = 0; i < elems.length; i++) {
      elems[i].style.boxShadow = "0px 3px 3px #ccc"
    }

    document.getElementsByName(soundName)[0].style.boxShadow = '0px 3px 3px #666'

    channel1.push({
        name: soundName,
        time: Date.now() - recStart
      }),
    channel2.push({
        name: soundName,
        time: Date.now() - recStart
      })
  }
}