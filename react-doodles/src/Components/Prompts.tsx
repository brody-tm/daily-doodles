import React, { useState, useEffect } from 'react';
import '../Styles/Canvas.css';

const Prompt = () => {
  const [pickedPrompt, setPickedPrompt] = useState('Dragon');
  const [timer, setTimer] = useState(120); // Change initial timer to 2 minutes

  const fetchSharedPrompt = async () => {
    try {
      const response = await fetch('http://localhost:8800/api/prompt/');
      const data = await response.json();

      setPickedPrompt(data.prompt);
      setTimer(120); // Reset the timer to 2 minutes when a new prompt is fetched
    } catch (error) {
      console.error('Error fetching shared prompt:', error);
    }
  };

  useEffect(() => {
    // Fetch the shared prompt initially
    fetchSharedPrompt();

    // Set up an interval to fetch the shared prompt every 2 minutes
    const promptIntervalId = setInterval(() => {
      fetchSharedPrompt();
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    // Set up an interval to update the timer every second
    const timerIntervalId = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Cleanup intervals on component unmount
    return () => {
      clearInterval(promptIntervalId);
      clearInterval(timerIntervalId);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="promptBox">
      <div className="prompt">{pickedPrompt}</div>
      <div className="timer">Time until next prompt: <strong className="clock">{formatTime(timer)}</strong></div>
    </div>
  );
};

export default Prompt;
