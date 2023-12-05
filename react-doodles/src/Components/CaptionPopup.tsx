
/**
 * @file CaptionPopup.tsx
 * @description React component for a caption popup used for submitting post captions.
 * Styled from loginPopup.css
 */

import React, { useState } from "react";
import "../Styles/loginPopup.css";

/**
 * @interface CaptionPopupProps
 * @description Properties for the CaptionPopup component.
 * @property {() => void} onClose - Function to close the caption popup.
 * @property {(caption: string) => void} onCaptionSubmit - Function to submit the caption for a post.
 */
interface CaptionPopupProps {
  onClose: () => void;
  onCaptionSubmit: (caption: string) => void;
}

/**
 * @function CaptionPopup
 * @description Functional component for a caption popup.
 * @param {CaptionPopupProps} props - Properties for the CaptionPopup component.
 * @returns {JSX.Element} JSX element representing the caption popup.
 */
function CaptionPopup({ onClose, onCaptionSubmit }: CaptionPopupProps) {
  const [caption, setCaption] = useState("");

  /**
   * @function handleCaptionSubmit
   * @description Handles the submission of the caption.
   * Calls the onCaptionSubmit callback with the current caption and closes the popup.
   */
  const handleCaptionSubmit = () => {
    onCaptionSubmit(caption);
    onClose();
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
          onChange={(e) => setCaption(e.target.value)}
        />
        <button onClick={handleCaptionSubmit}>Submit Caption</button>
      </div>
    </div>
  );
}

export default CaptionPopup;
