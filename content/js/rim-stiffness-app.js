
// Utility functions
function arrayRange(arr, start, step) {
  // Populate the given array arr with linearly-spaced values
  arr[0] = start;
  for (var i=1; i < arr.length; i+=1) {
    arr[i] = arr[i-1] + step;
  }
}

// Classes for draggable frequency bars

// FreqBar: Draggable reference bar to select a frequency
function FreqBar(f, y_flag, color) {
  this.f = f || 0;
  this.y_flag = y_flag || 50;
  this.color = color || '#000000';

  this.FLAG_WIDTH = 30;
  this.FLAG_HEIGHT = 10;
}

FreqBar.prototype.draw = function(ctx) {
  // Draw the frequency bar and selector flag on ctx

  // Draw the line
  // ...

  // Draw the selector flag
  // ...
}

FreqBar.prototype.isClicked = function(x, y) {
  // Determine of the coordinates x,y are located on the selector flag
  return (this.f <= x) && (this.f + this.FLAG_WIDTH >= x) &&
         (this.y_flag - this.FLAG_HEIGHT <= y) && (this.y_flag + this.FLAG_HEIGHT >= y);
}

// CanvasObj: 
// Borrowed heavily from Simon Sarris - www.simonsarris.com
function CanvasObj(canvas) {
  this.canvas = canvas;
  this.height = canvas.height;
  this.width = canvas.width;
  this.ctx = canvas.getContext('2d');

  // Get proper mouse coordinate when canvas has padding or border
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }

  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // Store "this" in a named variable
  var me = this;

  // State variables
  me.dragging = false;

  canvas.addEventListener('mousedown', function(e) {
    // To Do
    console.log('mouse down');
    me.dragging = true;
  }, true);

  canvas.addEventListener('mousemove', function(e) {
    // To Do
    if (me.dragging) {
      console.log('--mouse move');
    }
  }, true);

  canvas.addEventListener('mouseup', function(e) {
    // To Do
    console.log('mouse up');
    me.dragging = false;
  }, true);
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

var canvasRadObj;
var canvasLatObj;

// Frequency selector stuff
var dragging = false;

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

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  // Inner function for the refresh loop
  function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(fft);
    drawFFT(ctx, width, height, linecolor, fft)
  }

  draw();

}

// Setup button callbacks when ready
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

  canvasRadObj = CanvasObj(canvasRad);

  // canvasRad.addEventListener('mousedown', function(e) {
  //   console.log('mouse pressed');
  //   dragging = true;
  // })

  // canvasRad.addEventListener('mousemove', function(e) {
  //   if (dragging) {
  //     console.log('--mouse moved');
  //   }
  // })

  // canvasRad.addEventListener('mouseup', function(e) {
  //   console.log('mouse released');
  //   dragging = false;
  // })



})
