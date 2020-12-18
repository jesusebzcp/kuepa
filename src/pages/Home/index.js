import React, { useContext, useEffect } from "react";
import Chat from "../../components/Chat";
import Video from "../../components/Video";
import { astro } from "../../constants";
import { StoreContext } from "../../flux";

import util from "../../util";
import socket from "../../config/socket";

const Home = () => {
  const { state } = useContext(StoreContext);
  const { userState } = state;
  const { user } = userState;

  useEffect(() => {
    if (user) {
      socket.emit("connection client", user._id);
    }

    return socket.off();
  }, [user]);

  return (
    <div className={"container"}>
      <div className={"profile"}>
        <img src={astro} />
        <h2>Bienvenido, {user && util.capitalize(user.name)}</h2>
      </div>

      <div className="contentHome">
        <div className="containerVideo">
          <Video />
        </div>
        <div className="containerChat">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
