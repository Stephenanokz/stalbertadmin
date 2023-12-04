const GalleryImageReducer = (state, action) => {
  switch (action.type) {
    case "GET_GALLERYIMAGES_START":
      return {
        galleryImages: [],
        isFetching: true,
        error: false,
      };
    case "GET_GALLERYIMAGES_SUCCESS":
      return {
        galleryImages: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_GALLERYIMAGES_FAILURE":
      return {
        galleryImages: [],
        isFetching: false,
        error: true,
      };
    case "GET_GALLERYIMAGE_START":
      return {
        galleryImages: [],
        isFetching: true,
        error: false,
      };
    case "GET_GALLERYIMAGE_SUCCESS":
      return {
        galleryImages: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_GALLERYIMAGE_FAILURE":
      return {
        galleryImages: [],
        isFetching: false,
        error: true,
      };
    case "DELETE_GALLERYIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_GALLERYIMAGE_SUCCESS":
      return {
        galleryImages: state.galleryImages.filter((galleryImage) => galleryImage._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_GALLERYIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "CREATE_GALLERYIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_GALLERYIMAGE_SUCCESS":
      return {
        galleryImages: [...state.galleryImages, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_GALLERYIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case "UPDATE_GALLERYIMAGE_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_GALLERYIMAGE_SUCCESS":
      return {
        galleryImages: state.galleryImages.map(
          (galleryImage) => galleryImage._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_GALLERYIMAGE_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default GalleryImageReducer;