const HomeReducer = (state, action) => {
  switch (action.type) {
    case "GET_ABOUTITEM_START":
      return {
        aboutItem: null,
        isFetching: true,
        error: false,
      };
    case "GET_ABOUTITEM_SUCCESS":
      return {
        aboutItem: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ABOUTITEM_FAILURE":
      return {
        aboutItem: null,
        isFetching: false,
        error: true,
      };
    case "DELETE_ABOUTITEM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ABOUTITEM_SUCCESS":
      return {
        aboutItem: null,
        isFetching: false,
        error: false,
      };
    case "DELETE_ABOUTITEM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_ABOUTITEM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_ABOUTITEM_SUCCESS":
      return {
        aboutItem: action.payload,
        isFetching: false,
        error: false,
      };
    case "CREATE_ABOUTITEM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_ABOUTITEM_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_ABOUTITEM_SUCCESS":
      return {
        aboutItem:  action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_ABOUTITEM_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default HomeReducer;