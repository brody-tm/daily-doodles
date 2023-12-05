// CaptionPopup.tsx
import React, { useState } from "react";
import "../Styles/loginPopup.css";

interface CaptionPopupProps {
  onClose: () => void;
  onCaptionSubmit: (caption: string) => void;
}

function CaptionPopup({ onClose, onCaptionSubmit }: CaptionPopupProps) {
  const [caption, setCaption] = useState("");

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
