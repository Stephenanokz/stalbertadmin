import CarouselImageReducer from "./CarouselImageReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  carouselImages: [],
  isFetching: false,
  error: false,
};

export const CarouselImageContext = createContext(INITIAL_STATE);

export const CarouselImageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CarouselImageReducer, INITIAL_STATE);

  return (
    <CarouselImageContext.Provider
      value={{
        carouselImages: state.carouselImages,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CarouselImageContext.Provider>
  );
};