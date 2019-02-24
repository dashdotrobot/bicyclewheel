
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
var fftArray = new Float32Array(bufferLength);
var freq = new Float32Array(bufferLength);
arrayRange(freq, 0, 44100./fftSize);

// Plot stuff
var drawVisual;

var canvasRad = document.getElementById('canvasRad')
var ctxRad = canvasRad.getContext('2d');

var canvasLat = document.getElementById('canvasLat');
var ctxLat = canvasLat.getContext('2d');

var WIDTH = canvasRad.width;
var HEIGHT = canvasRad.height;

ctxRad.fillStyle = 'rgb(255, 255, 255)';
ctxRad.fillRect(0, 0, WIDTH, HEIGHT);

function startRecording(ctx, linecolor) {

  if (navigator.getUserMedia) {
     console.log('getUserMedia supported.');
     navigator.getUserMedia (
        // constraints - only audio needed for this app
        {
           audio: true
        },

        // Success callback
        function(stream) {
          audioCtx.resume().then(function() {

            source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            visualize(ctx, linecolor);

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

  window.cancelAnimationFrame(drawVisual);

}

function visualize(ctx, linecolor) {

  console.log('started');

  function draw() {

    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(fftArray);

    // Draw
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // 
    // 

    ctx.lineWidth = 2;
    ctx.strokeStyle = linecolor;

    ctx.beginPath();

    var x = 0;
    var y = HEIGHT * (1.0 - (fftArray[0] + 150.)/140.);
    var dx = WIDTH * 1.0 / truncLength;

    ctx.moveTo(x, y);

    for(var i=1; i < truncLength; i++) {
      x += dx;
      y = HEIGHT * (1.0 - (fftArray[i] + 150.)/140.);
      ctx.lineTo(x, y);
    }

    ctx.stroke();

  }

  draw();

}

$(function() {
  console.log('JQuery enabled');

  $('#startRad').click(function() {
    startRecording(ctxRad, 'rgb(213, 39, 40)');
  });

  $('#startLat').click(function() {
    startRecording(ctxLat, 'rgb(31, 119, 180)');
  });

  $('.stop-record').click(function() {
    stopRecording();
  });

})
