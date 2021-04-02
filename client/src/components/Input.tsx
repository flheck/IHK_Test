import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";

export const Input = ({
  setMessage,
  sendMessage,
  message,
}: {
  setMessage: any;
  sendMessage: any;
  message: any;
}) => {
  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField
          id="message-input"
          label={"Message"}
          name="message"
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          style={{width: "100%"}}
        />
      </Grid>
      <Grid xs={1}>
        <IconButton
          aria-label="send"
          className="sendButton"
          onClick={(e) => sendMessage(e)}
        >
          <Fab color="primary" aria-label="send">
            <SendIcon />
          </Fab>
        </IconButton>
      </Grid>
    </Grid>
  );
};
