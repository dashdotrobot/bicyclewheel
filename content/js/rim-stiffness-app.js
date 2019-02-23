
function arrayRange(start, stop, stride) {
  var x = [];
  for (var i=start; i < stop; i+=stride) {
    x.push(i);
  }
  return x;
}

navigator.getUserMedia = (navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia);

// set up forked web audio context, for multiple browsers
// window. is needed otherwise Safari explodes

var fftSize = 32768; // 2^15

var drawVisual;

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var analyser = audioCtx.createAnalyser();
analyser.fftSize = fftSize;
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.8;

var bufferLength = analyser.frequencyBinCount;

var fftArray = new Float32Array(bufferLength);

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
           // visualize();

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

  analyser.getFloatFrequencyData(fftArray);

  freq = arrayRange(0, 44100./2., 44100./fftSize);

  var plot_canvas = document.getElementById('plotCanvas');

  var trace = {
    x: freq.slice(1, 1000),
    y: fftArray.slice(1, 1000)
  };

  Plotly.newPlot(plot_canvas, [trace]);

}


// function visualize() {
//   console.log('started');

//   // Initialize totalArray
//   analyser.getFloatFrequencyData(totalArray);

//   function draw() {

//     drawVisual = requestAnimationFrame(draw);

//     analyser.getFloatFrequencyData(dataArray);

//     for (var i = 0; i < bufferLength; i++) {
//       totalArray[i] = totalArray[i] + dataArray[i];
//     }
//     nAvgs += 1.;
//   }

//   draw();

// }

$(function() {
  console.log('JQuery enabled');

  $('#start').click(function() {
    startRecording();
  });

  $('#stop').click(function() {
    stopRecording();
  });

})
