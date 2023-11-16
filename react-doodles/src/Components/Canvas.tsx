/**
 * Canvas.tsx
 * 
 * Handles the user drawing on the canvas
 * Defines the canvas area and functionality
 * Implements values from DrawingTools.tsx dynamically as the user changes them
 * Styled by Canvas.css
 */

import React, { useEffect, useRef, useState } from "react";
import DrawingTools from "./DrawingTools";
import "../Styles/Canvas.css";

//Properties of the canvas: height and width
interface CanvasProps {
  width: number;
  height: number;
}

//Passes canvas props into the function
const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  //Pulls values for line width, color, stack state, and drawing function
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#000");
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [drawingState, setDrawingState] = useState<ImageData | null>(null);
  let isDrawing = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    //Defines canvas properties
    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        let lastX = 0;
        let lastY = 0;
        //Captures state of canvas, pushes to stack 
        const saveCanvasState = () => {
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          setUndoStack((prevStack) => [...prevStack, imageData]);
        };

        //Handles user interaction with canvas, mouse down = drawing
        const handleMouseDown = (e: MouseEvent) => {
          isDrawing = true;
          lastX = e.offsetX;
          lastY = e.offsetY;
        };

        //Tracks mouse on canvas, changing the pixel color in the radius of the line width
        const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing) return;

          if (!context) return;

          //Line properties
          context.lineCap = "round";
          context.strokeStyle = color;
          context.lineWidth = lineWidth;
          //Line path on canvas
          context.beginPath();
          context.moveTo(lastX, lastY);
          context.lineTo(e.offsetX, e.offsetY);
          context.stroke();

          lastX = e.offsetX;
          lastY = e.offsetY;
        };

        //Ends drawing when mouse lifts, calls save state 
        const handleMouseUp = () => {
          isDrawing = false;
          saveCanvasState();
        };
        //Listeners for mouse controls
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        return () => {
          canvas.removeEventListener("mousedown", handleMouseDown);
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }
  }, [width, height, lineWidth, color]);

  /**const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };
  
  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(e.target.value));
  };
  */
  //Function to clear canvas on button press
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Reset the undo stack
      //setUndoStack([]);

      // Save the cleared canvas state
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingState(imageData);
    }
  };

    //Handles undo button press, reverrts to previous version daved in canvas stack
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");

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
  //HTML format of canvas on the page w/ drawing tools
  return (
    <div className="canvas-container">
      <div className="canvas-and-tools">
        <div className="drawing-tools">
          <DrawingTools
            lineWidth={lineWidth}
            color={color}
            onColorChange={setColor}
            onLineWidthChange={setLineWidth}
            onClearCanvas={handleClearCanvas}
            onUndo={handleUndo}
          />
        </div>
        <div className="canvas-center">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
              background: "white",
              border: "10px solid black",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
