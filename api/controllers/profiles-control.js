
import { dbConnection } from "../db-connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

/* 
    TODO:
        * Utilize user auth once complete to get information from users account. 
            -This information will help fill in there userID and what values to add.
            -Begin by removing hardcoded values used for testing.
        * Figure out how to add pictures to database.
        * Implement into front-end. Possibly over Thanksgiving?
        * Get AWS set up.
*/


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
        const values = 0;// = [userInfo.id, userInfo.id]  Need to get actually information after user auth finished.

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

/*Gets userID from token and uses it to find profile name in database*/
export const getName = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");

        //SQL statement
        const q = 'SELECT profile_name FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        const values=0;//= userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

/*Gets userID from token and uses it to find profile picture in database*/
export const getPic = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'SELECT profile_image FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        const values =0;

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};


/*Gets userID from token and uses it to find profile bio in database*/
export const getBio = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'SELECT bio FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        const values=0;//= userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};

/*Gets userID from token and uses it to find profile likes in database*/
export const getLikes = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'SELECT likes FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        const values=0;//= userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
            });
    });
};


/*Gets userID from token and uses it to find profile follower numbers in database*/
export const getFollows = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'SELECT follows FROM DailyDoodlesDB.profiles AS p WHERE p.id = ?;';

        const values=0;//= userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

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

        const values = [req.body.profile_name,req.body.bio,req.params.id];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first


        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Profile has been changed.");
            });
    });
};





/*Gets userID from token and uses it to change profile name in database*/
export const setName = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");//Checks to see if user is logged in

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");//Checks to see if user has correct information
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET profile_name= ? WHERE p.id = ?;';

        const values = ["John",0];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Name has been changed to "+values[0]);
            });
    });
};


/*Gets userID from token and uses it to change profile picture in database*/
export const setPic = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET bio = ? WHERE p.id = ?;';//Not sure how to get this data

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Picture has been changed.");
            });
    });
};

/*Gets userID from token and uses it to change profile bio in database*/
export const setBio = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET bio = ? WHERE p.id = ?;';

        const values = ["My best friend Frank was a famous architect of the early 1900's. He helped build unique homes all across the country.",0];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Bio has been changed.");
            });
    });
};

/*Gets userID from token and uses it to change profile likes in database*/
export const setLikes = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET likes= ? WHERE p.id = ?;';

        const values = [1999,0];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Likes has been changed.");
            });
    });
};


/*Gets userID from token and uses it to change profile follows in database*/
export const setFollows = (req, res) => {
    const userId = req.query.userId;
    const token = req.cookies.accessToken;
    
    // if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        // if(err) return res.status(403).json("Token is not valid!");
        
        //SQL statement
        const q = 'UPDATE DailyDoodlesDB.profiles AS p SET follows= ? WHERE p.id = ?;';

        const values = [150,0];
        // [,userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]];//ADD new Profile name first

        //Connect to database with statement and values
        dbConnection.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Follows has been changed.");
            });
    });
};


//+++++++++++++++++++++++++++++++++++++++++  Clear/Delete  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//======================================================================================================================