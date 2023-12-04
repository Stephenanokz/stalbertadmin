//CREATE POST
export const createPostStart = () => ({
  type: "CREATE_POST_START",
});

export const createPostSuccess = (post) => ({
  type: "CREATE_POST_SUCCESS",
  payload: post,
});

export const createPostFailure = () => ({
  type: "CREATE_POST_FAILURE",
});

//GET POSTS
export const getPostsStart = () => ({
  type: "GET_POSTS_START",
});

export const getPostsSuccess = (posts) => ({
  type: "GET_POSTS_SUCCESS",
  payload: posts,
});

export const getPostsFailure = () => ({
  type: "GET_POSTS_FAILURE",
});

//GET ONE POST
export const getPostStart = () => ({
  type: "GET_POST_START",
});

export const getPostSuccess = (post) => ({
  type: "GET_POST_SUCCESS",
  payload: post,
});

export const getPostFailure = () => ({
  type: "GET_POST_FAILURE",
});

//UPDATE POST
export const updatePostStart = () => ({
  type: "UPDATE_POST_START",
});

export const updatePostSuccess = (post) => ({
  type: "UPDATE_POST_SUCCESS",
  payload: post,
});

export const updatePostFailure = () => ({
  type: "UPDATE_POST_FAILURE",
});

//DELETE POST
export const deletePostStart = () => ({
  type: "DELETE_POST_START",
});

export const deletePostSuccess = (id) => ({
  type: "DELETE_POST_SUCCESS",
  payload: id,
});

export const deletePostFailure = () => ({
  type: "DELETE_POST_FAILURE",
});
