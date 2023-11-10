import React from 'react';
import '../Styles/Caption.css'; // Import your CSS file

interface Props {
  text: string;
}

const Caption = ({ text }: Props) => {
  return (
    <div className="caption-container">
      <textarea
        className="caption-textbox"
        placeholder="Caption your masterpiece here!"
        rows={4}
        cols={20}
      ></textarea>
      <label className="caption-label">{text}</label>
    </div>
  );
};

export default Caption;
