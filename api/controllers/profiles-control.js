
import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getProfile = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!"); //Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!"); //User have correct information?
        console.log(userId);
        //SQL statement
        const q = 'SELECT * FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        //I get get the information when value =0;
        const values = 0;// = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

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
    
    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = 'SELECT profile_name FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values=0;//= userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

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
    
    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = 'SELECT profile_image FROM profiles AS p WHERE p.id = ?;';

        const values =0;

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
    
    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//User have correct information?
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET profile_name= ? WHERE p.id = ?;';//TODO: FILL IN WHERE THEY DONT HAVE USER ID

        const values = ["John",0];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Name has been set.");
            });
    });
};

export const setPic = (req, res) => {
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
            return res.status(200).json("Picture has been set.");
            });
    });
};

