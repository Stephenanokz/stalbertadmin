import AchievementReducer from "./AchievementReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  achievements: [],
  isFetching: false,
  error: false,
};

export const AchievementContext = createContext(INITIAL_STATE);

export const AchievementContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AchievementReducer, INITIAL_STATE);

  return (
    <AchievementContext.Provider
      value={{
        achievements: state.achievements,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
};