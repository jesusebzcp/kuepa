import { HANDLE_ERROR, LOADING, SET_USER, SIGN_OFF } from "./types";

//Constants
import { END_POINT_USER, END_POINT_AUTH } from "../../constants";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";

export const handleError = (
  { error, errorMsn = "Ocurrido algo inesperado" },
  dispatch
) => {
  console.log("errorMsn  ==>", errorMsn);
  setLoading(false, dispatch);
  dispatch({ type: HANDLE_ERROR, payload: { error, errorMsn } });
  setTimeout(() => {
    dispatch({ type: HANDLE_ERROR, payload: { error: false, errorMsn: "" } });
  }, 5000);
};

export const setLoading = (loading, dispatch) => {
  return dispatch({ type: LOADING, payload: loading });
};

export const registryDispatch = async (user, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await clientAxios.post(END_POINT_USER, user);

    userAuth(res.data.token, dispatch);

    setLoading(false, dispatch);
  } catch (error) {
    console.log("error handleRegistry =>", error);

    handleError({ error: true, errorMsn: error.response.data.msn }, dispatch);
  }
};

export const loginDispatch = async (user, dispatch) => {
  try {
    setLoading(true, dispatch);

    const res = await clientAxios.post(END_POINT_AUTH, user);
    userAuth(res.data.token, dispatch);
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error loginDispatch =>", error.response);

    handleError({ error: true, errorMsn: error.response.data.msn }, dispatch);
  }
};

export const userAuth = async (token, dispatch) => {
  localStorage.setItem("token", token);
  if (token) {
    tokenAuth(token);
  }
  try {
    setLoading(true, dispatch);
    const response = await clientAxios.get(END_POINT_AUTH);
    dispatch({ type: SET_USER, payload: response.data.user });
    setLoading(false, dispatch);
  } catch (error) {
    console.log("error userAuth =>", error.response);
    handleError({ error: true, errorMsn: error.response.data.msn }, dispatch);
  }
};
export const signOff = (dispatch) => {
  dispatch({ type: SIGN_OFF });
};
