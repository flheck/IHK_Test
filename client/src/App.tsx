import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { Chat } from "./components/Chat";
import { Preface } from "./components/Preface";

export const App = () => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [toggleChat, setToggleChat] = useState(false);

  const startChat = (event: any) => {
    event.preventDefault();


    if (username !== "") {
      setToggleChat(!toggleChat);
      setRoomId(uuidv4());
    }
  };

  const endChat = (event: any) => {
    event.preventDefault();
    setToggleChat(!toggleChat);
    setUsername("");
    setRoomId(uuidv4());
  }

  return (
    <div className="App">
      {toggleChat ? (
        <Chat username={username} room={roomId} endChat={endChat} />
      ) : (
        <Preface setUsername={setUsername} username={username} startChat={startChat} />
      )}
    </div>
  );
};
