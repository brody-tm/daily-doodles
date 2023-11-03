

export const getComments = (req,res) => {
    

    debugger.query(q,[res.query.postId], (err, data) => {
if(err) return res.status(500). json(err);
return res.status(200).json(data);
    });
};

export const addComment = (req, res) => {
    const token = req.cookies.accessTokent;
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) =>{
        if (err) return res.status(403).json("Token is  not valid");

        const q = "INSERT INTO comments('desc','createdAt','userId','postId') VALUES(?)";
        const values = [
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];
        db.query(q,[values],(err,data) =>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created")
        })
        )
    }
