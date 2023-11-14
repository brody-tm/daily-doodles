import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPost = (req, res) => {
  const q = "SELECT * FROM DailyDoodlesDB.posts WHERE 'id' = ?";

  const postId = req.body.postId;

  dbConnection.query(q, postId, (queryError, results) => {
    if (queryError) {
      console.error("Error executing the query:", queryError);
      return;
    }
    console.log("Query results:", results);
    res.send("Results in console");
  });

  // const userId = req.query.userId;
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");
  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");
  //   console.log(userId);
  //   const q =
  //     userId !== "undefined"
  //       ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
  //       : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  //   LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
  //   ORDER BY p.createdAt DESC`;
  //   const values =
  //     userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
  //   dbConnection.query(q, values, (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     return res.status(200).json(data);
  //   });
  // });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO DailyDoodlesDB.posts(`desc`, `body`, `user_id`, `created_at`) VALUES (?)";

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

  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");

  //   const q =
  //     "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
  //   const values = [
  //     req.body.desc,
  //     req.body.img,
  //     moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //     userInfo.id,
  //   ];

  //   dbConnection.query(q, [values], (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     return res.status(200).json("Post has been created.");
  //   });
  // });
};

export const delPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?";

    dbConnection.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
