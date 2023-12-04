import AboutReducer from "./AboutReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  aboutItem: null,
  isFetching: false,
  error: false,
};

export const AboutContext = createContext(INITIAL_STATE);

export const AboutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AboutReducer, INITIAL_STATE);

  return (
    <AboutContext.Provider
      value={{
        aboutItem: state.aboutItem,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AboutContext.Provider>
  );
};