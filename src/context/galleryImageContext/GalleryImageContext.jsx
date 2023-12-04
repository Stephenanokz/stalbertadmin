import GalleryImageReducer from "./GalleryImageReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  galleryImages: [],
  isFetching: false,
  error: false,
};

export const GalleryImageContext = createContext(INITIAL_STATE);

export const GalleryImageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GalleryImageReducer, INITIAL_STATE);

  return (
    <GalleryImageContext.Provider
      value={{
        galleryImages: state.galleryImages,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </GalleryImageContext.Provider>
  );
};