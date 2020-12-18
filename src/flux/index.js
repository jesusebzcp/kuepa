import React, { createContext, useReducer } from "react";
import userReducer, { INITIAL_STATE_USER } from "./user/reducer";

export const StoreContext = createContext({});

export default function flux(props) {
  const [userState, userDispatch] = useReducer(userReducer, INITIAL_STATE_USER);

  return (
    <StoreContext.Provider
      value={{
        state: {
          userState,
        },
        userDispatch,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
}
