import axios from "axios";
import {
  createPersonnelFailure,
  createPersonnelStart,
  createPersonnelSuccess,
  deletePersonnelFailure,
  deletePersonnelStart,
  deletePersonnelSuccess,
  getPersonnelsFailure,
  getPersonnelsStart,
  getPersonnelsSuccess,
  updatePersonnelStart,
  updatePersonnelSuccess,
  updatePersonnelFailure,
  getPersonnelFailure,
  getPersonnelSuccess,
  getPersonnelStart,
} from "./PersonnelActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPersonnelsCall = async (dispatch) => {
  dispatch(getPersonnelsStart());
  try {
    const res = await axiosInstance.get("/personnels/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getPersonnelsSuccess(res.data));
  } catch (err) {
    dispatch(getPersonnelsFailure());
  }
};

export const getPersonnelCall = async (id, dispatch) => {
  dispatch(getPersonnelStart());
  try {
    const res = await axiosInstance.get(`/personnels/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const personnel = [];
    personnel.push(res.data);
    dispatch(getPersonnelSuccess(personnel));
  } catch (err) {
    dispatch(getPersonnelFailure());
  }
};

export const createPersonnelCall = async (personnel, dispatch) => {
  dispatch(createPersonnelStart());
  try {
    const res = await axiosInstance.post("/personnels/", personnel, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createPersonnelSuccess(res.data));
  } catch (err) {
    dispatch(createPersonnelFailure());
  }
};

export const updatePersonnelCall = async (personnel, dispatch) => {
  dispatch(updatePersonnelStart());
  try {
    const res = await axiosInstance.put(`/personnels/${personnel._id}`, personnel, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updatePersonnelSuccess(res.data));
  } catch (err) {
    dispatch(updatePersonnelFailure());
  }
};

export const deletePersonnelCall = async (id, dispatch) => {
  dispatch(deletePersonnelStart());
  try {
    await axiosInstance.delete(`/personnels/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deletePersonnelSuccess(id));
  } catch (err) {
    dispatch(deletePersonnelFailure());
  }
};