/** DrawingTools.tsx
 * Contains functionality and format for the color picker,
 * line width slider, undo button, and clear button
 * 
 * Styled from Canvas.css
 * 
 * 
 */

import React from "react";
import "../Styles/Canvas.css";

/**
 * Dynamic properties for all tools
 * lineWidth: read from slider, controls line width
 * color: hexcode value, selected from color picker, changes line color
 * onColorChange: listens for color changes
 * onLineWidthChange: listens for slider change
 * onClearCanvas: listens for clear button press
 * onUndo: listens for undo button press 
 */
interface DrawingToolsProps {
  lineWidth: number;
  color: string;
  onColorChange: (color: string) => void;
  onLineWidthChange: (width: number) => void;
  onClearCanvas: () => void;
  onUndo: () => void;
}

const DrawingTools: React.FC<DrawingToolsProps> = ({
  lineWidth,
  color,
  onColorChange,
  onLineWidthChange,
  onClearCanvas,
  onUndo,
}) => {
  return (
    //All tools in on container "tools-container"
    <div className="tools-container">
      <div className="canvas-tools colorPick">
        {/**Color picker */}
        <label htmlFor="colorPicker">Choose Color: </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
      <div className="canvas-tools slider">
        {/**Line width slider */}
        <label htmlFor="lineWidthSlider">Line Width: </label>
        <input
          type="range"
          id="lineWidthSlider"
          min="1"
          max="60"
          value={lineWidth}
          onChange={(e) => onLineWidthChange(parseInt(e.target.value))}
        />
        <span>{lineWidth}</span>
      </div>
      <div className="canvas-tools">
        {/**Buttons for undo and clear, dynamically updates on page */}
        <button className="drawingToolButton" onClick={onUndo}>Undo</button>
        <button className="drawingToolButton" onClick={onClearCanvas}>Clear</button>
        
      </div>
    </div>
  );
};

export default DrawingTools;
