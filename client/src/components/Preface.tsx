import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";

export const Preface = ({
  setUsername,
  username,
  startChat,
}: {
  setUsername: any;
  username: string;
  startChat: any;
}) => {
  return (
    <Grid container style={{ padding: "20px" }}>

        <Grid item xs={10}>
          <TextField
            id="username-input"
            label={"Username"}
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => startChat(e)}
          >
            Start
          </Button>
        </Grid>
    </Grid>
  );
};
