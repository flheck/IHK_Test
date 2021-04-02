import React, { useState, useEffect } from "react";
import io from "socket.io-client";

/*---Material UI---*/
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import { Input } from "./Input";
import { Messages } from "./Messages";

const useStyles = makeStyles({
  chatSection: {
    width: "100%",
    height: "80vh",
  },
});

const ENDPOINT = "http://127.0.0.1:5000";
let socket: any;

export const Chat = ({
  username,
  room,
  endChat,
}: {
  username: string;
  room: string;
  endChat: any;
}) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const init: Array<any> = [];
  const [messages, setMessages] = useState(init);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join", { username: username, room: room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      // socket.emit("disconnect");
      // socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: any) => {
    event.preventDefault();

    if (message) {
      socket.emit(
        "sendMessage",
        { message: message, username: username, room: room },
        () => setMessage("")
      );
    }
  };

  const close = () => {
    socket.emit("leave", { username: username, room: room }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="h5" className="header-message">
            Chat
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            aria-label="close"
            onClick={(e) => {
              endChat(e);
              close();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12}>
          <Messages messages={messages} />
          <Divider />
          <Input
            sendMessage={sendMessage}
            setMessage={setMessage}
            message={message}
          />
        </Grid>
      </Grid>
    </div>
  );
};
