import React, { useEffect, useRef, useState } from 'react';

interface CanvasProps {
  width: number;
  height: number;
}

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState('#000');
  const [undoStack, setUndoStack] = useState<ImageData[]>([]); // Store canvas state as ImageData
  const [drawingState, setDrawingState] = useState<ImageData | null>(null); // Added state to track drawing state
  let isDrawing = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        let lastX = 0;
        let lastY = 0;

        const saveCanvasState = () => {
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          setUndoStack((prevStack) => [...prevStack, imageData]);
        };

        const handleMouseDown = (e: MouseEvent) => {
          isDrawing = true;
          lastX = e.offsetX;
          lastY = e.offsetY;
          saveCanvasState(); // Save canvas state before drawing starts
        };

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing) return;

          if (!context) return;

          context.lineCap = 'round';
          context.strokeStyle = color;
          context.lineWidth = lineWidth;

          context.beginPath();
          context.moveTo(lastX, lastY);
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();

          lastX = e.offsetX;
          lastY = e.offsetY;
        };

        const handleMouseUp = () => {
          isDrawing = false;
          saveCanvasState(); // Save canvas state after drawing ends
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }
  }, [width, height, lineWidth, color]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(e.target.value));
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (canvas && context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Reset the undo stack
      setUndoStack([]);

      // Save the cleared canvas state
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingState(imageData);
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');

      if (canvas && context) {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        const previousState = undoStack.slice(0, -1); // Get all but the last state
        setUndoStack(previousState); // Update the stack without the last state

        if (previousState.length > 0) {
          // Redraw all states except the last one
          previousState.forEach((state) => {
            context.putImageData(state, 0, 0);
          });
        }
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ border: '1px solid lightgray', background: 'lightgray', padding: '10px', borderRadius: '5px' }}>
        <div>
          <label htmlFor="colorPicker">Choose Color: </label>
          <input
            type="color"
            id="colorPicker"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label htmlFor="lineWidthSlider">Line Width: </label>
          <input
            type="range"
            id="lineWidthSlider"
            min="1"
            max="30"
            value={lineWidth}
            onChange={handleLineWidthChange}
          />
          <span>{lineWidth}</span>
        </div>
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={handleClearCanvas}>Clear</button>
        </div>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ border: '1px solid black', background: 'white' }}
        />
      </div>
    </div>
  );
};


export default Canvas;
