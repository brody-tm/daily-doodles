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
  var canvasHistory = []; // Array stores canvas history
  var linePropsHist = []; //Stores line properties

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
      saveCanvasState();
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
      saveCanvasState();
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

  //Download Image
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 1342, 853);
  document.getElementById('download').addEventListener('click', 
      function(e) {
        let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
        console.log(canvasUrl);
        const createEl = document.createElement('a');
        createEl.href = canvasUrl;
        createEl.download = "download-this-canvas";
        createEl.click();
            createEl.remove();
        });

  var colorPicker = document.getElementById('colorPicker');
  var lineWidthSlider = document.getElementById('lineWidthSlider');
  var clearButton = document.getElementById('clearButton');
  var undoButton = document.getElementById('undoButton');
  
  
  // Event listener for the "Clear" button click
clearButton.addEventListener('click', function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

var lineWidthDisplay = document.getElementById('lineWidthDisplay');
lineWidthDisplay.textContent = lineWidth; // Initialize the display with the initial value

 // Event listener for the slider input
 lineWidthSlider.addEventListener('input', function () {
    lineWidth = parseInt(lineWidthSlider.value);
    lineWidthDisplay.textContent = lineWidth;
 });

// Event listener for the "Undo" button click
undoButton.addEventListener('click', function () {
    if (canvasHistory.length > 0) {
        canvasHistory.pop(); // Remove the last canvas state
        if (canvasHistory.length > 0) {
            var lastCanvasState = canvasHistory[canvasHistory.length - 1];
            var lastLineProperties = linePropsHist[linePropsHist.length - 1];

            var img = new Image();
            img.src = lastCanvasState;
            img.onload = function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                // Restore the line properties
                ctx.lineWidth = lastLineProperties.lineWidth;
                ctx.strokeStyle = lastLineProperties.strokeStyle;
                ctx.lineCap = lastLineProperties.lineCap;
            };

            // Remove the last line properties
            linePropsHist.pop();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
});
// Function to save the current canvas state and line properties
function saveCanvasState() {
    var canvasState = canvas.toDataURL();
    
    // Only save the canvas state if it's different from the previous one
    if (canvasHistory.length === 0 || canvasHistory[canvasHistory.length - 1] !== canvasState) {
        canvasHistory.push(canvasState);
        
        var lineProperties = {
            lineWidth: lineWidth,
            strokeStyle: ctx.strokeStyle,
            lineCap: ctx.lineCap
        };
        linePropertiesHistory.push(lineProperties);
    }
}
