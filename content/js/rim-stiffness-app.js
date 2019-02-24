
function arrayRange(arr, step) {
  arr[0] = 0;
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
analyser.smoothingTimeConstant = 0.1;

var bufferLength = analyser.frequencyBinCount;
var fftArray = new Float32Array(bufferLength);
var freq = new Float32Array(bufferLength);
arrayRange(freq, 44100./fftSize);

// Plot stuff
var drawVisual;
var plot_canvas = document.getElementById('plotCanvas');
var trace = [{
  x: freq,
  y: fftArray
}];
var layout = {
  xaxis: {
    range: [0., 1000.]
  },
  yaxis: {
    range: [-150, -10]
  }
}

Plotly.newPlot(plot_canvas, trace, layout);


function startRecording() {

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

            visualize();

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

  window.cancelAnimationFrame(drawVisual);

}


function visualize() {
  console.log('started');

  function draw() {

    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(fftArray);

    Plotly.restyle(plot_canvas, {y: fftArray});

  }

  draw();

}

$(function() {
  console.log('JQuery enabled');

  $('#start').click(function() {
    startRecording();
  });

  $('#stop').click(function() {
    stopRecording();
  });

})
