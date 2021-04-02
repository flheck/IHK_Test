import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

interface Response {
  responseMessage: string;
  username: string;
}

export const Messages = ({ messages }: { messages: any }) => {
  const classes = useStyles();
  return (
    <List className={classes.messageArea}>
      {messages.map((data: Response, index: number) => {
        return (
          <ListItem key={"message-" + index}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText primary={data.responseMessage} secondary={data.username}></ListItemText>
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  );
};
