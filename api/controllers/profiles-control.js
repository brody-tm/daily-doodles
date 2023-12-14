import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";




//++++++++++++++++++++++++++++++++++++++++++++  GETTERS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//======================================================================================================================
/*Gets userID from token and uses it to find profile in database*/
export const getProfile = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!"); //Checks to see if user is logged in
    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!"); //Checks to see if user has correct information
        console.log(userId);

        //SQL statement
        const q = 'SELECT * FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        //I get get the information when value =0;
        const values = req.params.id// = [userInfo.id, userInfo.id]  Need to get actually information after user auth finished.

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};


export const getGallery = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!"); //Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!"); //Checks to see if user has correct information
        console.log(userId);

        //SQL statement
        const q = 'SELECT * FROM posts WHERE userID = ? ORDER BY likes DESC LIMIT 4;;';

        //I get get the information when value =0;
        const values = req.params.id// = [userInfo.id, userInfo.id]  Need to get actually information after user auth finished.

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};


//++++++++++++++++++++++++++++++++++++++++++++  SETTERS  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//======================================================================================================================

export const setProfile = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//Checks to see if user has correct information
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET profile_name= ?, bio=? WHERE p.id = ?;';

        const values = [req.body.profile_name,req.body.bio,req.body.id];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first


        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Profile has been changed.");
            });
    });
};
export const setPic = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;

    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//Checks to see if user has correct information

        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET profile_image=? WHERE p.id = ?;';

        const values = [req.body.profile_image,req.body.id];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first


        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Profile has been changed.");
            });
    });
};
