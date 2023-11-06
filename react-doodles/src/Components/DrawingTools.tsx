import React from 'react';
import './Canvas.css'

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
    <div className="tools-container">
      <div className="canvas-tools">
        <label htmlFor="colorPicker">Choose Color: </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
      <div className="canvas-tools">
        <label htmlFor="lineWidthSlider">Line Width: </label>
        <input
          type="range"
          id="lineWidthSlider"
          min="1"
          max="30"
          value={lineWidth}
          onChange={(e) => onLineWidthChange(parseInt(e.target.value))}
        />
        <span>{lineWidth}</span>
      </div>
      <div className="canvas-tools">
        <button onClick={onUndo}>Undo</button>
        <button onClick={onClearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default DrawingTools;
