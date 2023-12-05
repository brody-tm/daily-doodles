const Post2 = ({ post }) => (
  <div className="post">
    <h3>{post.desc}</h3>
    <img src={post.body} alt="" />
    <p>
      <strong>User ID:</strong> {post.userId}
    </p>
    <p>
      <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
    </p>
    <p>
      <strong>Likes:</strong> {post.likes}
    </p>
  </div>
);

export default Post2;
