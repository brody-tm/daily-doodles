import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++GET POSTS+++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const getPosts = (req, res) => {
  // const userId = req.query.userId;
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  // if (err) return res.status(403).json("Token is not valid!");

  // console.log(userId);

  const q = "SELECT * FROM DailyDoodlesDB.posts";
  dbConnection.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    // Ensuring data is an array
    const dataArray = Array.isArray(data) ? data : [data];

    return res.status(200).json(dataArray);
  });

  // });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++ADD POST+++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const addPost = (req, res) => {
  // const token = req.cookies.accessToken;
  // if (!token) return res.status(401).json("Not logged in!");

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  // if (err) return res.status(403).json("Token is not valid!");

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
  // });
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++DEL POST+++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const delPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM DailyDoodlesDB.posts WHERE `id`=? AND `user_id` = ?";

    dbConnection.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0)
        return res.status(200).json("Post has been deleted.");
      return res.status(403).json("You can delete only your post");
    });
  });
};
