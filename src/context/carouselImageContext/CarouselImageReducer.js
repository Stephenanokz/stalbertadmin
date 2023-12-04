const CarouselImageReducer = (state, action) => {
  switch (action.type) {
    case "GET_CAROUSELIMAGES_START":
      return {
        carouselImages: [],
        isFetching: true,
        error: false,
      };
    case "GET_CAROUSELIMAGES_SUCCESS":
      return {
        carouselImages: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CAROUSELIMAGES_FAILURE":
      return {
        carouselImages: [],
        isFetching: false,
        error: true,
      };
    case "GET_CAROUSELIMAGE_START":
      return {
        carouselImages: [],
        isFetching: true,
        error: false,
      };
    case "GET_CAROUSELIMAGE_SUCCESS":
      return {
        carouselImages: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CAROUSELIMAGE_FAILURE":
      return {
        carouselImages: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_CAROUSELIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_CAROUSELIMAGE_SUCCESS":
      return {
        carouselImages: state.carouselImages.filter((carouselImage) => carouselImage._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_CAROUSELIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_CAROUSELIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_CAROUSELIMAGE_SUCCESS":
      return {
        carouselImages: [...state.carouselImages, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_CAROUSELIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_CAROUSELIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_CAROUSELIMAGE_SUCCESS":
      return {
        carouselImages: state.carouselImages.map(
          (carouselImage) => carouselImage._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_CAROUSELIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CarouselImageReducer;