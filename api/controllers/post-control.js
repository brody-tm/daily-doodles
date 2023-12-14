/**
 * @file auth-control.js
 *
 * @description Controller that handles post manipulation (creation, deletion, retrieval, likes)
 */

import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

/**
 * Retrieves all posts from the database
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns Response with status code and (if successful) array of post data
 */
export const getPosts = (req, res) => {
  const userId = req.body.user_id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q = "SELECT * FROM DailyDoodlesDB.posts ORDER BY createdAt DESC";
    dbConnection.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Ensuring data is an array
      const dataArray = Array.isArray(data) ? data : [data];

      return res.status(200).json(dataArray);
    });
  });
};

/**
 * Retrieves the top 3 posts from the database, based on the number of likes
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns Response with status code and (if successful) array with top 3 posts
 */
export const getTopPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q = "SELECT * FROM DailyDoodlesDB.posts ORDER BY likes DESC LIMIT 3";
    dbConnection.query(q, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      // Ensure data is an array
      const dataArray = Array.isArray(data) ? data : [data];

      // Send an array of top posts
      return res.status(200).json(dataArray.slice(0, 3));
    });
  });
};


/**
 * Adds a new post to the database
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns Response with status of request
 */
export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO DailyDoodlesDB.posts(`desc`, `body`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.body,
      req.body.user_id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    dbConnection.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

/**
 * Deletes a specified post from the database
 *
 * @param req - Express request object
 * @param res - Express response object
 *
 * @returns Response with status of request
 */
export const delPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM DailyDoodlesDB.posts WHERE `id`=? AND `userId` = ?";

    dbConnection.query(q, [req.body.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};

/**
 * Updates the 'likes' field of the specified post in the database.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns Response with status of request
 */
export const likePost = (req, res) => {
  const q = "UPDATE `DailyDoodlesDB`.`posts` SET `likes` = ? WHERE `id` = ?";
  const newLikes = req.body.likes + 1;
  const postId = req.body.id;

  dbConnection.query(q, [newLikes, postId], (err, data) => {
    if (err) {
      console.error("Error updating likes:", err);
      return res.status(500).json({ error: "Error updating likes." });
    }

    if (data.affectedRows > 0) {
      return res
        .status(200)
        .json({ likes: newLikes, message: "Likes updated." });
    } else {
      return res
        .status(404)
        .json({ error: "Post not found or no changes made." });
    }
  });
};
