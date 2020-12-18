import React, { useContext, useState } from "react";
import Lottie from "react-lottie";

//Flux
import { StoreContext } from "../../flux";
import {
  handleError,
  loginDispatch,
  registryDispatch,
} from "../../flux/user/actions";

//Components
import Error from "../../components/Error";
import { lottie1 } from "../../constants";
import Title from "../../components/Title";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  moderator: false,
};

const Login = () => {
  const { state, userDispatch } = useContext(StoreContext);
  const { userState } = state;
  const { error, errorMsn, loading } = userState;

  const [newUser, setNewUser] = useState(true);
  const [value, setValue] = useState(INITIAL_STATE);

  //console.log("env", process.env.REACT_APP_URL);

  const onChangeText = (target, name) => {
    setValue({ ...value, [target]: name });
  };
  const handleStatus = () => {
    setValue(INITIAL_STATE);
    setNewUser(!newUser);
  };

  const handleRegistry = async (e) => {
    e.preventDefault();

    const { name, email, password } = value;

    if (email === "" || name === "" || password === "") {
      return handleError(
        { error: true, errorMsn: "Todos los campos son requeridos" },
        userDispatch
      );
    }

    await registryDispatch(value, userDispatch);
    setValue(INITIAL_STATE);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = value;

    if (email === "" || password === "") {
      return handleError(
        { error: true, errorMsn: "Todos los campos son requeridos" },
        userDispatch
      );
    }

    await loginDispatch({ email, password }, userDispatch);
    setValue(INITIAL_STATE);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={"containerLogin"}>
      <div className="containerLottie">
        <div className="containerTitle">
          <Title />
        </div>
        <Lottie options={defaultOptions} />
      </div>

      <div className={"containerLogin"}>
        {error && (
          <div className="containerErro">
            <Error msn={errorMsn} />
          </div>
        )}

        {newUser ? (
          <>
            <div className="containerForm">
              <div className="logoForm">
                <img
                  src={"http://www.kuepa.com/COV2/assets/img/logo.png"}
                  alt={"kuepa"}
                />
                <small>Estas a un paso de lograrlo</small>
              </div>

              <form onSubmit={handleRegistry}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name={"name"}
                    value={value.name}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name={"email"}
                    value={value.email}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name={"password"}
                    value={value.password}
                    onChange={(e) =>
                      onChangeText(e.target.name, e.target.value)
                    }
                  />
                </div>
                <div className="footerBtns">
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <div className="spinner-border" role="status"></div>
                    ) : (
                      "Registrarme"
                    )}
                  </button>

                  <span className="underline" onClick={() => handleStatus()}>
                    Ya tengo cuenta!
                  </span>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="containerForm">
            <div className="logoForm">
              <img
                src={"http://www.kuepa.com/COV2/assets/img/logo.png"}
                alt={"kuepa"}
              />
              <small>Inicia sesión para que puedes lograrlo</small>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control"
                  name={"email"}
                  value={value.email}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name={"password"}
                  value={value.password}
                  onChange={(e) => onChangeText(e.target.name, e.target.value)}
                />
              </div>
              <div className="footerBtns">
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <div className="spinner-border" role="status"></div>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>

                <span className="underline" onClick={() => handleStatus()}>
                  No tengo cuenta!
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
