/**
 * @module Post - represents a single post
 * @param post
 */

import { useState, useContext } from "react";
import { Post } from "./Posts.tsx";
import { UserContext } from "../context/userContext.tsx";

const Post2 = ({ post }: { post: Post }) => {
  //Remove
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const { currentUser } = useContext(UserContext);

  //Sends PUT request to update a post's likes
  const updateLike = async () => {
    fetch("http://localhost:8800/api/post/like/${post.id}", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ likes: likes, id: post.id }),
    })
      .then((res) => res.text()) // Change to res.text() to log the entire response body
      .then((text) => console.log("Response from server:", text))
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(!isLiked);
      updateLike();
      return;
    } else {
      setLikes(likes - 1);
      setIsLiked(!isLiked);
      return;
    }
  };

  const handleDelete = async () => {
    try {
      console.log("POST ID: " + post.id);
      await fetch("http://localhost:8800/api/post/${post.id}", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: post.id }),
        credentials: "include",
      });

      window.location.reload(); // refresh page to show updated posts
    } catch (err: any) {
      console.log("Error when deleting post: " + err);
    }
  };

  const PostDeleteBtn = () => {
    if (currentUser!.id === post.userId) {
      return <button className="deleteButton" onClick={handleDelete}>🗑️</button>;
    }
  };

  return (
    <div className="post-container">
      <div className="post">
        <img className="pic" src={post.body} alt="" />
        <div className="lowerHalf">
          <div className="Caption">
            <strong className="userName ">User {post.userId}:  </strong> {post.desc}
          </div>

          <span
            className="likebtn"
            onClick={handleLike}
            style={{ cursor: "pointer" }}
          >
            {isLiked ? "❤️" : "🤍"}
            <div className="likeFont">{likes}</div>
          </span>
          <div className="lowerBoxTime">
            <div className="time">{new Date(post.createdAt).toLocaleString()}</div>
            <PostDeleteBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post2;
