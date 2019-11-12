import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Context } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px"
  },
  chatBox: {
    width: "85%",
    paddingRight: "10px"
  },
  button: {
    width: "15%"
  }
}));

function Dashboard() {
  const classes = useStyles();

  const { allChat, sendChatAction } = useContext(Context);

  const topics = Object.keys(allChat);

  const [chatMsg, setChatMsg] = useState("");
  const [currentTopic, setCurrentTopic] = useState(topics[0]);

  const handleChange = e => {
    setChatMsg(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <Typography variant='h4' component='h4'>
        Chat App
      </Typography>
      <Typography variant='h5' component='h5'>
        {currentTopic}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map((topic, i) => (
              <ListItem
                onClick={e => setCurrentTopic(e.target.innerText)}
                key={i}
                button
              >
                <ListItemText primary={topic} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {allChat[currentTopic].map((chat, i) => (
            <div className={classes.flex} key={i}>
              <Chip label={chat.from} className={classes.chip} />
              <Typography component='p'>{chat.msg}</Typography>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          className={classes.chatBox}
          label='Outlined'
          margin='normal'
          variant='outlined'
          value={chatMsg}
          onChange={e => handleChange(e)}
        />
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          onClick={() => {
            sendChatAction({
              from: `user${Math.floor(Math.random() * 100)}`,
              msg: chatMsg,
              topic: currentTopic
            });
            setChatMsg("");
          }}
        >
          Send
        </Button>
      </div>
    </Paper>
  );
}

export default Dashboard;
