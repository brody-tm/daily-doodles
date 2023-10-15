  // Get the canvas element and its context
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  // Variables to track drawing state
  var isDrawing = false;
  var lastX = 0;
  var lastY = 0;
  var lineWidth = 4; //inital line width
  var undoStack = []; //Stack holding past edits
  var currentLine = []; //Array to store the line being drawn
  var currentLayer = null; // The current drawing layer

  // Event listeners to handle mouse and touch events
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  // Function to start drawing
  function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = getMousePos(canvas, e);
      // Create a new layer with the current line width
      currentLayer = {
        lineWidth,
        segments: []
      };
      currentLayer.segments.push([lastX, lastY]);
  }
 
  // Function to draw on the canvas
  function draw(e) {
      if (!isDrawing) return;

      var [x, y] = getMousePos(canvas, e);

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = colorPicker.value; // Set the stroke color
      ctx.lineWidth = lineWidth;       // Set the line width
      ctx.lineCap = 'round';   // Set the line cap style
      ctx.stroke();

      //Store line segments to the stack
      currentLayer.segments.push([x, y]);
      [lastX, lastY] = [x, y];
  }

  // Function to stop drawing
  function stopDrawing() {
      isDrawing = false;
      // Store the current layer in the undo stack when drawing is done
      undoStack.push(currentLayer);
  }

  // Function to get mouse position on the canvas
  function getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;

      return [
          (e.clientX - rect.left) * scaleX,
          (e.clientY - rect.top) * scaleY
      ];
  }

  var colorPicker = document.getElementById('colorPicker');
  var lineWidthSlider = document.getElementById('lineWidthSlider');
  var clearButton = document.getElementById('clearButton');
  var undoButton = document.getElementById('undoButton');
  
  
  // Event listener for the "Clear" button click
clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
 // Event listener for the slider input
 lineWidthSlider.addEventListener('input', function () {
    lineWidth = parseInt(lineWidthSlider.value);
 });
// Event listener for the "Undo" button click
undoButton.addEventListener('click', function () {
    if (undoStack.length > 0) {
        // Remove the most recently drawn layer from the stack
        undoStack.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw the remaining layers in the undo stack
        undoStack.forEach(function (layer) {
            ctx.strokeStyle = colorPicker.value;
            ctx.lineWidth = layer.lineWidth;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(layer.segments[0][0], layer.segments[0][1]);
            for (var i = 1; i < layer.segments.length; i++) {
                ctx.lineTo(layer.segments[i][0], layer.segments[i][1]);
            }
            ctx.stroke();
        });
    }
});