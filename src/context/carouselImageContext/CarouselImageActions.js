//CREATE CAROUSEL IMAGE
export const createCarouselImageStart = () => ({
  type: "CREATE_CAROUSELIMAGE_START",
});

export const createCarouselImageSuccess = (carouselImage) => ({
  type: "CREATE_CAROUSELIMAGE_SUCCESS",
  payload: carouselImage,
});

export const createCarouselImageFailure = () => ({
  type: "CREATE_CAROUSELIMAGE_FAILURE",
});

//GET CAROUSEL IMAGES
export const getCarouselImagesStart = () => ({
  type: "GET_CAROUSELIMAGES_START",
});

export const getCarouselImagesSuccess = (carouselImages) => ({
  type: "GET_CAROUSELIMAGES_SUCCESS",
  payload: carouselImages,
});

export const getCarouselImagesFailure = () => ({
  type: "GET_CAROUSELIMAGES_FAILURE",
});

//GET ONE CAROUSEL IMAGE
export const getCarouselImageStart = () => ({
  type: "GET_CAROUSELIMAGE_START",
});

export const getCarouselImageSuccess = (carouselImage) => ({
  type: "GET_CAROUSELIMAGE_SUCCESS",
  payload: carouselImage,
});

export const getCarouselImageFailure = () => ({
  type: "GET_CAROUSELIMAGE_FAILURE",
});

//UPDATE CAROUSEL IMAGE
export const updateCarouselImageStart = () => ({
  type: "UPDATE_CAROUSELIMAGE_START",
});

export const updateCarouselImageSuccess = (carouselImage) => ({
  type: "UPDATE_CAROUSELIMAGE_SUCCESS",
  payload: carouselImage,
});

export const updateCarouselImageFailure = () => ({
  type: "UPDATE_CAROUSELIMAGE_FAILURE",
});

//DELETE CAROUSEL IMAGE
export const deleteCarouselImageStart = () => ({
  type: "DELETE_CAROUSELIMAGE_START",
});

export const deleteCarouselImageSuccess = (id) => ({
  type: "DELETE_CAROUSELIMAGE_SUCCESS",
  payload: id,
});

export const deleteCarouselImageFailure = () => ({
  type: "DELETE_CAROUSELIMAGE_FAILURE",
});
