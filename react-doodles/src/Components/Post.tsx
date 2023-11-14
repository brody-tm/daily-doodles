/**THIS IS FOR STYLE ONLY! NOT FUNCTIONAL WITH BACKEND 
 * FOR DEMONSTRATION PURPOSE ONLY */

import React, { useState } from 'react';
import styled from 'styled-components';

const PostContainer = styled.div`
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  background: white;
  text-align: left;
  height: 600px
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const UserProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const PostImageContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const Caption = styled.div`
  background: lightgray;
  padding: 8px;
  border-radius: 8px;
  margin-top: auto; 
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const LikeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;


const Post: React.FC<{
  username: string;
  userProfilePic: string;
  imageSrc: string;
  title: string;
  description: string;
  style?: React.CSSProperties;
}> = ({ username, userProfilePic, imageSrc, title, description, style }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <PostContainer style={style}> 
      <UserContainer>
        <UserProfilePic src={userProfilePic} alt={`${username}'s Profile Pic`} />
        <UserName>{username}</UserName>
      </UserContainer>
      <PostImageContainer>
        <PostImage src={imageSrc} alt={`${title} Image`} />
      </PostImageContainer>
      <Caption>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <div>
          <LikeButton onClick={handleLike}>❤️</LikeButton> {likes} likes
        </div>
      </Caption>
    </PostContainer>
  );
};

export default Post;
