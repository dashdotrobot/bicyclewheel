
navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var audioCtx;
var analyser;

var bufferLength;

var totalArray;
var dataArray;
var nAvgs = 0.;

var drawVisual;

function startRecording(button) {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 32768;
  analyser.minDecibels = -90;
  analyser.maxDecibels = -10;
  analyser.smoothingTimeConstant = 0.85;

  bufferLength = analyser.frequencyBinCount;

  totalArray = new Float32Array(bufferLength);
  dataArray = new Float32Array(bufferLength);

  if (navigator.getUserMedia) {
     console.log('getUserMedia supported.');
     navigator.getUserMedia (
        // constraints - only audio needed for this app
        {
           audio: true
        },

        // Success callback
        function(stream) {
           source = audioCtx.createMediaStreamSource(stream);
           source.connect(analyser);
           visualize();
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

function stopRecording(button) {

  window.cancelAnimationFrame(drawVisual);

  console.log(dataArray);
  console.log(nAvgs);
  console.log(totalArray);

  for (var i = 0; i < bufferLength; i++) {
    totalArray[i] = totalArray[i] / nAvgs;
  }

  console.log(totalArray);

  nAvgs = 0;

  var plot_canvas = document.getElementById('plotCanvas');

  var trace = {
    y: dataArray.slice(1, 1000)
  };

  Plotly.newPlot(plot_canvas, [trace]);
  
}


function visualize() {
  console.log('started');

  // Initialize totalArray
  analyser.getFloatFrequencyData(totalArray);

  function draw() {

    console.log(nAvgs);

    drawVisual = requestAnimationFrame(draw);

    analyser.getFloatFrequencyData(dataArray);

    for (var i = 0; i < bufferLength; i++) {
      totalArray[i] = totalArray[i] + dataArray[i];
    }
    nAvgs += 1;
  }

  draw();

}

$(function() {
  console.log('JQuery enabled');

  $('#start').click(function() {startRecording(this);});

  $('#stop').click(function() {stopRecording(this);});

})
