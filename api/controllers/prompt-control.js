import { dbConnection } from '../db-connect.js';

let sharedPrompt = 'Default Prompt'; // Initial shared prompt value

// Update the shared prompt every 2 minutes
setInterval(() => {
  const query = 'SELECT Promptscol FROM Prompts ORDER BY RAND() LIMIT 1';
  dbConnection.query(query, (err, data) => {
    if (!err && data.length > 0) {
      sharedPrompt = data[0].Promptscol;
    }
  });
}, 2 * 60 * 1000); // 2 minutes in milliseconds

export const getPrompt = (req, res) => {
  res.status(200).json({ prompt: sharedPrompt });
};
