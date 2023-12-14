/**
 * @file Posts.tsx
 * @description Gathers posts from backend to display on frontend
 */
import React, { useState, useEffect } from "react";
import Post2 from "./Post"; // Import the Post2 component from its actual location

/**
 * Defines the type for a single post
 */
export type Post = {
  id: number; // ID number of the post
  desc: string; // description of the post
  body: string; // post's body
  userId: number; // ID number of the user who made the post
  createdAt: string; // time the post was created
  likes: number; // number of likes
};

/**
 * React functional component representing a list of posts
 *
 * @returns The rendered post list component
 */
const Posts: React.FC = () => {
  // State hook to manage the posts data
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    /**
     * Fetches all posts from the server and sets them in the new post list component
     * 
     * @async
     */
    const fetchData = async () => {
      try {
        // Fetch posts data from the server
        const response = await fetch("http://localhost:8800/api/post", {
          method: "GET",
          credentials: "include",
        });

        // Parse the response as JSON
        const data = await response.json();

        // // Sort the posts by createdAt date in descending order
        // const sortedPosts = data.sort((a: Post, b: Post) => {
        //   const dateA = new Date(a.createdAt);
        //   const dateB = new Date(b.createdAt);

        //   return dateB.getTime() - dateA.getTime();
        // });

        // Set the sorted posts in the state
        setPosts(data);
      } catch (error) {
        // Handle and log any errors that occur during data fetching
        console.error("Error fetching data:", error);
      }
    };

    // Invoke the fetchData function when the component mounts
    fetchData();
  }, []);

  return (
    <div className="posts">
      {/* Map through the posts and render the Post2 component for each post */}
      {posts.map((post) => (
        <Post2 key={post.id} post={post} />
      ))}
    </div>
  );
};

// Export the Posts component as the default export of this module
export default Posts;
