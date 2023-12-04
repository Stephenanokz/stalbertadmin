import MailReducer from "./MailReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  mails: [],
  isFetching: false,
  error: false,
};

export const MailContext = createContext(INITIAL_STATE);

export const MailContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MailReducer, INITIAL_STATE);

  return (
    <MailContext.Provider
      value={{
        mails: state.mails,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};