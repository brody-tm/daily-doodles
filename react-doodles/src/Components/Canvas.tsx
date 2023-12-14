/**
 * @file Canvas.tsx
 *
 * @description Handles the user drawing on the canvas
 * Defines the canvas area and functionality
 * Implements values from DrawingTools.tsx dynamically as the user changes them
 * Styled by Canvas.css
 */

import React, { useEffect, useRef, useState, useContext } from "react";
import DrawingTools from "./DrawingTools";
import "../Styles/Canvas.css";
import "../Styles/Caption.css";
import CaptionPopup from "./CaptionPopup";
import { UserContext } from "../context/userContext";

/**
 * Properties of the canvas
 */
interface CanvasProps {
  /** Width of the canvas */
  width: number;
  /** Height of the canvas */
  height: number;
}
/**
 * Canvas component for drawing on an HTML canvas.
 *
 * @param width - the width of the canvas
 * @param height - the height of the canvas
 *
 * @returns New Canvas object with the specified width and height
 */
const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  // Pulls values for line width, color, stack state, and drawing function
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState("#000");
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [drawingState, setDrawingState] = useState<ImageData | null>(null);
  const [showCaptionPopup, setShowCaptionPopup] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [ImageURL, setImageURL] = useState("");
  let isDrawing = false;
  let userEnteredText = "";
  let ImgUrl = "";

  useEffect(() => {
    const canvas = canvasRef.current;

    // Set initial white background when component is mounted
    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Defines canvas properties
    if (canvas) {
      const context = canvas.getContext("2d");

      if (context) {
        let lastX = 0;
        let lastY = 0;

        /**
         * Captures the state of the canvas and pushes it to the stack.
         */
        const saveCanvasState = () => {
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          setUndoStack((prevStack) => [...prevStack, imageData]);
        };

        /**
         * Handles user interaction with canvas, mouse down = drawing
         *
         * @param e - The MouseEvent used to detect clicks
         */
        const handleMouseDown = (e: MouseEvent) => {
          isDrawing = true;
          lastX = e.offsetX;
          lastY = e.offsetY;
        };

        /**
         * Tracks mouse on canvas, changing the pixel color in the radius of the line width
         *
         * @param e - The MouseEvent used for tracking mouse movement
         */
        const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing) return;

          const context = canvas?.getContext("2d");

          if (context) {
            // Move these outside of the context checks
            context.lineCap = "round";
            context.strokeStyle = color;
            context.lineWidth = lineWidth;

            // Line path on canvas
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();

            lastX = e.offsetX;
            lastY = e.offsetY;
          }
        };

        /**
         * Ends drawing when mouse lifts, calls saveCanvasState()
         */
        const handleMouseUp = () => {
          isDrawing = false;
          saveCanvasState();
        };

        // Listeners for mouse controls
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
  });

  /**
   * Clears the canvas and sets the drawing state to an empty canvas.
   */
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Save the cleared canvas state
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingState(imageData);
    }
  };

  /**
   * Undoes the last drawing action by reverting to the previous canvas state.
   */
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

  /**
   * Saves the canvas as an image and triggers a download.
   */
  const handleSaveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "canvas_image.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  /**
   * Prepares the canvas image for posting, showing a caption popup.
   */
  const handlePostImage = async () => {
    try {
      setShowCaptionPopup(true);
      if (canvasRef.current) {
        setImageURL(canvasRef.current.toDataURL("image/jpeg", 0.8));
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const handleProfileImage = async () => {
    if (canvasRef.current) {
      ImgUrl = canvasRef.current.toDataURL("image/jpeg", 0.8);
      SetProfileData();
    }
  };
  const SetProfileData = async () => {
    // attempt to send the request
    try {
      const res = await fetch("http://localhost:8800/api/profile/pic", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"id": ${currentUser?.id}, "profile_image": "${ImgUrl}"}`,
      });

      console.log(res);
      // check response
      if (!res.ok) {
        throw new Error(`HTTP error on login: ${res.status}`);
      }
    } catch (err) {
      console.error("Error sending login request:", err);
    }
  };

  /**
   * Adds a post to the server with the entered caption and canvas image.
   */
  const addPost = () => {
    setShowCaptionPopup(true);

    if (canvasRef.current) {
      const postInfo = {
        desc: userEnteredText,
        body: ImageURL, //TODO
        user_id: currentUser!.id.toString(), //TODO - Should be the user's ID
      };

      fetch("http://localhost:8800/api/post/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(postInfo),
        credentials: "include",
      })
        .then((res) => res.text())
        .then((text) => console.log("Response from server:", text))
        .catch((error) => console.error("Error posting data:", error));
    }
  };

  /**
   * Handles the submission of the entered caption.
   * Saves the caption, adds the post, and closes the caption popup.
   *
   * @param {string} caption - The entered caption.
   */
  const handleCaptionSubmit = (caption: string) => {
    // Save the entered caption
    userEnteredText = caption;

    // You can send the caption to the backend or perform any other action
    console.log("Caption submitted:", caption);

    // Add the post logic here or call the existing addPost function
    addPost();

    // Close the caption popup
    setShowCaptionPopup(false);
  };

  return (
    <>
      <div className="canvas-container">
        <div className="canvas-and-tools">
          <div className="drawing-tools">
            {/* DrawingTools component for setting line width, color, and other options */}
            <DrawingTools
              lineWidth={lineWidth}
              color={color}
              onColorChange={setColor}
              onLineWidthChange={setLineWidth}
              onClearCanvas={handleClearCanvas}
              onUndo={handleUndo}
              onSaveCanvas={handleSaveCanvas}
              onPostClick={handlePostImage}
              onProfilePic={handleProfileImage}
            />
          </div>
          <div className="canvas-center">
            {/* Canvas element for drawing */}
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
      {/* CaptionPopup component for entering and submitting captions */}
      {showCaptionPopup && (
        <CaptionPopup
          onClose={() => setShowCaptionPopup(false)}
          onCaptionSubmit={handleCaptionSubmit}
        />
      )}
    </>
  );
};

export default Canvas;
