/**
 * @file auth-control.js
 *
 * @description Controller that handles user account creation and authentication
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";

import { dbConnection } from "../db-connect.js";

/**
 * Handles the registration of a new user account.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns Response with the status code of the request
 */
export function registerAccount(req, res) {
  // SQL query to check if the user already exists
  const getUsersQuery = "SELECT * FROM users WHERE email = ?";
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&]).*$/;

  // Perform query to see if the user exists in the database
  dbConnection.query(getUsersQuery, [req.body.email], (error, data) => {
    // Server error
    if (error) {
      return res.status(500).json(error);
    }

    // User already exists in the database
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // Check for the correct email and password formats
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).json({ error: "Invalid password format" });
    }

    // If we get here, create a new user

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const addUserQuery =
      "INSERT INTO users (`email`,`password`,`created_at`) VALUE (?)";

    const userData = [
      req.body.email,
      hashedPassword,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    // Perform query to add the user to the database
    dbConnection.query(addUserQuery, [userData], (error, data) => {
      // Server error
      if (error) {
        return res.status(300).json(error);
      }

      // Get the new user's information
      const getNewUserQuery = "SELECT * FROM users WHERE email = ? ";

      dbConnection.query(getNewUserQuery, [req.body.email], (error, data) => {
        const newUserID = data[0].id;
        const addProfileQuery =
          "INSERT INTO profiles (`id`,`profile_name`,`bio`,`likes`,`follows`) VALUE (?);";

        const ProfileData = [newUserID, req.body.email, "Add Bio Below", 0, 0];

        // Create an empty profile
        dbConnection.query(addProfileQuery, [ProfileData], (error, data) => {
          // Server error
          if (error) {
            return res.status(500).json(error);
          }
          // Successfully created the user
          return res.status(200).json("User has been created.");
        });
      });
    });
  });
}

/**
 * Handles user login process by issuing an authentication cookie
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns Response with the status code of the request
 */
export function login(req, res) {
  const q = "SELECT * FROM users WHERE email = ?";

  dbConnection.query(q, [req.body.email], (error, data) => {
    // Server error
    if (error) {
      return res.status(500).json(error);
    }
    // User does not exist in the database
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    // Invalid login credentials
    if (!checkPassword) {
      return res.status(400).json("Wrong username or password");
    }

    // Create a token for the login session
    const token = jwt.sign({ id: data[0].id }, "secretkey"); // TODO: Make the secret key actually secret...

    // Use object destructuring to remove the password from values that will be returned
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
}

/**
 * Logs user out by clearing the authentication cookies
 *
 * @param req - Express request object.
 * @param res - Express response object.
 *
 * @returns Response with the status code of the request
 */
export function logout(req, res) {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "None",
    })
    .status(200)
    .json("User has been logged out.");
}
