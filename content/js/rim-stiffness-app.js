const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

// const recordStrike = async () => {
async function recordStrike(button, dest) {

  // Button stuff
  console.log('start recording')
  button.disabled = true;

  const recorder = await recordAudio();
  recorder.start();
  await sleep(3000);
  radSample = await recorder.stop();

  // Button stuff
  console.log('stop recording')
  button.disabled = false;
}

async function playStrike(button, src) {

  console.log('start playback');
  button.disabled = true;

  src.play();
  await sleep(3000);

  console.log('stop playback');
  button.disabled = false;

}

var radSample;
var latSample;

$(function() {
  console.log('JQuery enabled');

  $('#recordRadial').click(function() {recordStrike(this, radSample);});

  $('#playRadial').click(function() {playStrike(this, radSample);});

})
