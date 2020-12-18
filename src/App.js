import React, { useContext, useEffect } from "react";
import { StoreContext } from "./flux";
import Login from "./pages/Login";
//Styles
import "./styles/main.css";

//Flux
import RouterApp from "./router";
import { userAuth } from "./flux/user/actions";

function App() {
  const { state, userDispatch } = useContext(StoreContext);
  const { userState } = state;
  const { user } = userState;

  const handleAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await userAuth(token, userDispatch);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return <>{user ? <RouterApp /> : <Login />}</>;
}

export default App;
