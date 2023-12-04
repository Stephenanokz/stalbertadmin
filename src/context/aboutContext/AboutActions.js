//CREATE ABOUT ITEM
export const createAboutItemStart = () => ({
  type: "CREATE_ABOUTITEM_START",
});

export const createAboutItemSuccess = (aboutItem) => ({
  type: "CREATE_ABOUTITEM_SUCCESS",
  payload: aboutItem,
});

export const createAboutItemFailure = () => ({
  type: "CREATE_ABOUTITEM_FAILURE",
});

//GET ABOUT ITEM
export const getAboutItemStart = () => ({
  type: "GET_ABOUTITEM_START",
});

export const getAboutItemSuccess = (aboutItem) => ({
  type: "GET_ABOUTITEM_SUCCESS",
  payload: aboutItem,
});

export const getAboutItemFailure = () => ({
  type: "GET_ABOUTITEM_FAILURE",
});

//UPDATE ABOUT ITEM
export const updateAboutItemStart = () => ({
  type: "UPDATE_ABOUTITEM_START",
});

export const updateAboutItemSuccess = (aboutItem) => ({
  type: "UPDATE_ABOUTITEM_SUCCESS",
  payload: aboutItem,
});

export const updateAboutItemFailure = () => ({
  type: "UPDATE_ABOUTITEM_FAILURE",
});

//DELETE ABOUT ITEM
export const deleteAboutItemStart = () => ({
  type: "DELETE_HOMETEXT_START",
});

export const deleteAboutItemSuccess = () => ({
  type: "DELETE_HOMETEXT_SUCCESS",
});

export const deleteAboutItemFailure = () => ({
  type: "DELETE_HOMETEXT_FAILURE",
});
