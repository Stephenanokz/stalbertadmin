import axios from "axios";
import {
  createAchievementFailure,
  createAchievementStart,
  createAchievementSuccess,
  deleteAchievementFailure,
  deleteAchievementStart,
  deleteAchievementSuccess,
  getAchievementsFailure,
  getAchievementsStart,
  getAchievementsSuccess,
  updateAchievementStart,
  updateAchievementSuccess,
  updateAchievementFailure,
  getAchievementStart,
  getAchievementSuccess,
  getAchievementFailure,
} from "./AchievementActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAchievementsCall = async (dispatch) => {
  dispatch(getAchievementsStart());
  try {
    const res = await axiosInstance.get("/achievements/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getAchievementsSuccess(res.data));
  } catch (err) {
    dispatch(getAchievementsFailure());
  }
};

export const getAchievementCall = async (id, dispatch) => {
  dispatch(getAchievementStart());
  try {
    const res = await axiosInstance.get(`/achievements/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const achievement = [];
    achievement.push(res.data);
    dispatch(getAchievementSuccess(achievement));
  } catch (err) {
    dispatch(getAchievementFailure());
  }
};

export const createAchievementCall = async (achievement, dispatch) => {
  dispatch(createAchievementStart());
  try {
    const res = await axiosInstance.post("/achievements/", achievement, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(createAchievementSuccess(res.data));
  } catch (err) {
    dispatch(createAchievementFailure());
  }
};

export const updateAchievementCall = async (achievement, dispatch) => {
  dispatch(updateAchievementStart());
  try {
    const res = await axiosInstance.put(`/achievements/${achievement._id}`, achievement, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(updateAchievementSuccess(res.data));
  } catch (err) {
    dispatch(updateAchievementFailure());
  }
};

export const deleteAchievementCall = async (id, dispatch) => {
  dispatch(deleteAchievementStart());
  try {
    await axiosInstance.delete("/achievements/" + id, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteAchievementSuccess(id));
  } catch (err) {
    dispatch(deleteAchievementFailure());
  }
};