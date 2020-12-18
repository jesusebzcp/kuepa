import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../flux";
import { signOff } from "../../flux/user/actions";

const NavBar = () => {
  const { userDispatch } = useContext(StoreContext);

  return (
    <>
      <nav className="containerNav">
        <div className="containerLogo">
          <img
            src={"http://www.kuepa.com/COV2/assets/img/logo.png"}
            alt={"logo"}
          />
        </div>

        <div className="containerLinks">
          <NavLink to="/">Home</NavLink>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => signOff(userDispatch)}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
