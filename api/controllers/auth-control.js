import dbConnection from "../db-connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// TODO modify as necessary to match our table format
export function registerAccount(req, res) {
  const getUsersQuery = "SELECT * FROM users WHERE username = ?";

  // perform query to see if user exists in database
  dbConnection.query(getUsersQuery, TODO, (error, data) => {
    // server error
    if (error) {
      return res.status(500).json(error);
    }

    // user already exists in database
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // if we get here, create new user

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const addUserQuery =
      "INSERT INTO users (`id`,`email`,`password`,`created_at`) VALUE (?)";

    const userData = [
      req.body.id,
      req.body.email,
      hashedPassword,
      req.body.createdAt,
    ];

    // perform query to add user to database
    dbConnection.query(addUserQuery, [userData], (error, data) => {
      // server error
      if (error) {
        return res.status(500).json(error);
      }

      // successfully created user
      return res.status(200).json("User has been created.");
    });
  });
}

export function login(req, res) {
  const q = "SELECT * FROM users WHERE username = ?";

  dbConnection.query(q, [req.body.username], (error, data) => {
    // server error
    if (error) {
      return res.status(500).json(error);
    }
    // user does not exist in database
    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    // TODO figure out what this does
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // invalid login credentials
    if (!checkPassword) {
      return res.status(400).json("Wrong password or username!");
    }

    // create token for login session
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // use objecting desctructuring to remove password from values that will be returned
    const { password, ...others } = data[0];

    // TODO figure out what this does
    res
      .cookie("accessToken", token, {
        httpOnly: true, // TODO check if we want this
      })
      .status(200)
      .json(others);
  });
}

export function logout() {
  // TODO figure out what this does
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out.");
}
