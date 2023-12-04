import PersonnelReducer from "./PersonnelReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  personnels: [],
  isFetching: false,
  error: false,
};

export const PersonnelContext = createContext(INITIAL_STATE);

export const PersonnelContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PersonnelReducer, INITIAL_STATE);

  return (
    <PersonnelContext.Provider
      value={{
        personnels: state.personnels,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PersonnelContext.Provider>
  );
};