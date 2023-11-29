import React, { useState } from 'react';
import '../Styles/Caption.css'; // Import your CSS file

interface Props {
  text: string;
  onTextChange: (text: string) => void;
}

const Caption = ({ text, onTextChange }: Props) => {
  const [captionText, setCaptionText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setCaptionText(newText);
    onTextChange(newText); // Call the callback function to notify the parent component
  };

  return (
    <div className="caption-container">
      <textarea
        className="caption-textbox"
        placeholder="Caption your masterpiece here!"
        rows={4}
        cols={20}
        value={captionText}
        onChange={handleTextChange}
      ></textarea>
      <label className="caption-label">{text}</label>
    </div>
  );
};

export default Caption;
