const AchievementReducer = (state, action) => {
  switch (action.type) {
    case "GET_ACHIEVEMENTS_START":
      return {
        achievements: [],
        isFetching: true,
        error: false,
      };
    case "GET_ACHIEVEMENTS_SUCCESS":
      return {
        achievements: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ACHIEVEMENTS_FAILURE":
      return {
        achievements: [],
        isFetching: false,
        error: true,
      };
    case "GET_ACHIEVEMENT_START":
      return {
        achievements: [],
        isFetching: true,
        error: false,
      };
    case "GET_ACHIEVEMENT_SUCCESS":
      return {
        achievements: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ACHIEVEMENT_FAILURE":
      return {
        achievements: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_ACHIEVEMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ACHIEVEMENT_SUCCESS":
      return {
        achievements: state.achievements.filter((achievement) => achievement._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_ACHIEVEMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_ACHIEVEMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_ACHIEVEMENT_SUCCESS":
      return {
        achievements: [...state.achievements, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_ACHIEVEMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_ACHIEVEMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_ACHIEVEMENT_SUCCESS":
      return {
        achievements: state.achievements.map(
          (achievement) => achievement._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_ACHIEVEMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default AchievementReducer;