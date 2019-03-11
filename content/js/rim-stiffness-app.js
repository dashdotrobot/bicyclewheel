
// Utility functions
function arrayRange(arr, start, step) {
  // Populate the given array arr with linearly-spaced values
  arr[0] = start;
  for (var i=1; i < arr.length; i+=1) {
    arr[i] = arr[i-1] + step;
  }
}

// Classes for draggable frequency bars

// FreqFlag: Draggable reference bar to select a frequency
function FreqFlag(dof, n, x, y, color, update_fxn, valid_fxn) {
  this.dof = dof || 'radial';  // 'radial' or 'lateral'
  this.n = n || 2;             // integer mode number

  this.x = x || 0;
  this.y = y || 50;
  this.color = color || '#000000';

  this.FLAG_WIDTH = 30;
  this.FLAG_HEIGHT = 10;

  this.visible = true;

  this.update = update_fxn || function () {};
  this.valid = valid_fxn || function() {return true;};
}

FreqFlag.prototype.calcF = function() {
  return this.x / this.canvas.width * 44100 * truncLength/bufferLength;
}

FreqFlag.prototype.calcF2 = function() {
  // For radial only: calculate f_2 based on current position (x)
  return this.calcF() * 6/Math.sqrt(5) * Math.sqrt(this.n**2 + 1)/(this.n*(this.n**2 - 1));
}

FreqFlag.prototype.moveToF = function(f) {
  var x = f/44100 * this.canvas.width * bufferLength/truncLength;
  this.x = x;
}

FreqFlag.prototype.draw = function() {
  if (this.visible) {
    ctx = this.canvas.ctx;

    // Draw frequency bar
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, 0);
    ctx.lineTo(this.x, this.canvas.height);
    ctx.stroke();

    // Draw the selector flag
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.FLAG_WIDTH, this.FLAG_HEIGHT);
  }
}

FreqFlag.prototype.isClicked = function(x, y) {
  // Determine of the coordinates x,y are located on the selector flag
  return this.visible &&
         (this.x <= x) && (this.x + this.FLAG_WIDTH >= x) &&
         (this.y - this.FLAG_HEIGHT <= y) && (this.y + this.FLAG_HEIGHT >= y);
}

// CanvasObj: 
// Borrowed heavily from Simon Sarris - www.simonsarris.com
function CanvasObj(canvas) {
  this.canvas = canvas;

  // Set canvas width and height
  this.width = document.getElementById('canvasDiv').clientWidth;
  this.height = document.getElementById('canvasDiv').clientHeight;

  this.canvas.setAttribute('width', this.width);
  this.canvas.setAttribute('height', this.height);

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

  this.shapes = [];

  // State variables
  this.dragging = false;
  this.selection = null;
  this.dragOffX = 0;
  this.dragOffY = 0;

  // Store "this" in a named variable
  var me = this;

  canvas.addEventListener('mousedown', function(e) {
    var m = me.getMouse(e);

    for (var i=0; i < me.shapes.length; i++) {
      if (me.shapes[i].isClicked(m.x, m.y)) {
        me.selection = me.shapes[i];
        me.dragOffX = m.x - me.selection.x;
        me.dragOffY = m.y - me.selection.y;
        me.dragging = true;
        return;
      }
    }
    me.selection = null;

  }, true);

  canvas.addEventListener('mousemove', function(e) {
    if (me.dragging) {
      var m = me.getMouse(e);
      x_new = m.x - me.dragOffX;
      y_new = m.y - me.dragOffY;

      if (me.selection.valid(x_new, y_new)) {
        me.selection.x = m.x - me.dragOffX;
        me.selection.y = m.y - me.dragOffY;
        me.selection.update();
      }

      updateStiffness();

      me.draw();
    }
  }, true);

  canvas.addEventListener('mouseup', function(e) {
    me.selection = null;
    me.dragging = false;
  }, true);
}

CanvasObj.prototype.drawFFT = function(linecolor, fft) {
  var ctx = this.ctx;

  ctx.lineWidth = 1;
  ctx.strokeStyle = linecolor;

  var x = 0;
  var y = this.height * (1.0 - (fft[0] + 150.)/140.);
  var dx = this.width * 1.0 / truncLength;

  ctx.beginPath();
  ctx.moveTo(x, y);

  for(var i=1; i < truncLength; i++) {
    x += dx;
    y = this.height * (1.0 - (fft[i] + 150.)/140.);
    ctx.lineTo(x, y);
  }

  ctx.stroke();
}

CanvasObj.prototype.draw = function() {
  var ctx = this.ctx;

  // Clear canvas
  ctx.clearRect(0, 0, this.width, this.height)

  // Draw FFTs
  this.drawFFT('rgb(213, 39, 40)', fftRad);
  this.drawFFT('rgb(31, 119, 180)', fftLat);

  // Draw frequency bars
  for (var i=0; i < this.shapes.length; i++) {
    this.shapes[i].draw();
  }
}

CanvasObj.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;

  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}

CanvasObj.prototype.addFreqFlag = function(bar) {
  bar.canvas = this;
  this.shapes.push(bar);
  this.draw();
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

// Button stuff
var radButton = document.getElementById('startRad');
var latButton = document.getElementById('startLat');

// State stuff
var recording = false;
var drawVisual;
var canvas;

var mu = 0.3;

var rad_update_fxn = function() {
  f2 = this.calcF2();

  // Update the other radial flags
  for (var i=0; i < b_rad.length; i++) {
    if (b_rad[i] != this) {
      var n = b_rad[i].n;
      b_rad[i].moveToF(f2 * Math.sqrt(5)/6 * n*(n**2 - 1)/Math.sqrt(n**2 + 1));
    }
  }
}

var b_rad = [new FreqFlag('radial', 2, 50, 30, '#d52728', rad_update_fxn),
             new FreqFlag('radial', 3, 100, 40, '#d52728', rad_update_fxn),
             new FreqFlag('radial', 4, 150, 50, '#d52728', rad_update_fxn)];

var b_lat_3 = new FreqFlag('lateral', 3, 105, 45, '#1f77b4');
var b_lat_2 = new FreqFlag('lateral', 2, 55, 35, '#1f77b4', function() {
  f2_lat = this.calcF();
  f3_lat = f2_lat * 24./6.*Math.sqrt(mu*4 + 1)/Math.sqrt(mu*9 + 1)
  b_lat_3.moveToF(f3_lat);
});

// Frequency selector stuff
var dragging = false;

function startRecording(fft) {

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

            animateFFT(fft);
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

function animateFFT(fft) {

  console.log('started');
  recording = true;

  // Inner function for the refresh loop
  function draw() {
    drawVisual = requestAnimationFrame(draw);
    analyser.getFloatFrequencyData(fft);

    canvas.draw();
  }

  draw();
}

function updateStiffness() {
  var radius = parseFloat($('#diameter').val())/2000.;  // [meters]
  var mass = parseFloat($('#mass').val())/1000.;      // [kg]

  var f2_rad = b_rad[0].calcF2();
  var f2_lat = b_lat_2.calcF();
  var f3_lat = b_lat_3.calcF();

  EI_rad = f2_rad**2 * 5./36. * 2*Math.PI*radius**3*mass;

  mu = (16. - (f3_lat/f2_lat)**2)/(9.*(f3_lat/f2_lat)**2 - 64.);
  GJ = f2_lat**2 * (4.*mu + 1.)/18. * Math.PI*radius**3*mass;
  EI_lat = GJ / mu;

  $('#radStiff').val(Math.round(EI_rad).toString());
  $('#latStiff').val(Math.round(EI_lat).toString());
  $('#torStiff').val(Math.round(GJ).toString());
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
      startRecording(fftRad);
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
      startRecording(fftLat);
      latButton.innerText = 'Stop lateral';
      radButton.disabled = true;
    }
  });

  canvas = new CanvasObj(document.getElementById('canvas'))
  canvas.addFreqFlag(b_rad[0]);
  canvas.addFreqFlag(b_rad[1]);
  canvas.addFreqFlag(b_rad[2]);
  canvas.addFreqFlag(b_lat_2);
  canvas.addFreqFlag(b_lat_3);

})
