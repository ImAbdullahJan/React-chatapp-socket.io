import React, { useReducer } from "react";
import io from "socket.io-client";

export const Context = React.createContext();

/*
msgObj {
    from: 'user',
    msg: 'Hello',
}

state {
    topic1: [
        {msgObj1}, {msgObj2}, {msgObj3}
    ],
    topic2: [
        {msgObj1}, {msgObj2}, {msgObj3}
    ]
}
*/

const initState = {
  topic1: [
    { from: "user1", msg: "Hello" },
    { from: "user2", msg: "Hi" },
    { from: "user3", msg: "Bye" }
  ],
  topic2: [
    { from: "user4", msg: "Hello1" },
    { from: "user5", msg: "Hi1" },
    { from: "user6", msg: "Bye1" }
  ]
};

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };

    default:
      return state;
  }
};

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

const Store = props => {
  const [allChat, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat message", function(msg) {
      console.log(msg);
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  return (
    <Context.Provider value={{ allChat, sendChatAction }}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;
