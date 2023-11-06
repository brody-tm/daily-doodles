import React from 'react';

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
    <div style={{ border: '1px solid lightgray', background: 'lightgray', padding: '10px', borderRadius: '5px' }}>
      <div>
        <label htmlFor="colorPicker">Choose Color: </label>
        <input
          type="color"
          id="colorPicker"
          value={color}
          onChange={(e) => onColorChange(e.target.value)}
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
          onChange={(e) => onLineWidthChange(parseInt(e.target.value))}
        />
        <span>{lineWidth}</span>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={onUndo}>Undo</button>
        <button onClick={onClearCanvas}>Clear</button>
      </div>
    </div>
  );
};

export default DrawingTools;
