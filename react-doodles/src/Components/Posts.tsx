import React, { useState, useEffect } from "react";
import Post2 from "./Post2"; // Import the Post2 component from its actual location

// Define the type for a single post
type Post = {
  id: number;
  desc: string;
  body: string;
  userId: number;
  createdAt: string;
  likes: number;
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/post/", {
          method: "GET",
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post2 key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
