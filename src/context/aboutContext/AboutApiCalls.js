import axios from "axios";
import {
  createAboutItemFailure,
  createAboutItemStart,
  createAboutItemSuccess,
  deleteAboutItemFailure,
  deleteAboutItemStart,
  deleteAboutItemSuccess,
  getAboutItemFailure,
  getAboutItemStart,
  getAboutItemSuccess,
  updateAboutItemStart,
  updateAboutItemSuccess,
  updateAboutItemFailure,
} from "./AboutActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAboutItemCall = async (id, dispatch) => {
  dispatch(getAboutItemStart());
  try {
    const res = await axiosInstance.get(`/about/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getAboutItemSuccess(res.data));
  } catch (err) {
    dispatch(getAboutItemFailure());
  }
};

export const createAboutItemCall = async (aboutItem, dispatch) => {
  dispatch(createAboutItemStart());
  try {
    const res = await axiosInstance.post("/about/", aboutItem, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createAboutItemSuccess(res.data));
  } catch (err) {
    dispatch(createAboutItemFailure());
  }
};

export const updateAboutItemCall = async (aboutItem, dispatch) => {
  dispatch(updateAboutItemStart());
  try {
    const res = await axiosInstance.put(`/about/${aboutItem._id}`, aboutItem, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateAboutItemSuccess(res.data));
  } catch (err) {
    dispatch(updateAboutItemFailure());
  }
};

export const deleteAboutItemCall = async (id, dispatch) => {
  dispatch(deleteAboutItemStart());
  try {
    await axiosInstance.delete(`/about/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteAboutItemSuccess());
  } catch (err) {
    dispatch(deleteAboutItemFailure());
  }
};