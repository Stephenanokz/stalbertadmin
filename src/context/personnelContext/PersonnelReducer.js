const PersonnelReducer = (state, action) => {
  switch (action.type) {
    case "GET_PERSONNELS_START":
      return {
        personnels: [],
        isFetching: true,
        error: false,
      };
    case "GET_PERSONNELS_SUCCESS":
      return {
        personnels: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PERSONNELS_FAILURE":
      return {
        personnels: [],
        isFetching: false,
        error: true,
      };
      case "GET_PERSONNEL_START":
      return {
        personnels: [],
        isFetching: true,
        error: false,
      };
    case "GET_PERSONNEL_SUCCESS":
      return {
        personnels: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PERSONNEL_FAILURE":
      return {
        personnels: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_PERSONNEL_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_PERSONNEL_SUCCESS":
      return {
        personnels: state.personnels.filter((personnel) => personnel._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_PERSONNEL_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_PERSONNEL_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_PERSONNEL_SUCCESS":
      return {
        personnels: [...state.personnels, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_PERSONNEL_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_PERSONNEL_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_PERSONNEL_SUCCESS":
      return {
        personnels: state.personnels.map(
          (personnel) => personnel._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_PERSONNEL_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default PersonnelReducer;