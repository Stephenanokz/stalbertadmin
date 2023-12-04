//CREATE ACHIEVEMENT
export const createAchievementStart = () => ({
  type: "CREATE_ACHIEVEMENT_START",
});

export const createAchievementSuccess = (achievement) => ({
  type: "CREATE_ACHIEVEMENT_SUCCESS",
  payload: achievement,
});

export const createAchievementFailure = () => ({
  type: "CREATE_ACHIEVEMENT_FAILURE",
});

//GET ACHIEVEMENTS
export const getAchievementsStart = () => ({
  type: "GET_ACHIEVEMENTS_START",
});

export const getAchievementsSuccess = (achievements) => ({
  type: "GET_ACHIEVEMENTS_SUCCESS",
  payload: achievements,
});

export const getAchievementsFailure = () => ({
  type: "GET_ACHIEVEMENTS_FAILURE",
});

//GET ONE ACHIEVEMENT
export const getAchievementStart = () => ({
  type: "GET_ACHIEVEMENT_START",
});

export const getAchievementSuccess = (achievement) => ({
  type: "GET_ACHIEVEMENT_SUCCESS",
  payload: achievement,
});

export const getAchievementFailure = () => ({
  type: "GET_ACHIEVEMENT_FAILURE",
});

//UPDATE ACHIEVEMENT
export const updateAchievementStart = () => ({
  type: "UPDATE_ACHIEVEMENT_START",
});

export const updateAchievementSuccess = (achievement) => ({
  type: "UPDATE_ACHIEVEMENT_SUCCESS",
  payload: achievement,
});

export const updateAchievementFailure = () => ({
  type: "UPDATE_ACHIEVEMENT_FAILURE",
});

//DELETE ACHIEVEMENT
export const deleteAchievementStart = () => ({
  type: "DELETE_ACHIEVEMENT_START",
});

export const deleteAchievementSuccess = (id) => ({
  type: "DELETE_ACHIEVEMENT_SUCCESS",
  payload: id,
});

export const deleteAchievementFailure = () => ({
  type: "DELETE_ACHIEVEMENT_FAILURE",
});
