//CREATE GALLERYIMAGE
export const createGalleryImageStart = () => ({
  type: "CREATE_GALLERYIMAGE_START",
});

export const createGalleryImageSuccess = (galleryImage) => ({
  type: "CREATE_GALLERYIMAGE_SUCCESS",
  payload: galleryImage,
});

export const createGalleryImageFailure = () => ({
  type: "CREATE_GALLERYIMAGE_FAILURE",
});

//GET GALLERYIMAGES
export const getGalleryImagesStart = () => ({
  type: "GET_GALLERYIMAGES_START",
});

export const getGalleryImagesSuccess = (galleryImages) => ({
  type: "GET_GALLERYIMAGES_SUCCESS",
  payload: galleryImages,
});

export const getGalleryImagesFailure = () => ({
  type: "GET_GALLERYIMAGES_FAILURE",
});

//GET ONE GALLERYIMAGE
export const getGalleryImageStart = () => ({
  type: "GET_GALLERYIMAGE_START",
});

export const getGalleryImageSuccess = (galleryImage) => ({
  type: "GET_GALLERYIMAGE_SUCCESS",
  payload: galleryImage,
});

export const getGalleryImageFailure = () => ({
  type: "GET_GALLERYIMAGE_FAILURE",
});

//UPDATE GALLERYIMAGE
export const updateGalleryImageStart = () => ({
  type: "UPDATE_GALLERYIMAGE_START",
});

export const updateGalleryImageSuccess = (galleryImage) => ({
  type: "UPDATE_GALLERYIMAGE_SUCCESS",
  payload: galleryImage,
});

export const updateGalleryImageFailure = () => ({
  type: "UPDATE_GALLERYIMAGE_FAILURE",
});

//DELETE GALLERYIMAGE
export const deleteGalleryImageStart = () => ({
  type: "DELETE_GALLERYIMAGE_START",
});

export const deleteGalleryImageSuccess = (id) => ({
  type: "DELETE_GALLERYIMAGE_SUCCESS",
  payload: id,
});

export const deleteGalleryImageFailure = () => ({
  type: "DELETE_GALLERYIMAGE_FAILURE",
});
