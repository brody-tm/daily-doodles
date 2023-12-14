import "../Styles/profile.css";
import Post2 from "./Post";
import { UserContext } from "../context/userContext";
import { useState, useContext, useEffect } from "react";

// Define the type for a single post
export type Post = {
    id: number;
    desc: string;
    body: string;
    userId: number;
    createdAt: string;
    likes: number;
  };

function MyGallery(){
    const [posts, setPosts] = useState<Post[]>([]);
    const {currentUser} = useContext(UserContext);

    useEffect(()=>{GetGalleryData();},[]);
    

    const GetGalleryData = async () => {
        try {
        const res = await fetch(`http://localhost:8800/api/profile/gallery/${currentUser?.id}`, {
            method: "GET",
        });

        console.log(res);
        // check response
        if (!res.ok) {
            throw new Error(`HTTP error on gallery: ${res.status}`);
        }
        const resData = await res.json();
        setPosts(resData);
        } catch (err) {
        console.error("Error sending gallery request:", err);
        }
    };
   

   
return(
    <div id="column2" className="column">
        <div className="headerCenter"><div className="header">My Gallery</div></div>
       <div className="gallaryContainer">
       {posts.map((post) => (
        <Post2 key={post.id} post={post} />
        ))}
         </div>    
    </div>
 
)
}

export default MyGallery;