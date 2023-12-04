import axios from "axios";
import {
  deleteMailFailure,
  deleteMailStart,
  deleteMailSuccess,
  getMailFailure,
  getMailStart,
  getMailSuccess,
  getMailsFailure,
  getMailsStart,
  getMailsSuccess,
} from "./MailActions";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMailsCall = async (dispatch) => {
  dispatch(getMailsStart());
  try {
    const res = await axiosInstance.get("/contactmails/", {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(getMailsSuccess(res.data));
  } catch (err) {
    dispatch(getMailsFailure());
  }
};

export const getMailCall = async (id, dispatch) => {
  dispatch(getMailStart());
  try {
    const res = await axiosInstance.get(`/contactmails/find/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    const mail = [];
    mail.push(res.data);
    dispatch(getMailSuccess(mail));
  } catch (err) {
    dispatch(getMailFailure());
  }
};

export const deleteMailCall = async (id, dispatch) => {
  dispatch(deleteMailStart());
  try {
    await axiosInstance.delete(`/contactmails/${id}`, {
      headers: {
        token: `Bearer ${import.meta.env.VITE_JWT_TOKEN}`,
      },
    });
    dispatch(deleteMailSuccess(id));
  } catch (err) {
    dispatch(deleteMailFailure());
  }
};