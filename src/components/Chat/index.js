import React, { useContext, useEffect, useState } from "react";
import socket from "../../config/socket";
import { astro } from "../../constants";
import { StoreContext } from "../../flux";
import util from "../../util";

const Chat = () => {
  const { state } = useContext(StoreContext);
  const { userState } = state;
  const { user } = userState;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    socket.emit("send message", user.name, message);
  };

  useEffect(() => {
    socket.on("messages", (msn) => {
      console.log("msn =>", msn);
      const newMessage = Object.assign(msn, {
        date: Date.now(),
        id: util.create_id(),
      });
      setMessages([...messages, newMessage]);

      localStorage.setItem(
        "messages",
        JSON.stringify([...messages, newMessage])
      );
    });

    return () => {
      socket.off();
    };
  }, [message]);

  useEffect(() => {
    let messageLocal = localStorage.getItem("messages");
    if (messageLocal) {
      setMessages(JSON.parse(messageLocal));
    }
  }, []);

  return (
    <div className="containerChat">
      <h4>Chat (Tiempo real)</h4>

      <div className={"chat"}>
        <img src={astro} />
        <textarea
          type="text"
          className="form-control"
          placeholder={"Escribe un mensaje"}
          cols={2}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary mt-3"
          disabled={message.length > 1 ? false : true}
          onClick={(e) => sendMessage(e.target.value)}
        >
          Enviar
        </button>
      </div>

      {messages && messages.length > 0 && (
        <div className="contBurble">
          {messages.map((msn, index) => {
            return (
              <div
                key={msn.id}
                className={util.compareNumber(index) ? "burble" : "burble2"}
              >
                <div className="contAuthor">
                  <p className="author">{util.capitalize(msn.name)}</p>
                  <p className="date">
                    Enviado hace: {util.lastMinute(msn.date)}
                  </p>
                </div>
                <p className="msn">{msn.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Chat;
