import axios from "axios";
import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
} from "./PostActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPostsCall = async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await axiosInstance.get("/posts/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getPostsSuccess(res.data));
  } catch (err) {
    dispatch(getPostsFailure());
  }
};

export const getPostCall = async (id, dispatch) => {
  dispatch(getPostStart());
  try {
    const res = await axiosInstance.get(`/posts/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const post = [];
    post.push(res.data);
    dispatch(getPostSuccess(post));
  } catch (err) {
    dispatch(getPostFailure());
  }
};

export const createPostCall = async (post, dispatch) => {
  dispatch(createPostStart());
  try {
    const res = await axiosInstance.post("/posts/", post, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createPostSuccess(res.data));
  } catch (err) {
    dispatch(createPostFailure());
  }
};

export const updatePostCall = async (post, dispatch) => {
  dispatch(updatePostStart());
  try {
    const res = await axiosInstance.put("/posts/" + post._id, post, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updatePostSuccess(res.data));
  } catch (err) {
    dispatch(updatePostFailure());
  }
};

export const deletePostCall = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    await axiosInstance.delete("/posts/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deletePostSuccess(id));
  } catch (err) {
    dispatch(deletePostFailure());
  }
};