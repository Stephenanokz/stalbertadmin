import axios from "axios";
import {
  createCarouselImageFailure,
  createCarouselImageStart,
  createCarouselImageSuccess,
  deleteCarouselImageFailure,
  deleteCarouselImageStart,
  deleteCarouselImageSuccess,
  getCarouselImagesFailure,
  getCarouselImagesStart,
  getCarouselImagesSuccess,
  updateCarouselImageStart,
  updateCarouselImageSuccess,
  updateCarouselImageFailure,
  getCarouselImageStart,
  getCarouselImageSuccess,
  getCarouselImageFailure,
} from "./CarouselImageActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCarouselImagesCall = async (dispatch) => {
  dispatch(getCarouselImagesStart());
  try {
    const res = await axiosInstance.get("/carouselimages/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getCarouselImagesSuccess(res.data));
  } catch (err) {
    dispatch(getCarouselImagesFailure());
  }
};

export const getCarouselImageCall = async (id, dispatch) => {
  dispatch(getCarouselImageStart());
  try {
    const res = await axiosInstance.get(`/carouselimages/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const carouselImage = [];
    carouselImage.push(res.data);
    dispatch(getCarouselImageSuccess(carouselImage));
  } catch (err) {
    dispatch(getCarouselImageFailure());
  }
};

export const createCarouselImageCall = async (carouselImage, dispatch) => {
  dispatch(createCarouselImageStart());
  try {
    const res = await axiosInstance.post("/carouselimages/", carouselImage, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createCarouselImageSuccess(res.data));
  } catch (err) {
    dispatch(createCarouselImageFailure());
  }
};

export const updateCarouselImageCall = async (carouselImage, dispatch) => {
  dispatch(updateCarouselImageStart());
  try {
    const res = await axiosInstance.put("/carouselimages/" + carouselImage._id, carouselImage, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateCarouselImageSuccess(res.data));
  } catch (err) {
    dispatch(updateCarouselImageFailure());
  }
};

export const deleteCarouselImageCall = async (id, dispatch) => {
  dispatch(deleteCarouselImageStart());
  try {
    await axiosInstance.delete("/carouselimages/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteCarouselImageSuccess(id));
  } catch (err) {
    dispatch(deleteCarouselImageFailure());
  }
};