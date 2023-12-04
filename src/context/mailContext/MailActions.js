//GET MAILS
export const getMailsStart = () => ({
  type: "GET_MAILS_START",
});

export const getMailsSuccess = (mails) => ({
  type: "GET_MAILS_SUCCESS",
  payload: mails,
});

export const getMailsFailure = () => ({
  type: "GET_MAILS_FAILURE",
});

//GET ONE MAIL
export const getMailStart = () => ({
  type: "GET_MAIL_START",
});

export const getMailSuccess = (mail) => ({
  type: "GET_MAIL_SUCCESS",
  payload: mail,
});

export const getMailFailure = () => ({
  type: "GET_MAIL_FAILURE",
});

//DELETE MAIL
export const deleteMailStart = () => ({
  type: "DELETE_MAIL_START",
});

export const deleteMailSuccess = (id) => ({
  type: "DELETE_MAIL_SUCCESS",
  payload: id,
});

export const deleteMailFailure = () => ({
  type: "DELETE_MAIL_FAILURE",
});
