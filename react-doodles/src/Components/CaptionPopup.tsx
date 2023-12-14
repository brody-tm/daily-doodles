/**
 * @file Canvas.tsx
 *
 * @description Defines a popup window component that is used for submitting drawings as posts
 */

import React, { useState } from "react";
import "../Styles/loginPopup.css";

/**
 * Props for interfacing with a CaptionPopup component
 */
interface CaptionPopupProps {
  /**
   * Callback function invoked when popup is closed
   */
  onClose: () => void;
  /**
   * Callback function that is invoked when popup's submit button is pressed
   */
  onCaptionSubmit: (caption: string) => void;
}

/**
 * Creates a popup window used for submitting a post with a caption
 *
 * @param onClose - function that will define the behavior of the popup when closed
 * @param onCaptionSubmit - function that will define the behavior of the popup when the submit button is hit
 *
 * @returns A new rendered caption popup window component
 */
function CaptionPopup({ onClose, onCaptionSubmit }: CaptionPopupProps) {
  const [caption, setCaption] = useState("");

  const handleCaptionSubmit = () => {
    onCaptionSubmit(caption);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit the input to 30 characters
    const inputValue = e.target.value.slice(0, 30);
    setCaption(inputValue);
  };

  return (
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Nice Post!</h2>
        <input
          type="text"
          placeholder="Title/Caption your post here!"
          value={caption}
          onChange={handleInputChange}
        />
        <button onClick={handleCaptionSubmit}>Submit Caption</button>
      </div>
    </div>
  );
}

export default CaptionPopup;
