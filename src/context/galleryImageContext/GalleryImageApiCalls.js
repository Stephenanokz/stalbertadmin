import axios from "axios";
import {
  createGalleryImageFailure,
  createGalleryImageStart,
  createGalleryImageSuccess,
  deleteGalleryImageFailure,
  deleteGalleryImageStart,
  deleteGalleryImageSuccess,
  getGalleryImagesFailure,
  getGalleryImagesStart,
  getGalleryImagesSuccess,
  updateGalleryImageStart,
  updateGalleryImageSuccess,
  updateGalleryImageFailure,
  getGalleryImageStart,
  getGalleryImageSuccess,
  getGalleryImageFailure,
} from "./GalleryImageActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getGalleryImagesCall = async (dispatch) => {
  dispatch(getGalleryImagesStart());
  try {
    const res = await axiosInstance.get("/galleryimages/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getGalleryImagesSuccess(res.data));
  } catch (err) {
    dispatch(getGalleryImagesFailure());
  }
};

export const getGalleryImageCall = async (id, dispatch) => {
  dispatch(getGalleryImageStart());
  try {
    const res = await axiosInstance.get(`/galleryimages/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const galleryImage = [];
    galleryImage.push(res.data);
    dispatch(getGalleryImageSuccess(galleryImage));
  } catch (err) {
    dispatch(getGalleryImageFailure());
  }
};

export const createGalleryImageCall = async (galleryImage, dispatch) => {
  dispatch(createGalleryImageStart());
  try {
    const res = await axiosInstance.post("/galleryimages/", galleryImage, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createGalleryImageSuccess(res.data));
  } catch (err) {
    dispatch(createGalleryImageFailure());
  }
};

export const updateGalleryImageCall = async (galleryImage, dispatch) => {
  dispatch(updateGalleryImageStart());
  try {
    const res = await axiosInstance.put("/galleryimages/" + galleryImage._id, galleryImage, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateGalleryImageSuccess(res.data));
  } catch (err) {
    dispatch(updateGalleryImageFailure());
  }
};

export const deleteGalleryImageCall = async (id, dispatch) => {
  dispatch(deleteGalleryImageStart());
  try {
    await axiosInstance.delete("/galleryimages/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteGalleryImageSuccess(id));
  } catch (err) {
    dispatch(deleteGalleryImageFailure());
  }
};