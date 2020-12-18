import createReducer from "../createReducer";
import { LOADING, HANDLE_ERROR, SET_USER, SIGN_OFF } from "./types";

export const INITIAL_STATE_USER = {
  loading: false,
  error: false,
  errorMsn: "",
  user: null,
  token: localStorage.getItem("token"),
};

const handleError = (state, action) => {
  localStorage.removeItem("token");
  return {
    ...state,
    error: action.payload.error,
    errorMsn: action.payload.errorMsn,
  };
};

const setLoading = (state, action) => {
  return {
    ...state,
    loading: action.payload,
  };
};

const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload,
  };
};

const singOff = (state) => {
  localStorage.removeItem("token");

  return {
    ...state,
    user: null,
    token: null,
  };
};
export default createReducer(INITIAL_STATE_USER, {
  [LOADING]: setLoading,
  [HANDLE_ERROR]: handleError,
  [SET_USER]: setUser,
  [SIGN_OFF]: singOff,
});
