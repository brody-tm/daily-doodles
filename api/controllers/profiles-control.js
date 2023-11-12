
import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getProfile = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = (userId !== "undefined" ? 'SELECT * FROM profiles AS p WHERE p.userID = ?;': '');//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

export const getName = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = (userId !== "undefined" ? 'SELECT profile_name FROM profiles AS p WHERE p.userID = ?;': '');//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

export const getPic = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = (userId !== "undefined" ? 'SELECT profile_image FROM profiles AS p WHERE p.userID = ?;': '');//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

export const setName = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = (userId !== "undefined" ? 'UPDATE profiles AS p SET profile_name= ? WHERE p.userID = ?;': '');//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

export const SetPic = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = (userId !== "undefined" ? '': '');//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

