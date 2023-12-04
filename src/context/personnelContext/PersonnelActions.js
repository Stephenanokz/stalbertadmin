//CREATE PERSONNEL
export const createPersonnelStart = () => ({
  type: "CREATE_PERSONNEL_START",
});

export const createPersonnelSuccess = (personnel) => ({
  type: "CREATE_PERSONNEL_SUCCESS",
  payload: personnel,
});

export const createPersonnelFailure = () => ({
  type: "CREATE_PERSONNEL_FAILURE",
});

//GET PERSONNELS
export const getPersonnelsStart = () => ({
  type: "GET_PERSONNELS_START",
});

export const getPersonnelsSuccess = (personnels) => ({
  type: "GET_PERSONNELS_SUCCESS",
  payload: personnels,
});

export const getPersonnelsFailure = () => ({
  type: "GET_PERSONNELS_FAILURE",
});

//GET ONE CAROUSEL IMAGE
export const getPersonnelStart = () => ({
  type: "GET_PERSONNEL_START",
});

export const getPersonnelSuccess = (personnel) => ({
  type: "GET_PERSONNEL_SUCCESS",
  payload: personnel,
});

export const getPersonnelFailure = () => ({
  type: "GET_PERSONNEL_FAILURE",
});

//UPDATE PERSONNEL
export const updatePersonnelStart = () => ({
  type: "UPDATE_PERSONNEL_START",
});

export const updatePersonnelSuccess = (personnel) => ({
  type: "UPDATE_PERSONNEL_SUCCESS",
  payload: personnel,
});

export const updatePersonnelFailure = () => ({
  type: "UPDATE_PERSONNEL_FAILURE",
});

//DELETE PERSONNEL
export const deletePersonnelStart = () => ({
  type: "DELETE_PERSONNEL_START",
});

export const deletePersonnelSuccess = (id) => ({
  type: "DELETE_PERSONNEL_SUCCESS",
  payload: id,
});

export const deletePersonnelFailure = () => ({
  type: "DELETE_PERSONNEL_FAILURE",
});
