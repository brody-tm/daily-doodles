export const getPost = (req, res) => {
  return res.send({ data: "Here is your post!" });
};

export const addPost = (req, res) => {
  return res.send({ data: "Post added!" });
};

export const deletePost = (req, res) => {
  return res.send({ data: "Post deleted!" });
};
