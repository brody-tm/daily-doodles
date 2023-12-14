import React, { useState, useEffect } from "react";
import Post2 from "./Post";
import styled from "styled-components";
import "../Styles/leaderboard.css";

//styles for conatiner
const TopPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BronzePost = styled.div`
  border: 10px solid #cd7f32;
  border-radius: 40px;
  margin: 10px;
`;

const SilverPost = styled.div`
  border: 10px solid #c0c0c0;
  border-radius: 40px;
  margin: 10px;
`;

const GoldPost = styled.div`
  border: 10px solid #ffd700;
  border-radius: 40px;
  margin: 10px;
  animation: burn 1.5s linear infinite alternate;

  @keyframes burn {
    from {
      box-shadow: 0 0 5px #ffd700, 0 0 10px #ff4500, 0 0 20px #ff4500;
    }
    50% {
      box-shadow: 0 0 10px #ffd700, 0 0 20px #ff4500, 0 0 40px #ff4500;
    }
    100% {
      box-shadow: 0 0 5px #ffd700, 0 0 10px #ff4500, 0 0 20px #ff4500;
    }
  }
`;





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
        const response = await fetch("http://localhost:8800/api/post/top", {
          method: "GET",
          credentials: "include",
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
    <TopPostsContainer>
      {posts.length > 0 && (
        <GoldPost>
          <Post2 key={posts[0].id} post={posts[0]} />
        </GoldPost>
      )}
      {posts.length > 1 && (
        <SilverPost>
          <Post2 key={posts[1].id} post={posts[1]} />
        </SilverPost>
      )}
      {posts.length > 2 && (
        <BronzePost>
          <Post2 key={posts[2].id} post={posts[2]} />
        </BronzePost>
      )}
    </TopPostsContainer>
  );
};

export default Posts;
