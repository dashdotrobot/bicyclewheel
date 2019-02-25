
function arrayRange(arr, start, step) {
  arr[0] = start;
  for (var i=1; i < arr.length; i+=1) {
    arr[i] = arr[i-1] + step;
  }
}

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes
navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();

var fftSize = 32768; // 2^15

analyser.fftSize = fftSize;
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.25;

var bufferLength = analyser.frequencyBinCount;
var truncLength = Math.round(bufferLength * 2*2000./44100.);
var fftRad = new Float32Array(bufferLength);
var fftLat = new Float32Array(bufferLength);
var freq = new Float32Array(bufferLength);
arrayRange(freq, 0, 44100./fftSize);

var recording = false;

// Button stuff
var radButton = document.getElementById('startRad');
var latButton = document.getElementById('startLat');

// Plot stuff
var drawVisual;

var canvasDiv = document.getElementById('canvasDiv');

var canvasRad = document.getElementById('canvasRad');
var ctxRad = canvasRad.getContext('2d');

var canvasLat = document.getElementById('canvasLat');
var ctxLat = canvasLat.getContext('2d');

function startRecording(canvas, ctx, linecolor, fft) {

  if (navigator.getUserMedia) {
     console.log('getUserMedia supported.');
     navigator.getUserMedia (
        // constraints - only audio needed for this app
        {audio: true},

        // Success callback
        function(stream) {
          audioCtx.resume().then(function() {

            source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            animateFFT(canvas, ctx, linecolor, fft);
          });
        },

        // Error callback
        function(err) {
           console.log('The following gUM error occured: ' + err);
        }
     );
  } else {
     console.log('getUserMedia not supported on your browser!');
  }
}

function stopRecording() {

  console.log('stopped');
  recording = false;
  window.cancelAnimationFrame(drawVisual);

}

function drawFFT(ctx, width, height, linecolor, fft) {

  ctx.clearRect(0, 0, width, height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = linecolor;

  var x = 0;
  var y = height * (1.0 - (fft[0] + 150.)/140.);
  var dx = width * 1.0 / truncLength;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for(var i=1; i < truncLength; i++) {
    x += dx;
    y = height * (1.0 - (fft[i] + 150.)/140.);
    ctx.lineTo(x, y);
  }

  ctx.stroke();

}

function animateFFT(canvas, ctx, linecolor, fft) {

  console.log('started');
  recording = true;

  // Set canvas width and height
  var width = canvasDiv.clientWidth;
  var height = canvasDiv.clientHeight;

  console.log(width);
  console.log(height);

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(fft);
    drawFFT(ctx, width, height, linecolor, fft)
  }

  draw();

}

$(function() {
  console.log('JQuery enabled');

  $('#startRad').click(function() {
    if (recording) {
      // Stop recording
      stopRecording();
      radButton.innerText = 'Record radial';
      latButton.disabled = false;
    } else {
      // Start recording
      startRecording(canvasRad, ctxRad, 'rgb(213, 39, 40)', fftRad);  
      radButton.innerText = 'Stop radial';
      latButton.disabled = true;
    }
  });

  $('#startLat').click(function() {
    if (recording) {
      // Stop recording
      stopRecording();
      latButton.innerText = 'Record lateral';
      radButton.disabled = false;
    } else {
      // Start recording
      startRecording(canvasLat, ctxLat, 'rgb(31, 119, 180)', fftLat);
      latButton.innerText = 'Stop lateral';
      radButton.disabled = true;
    }
  });

})
