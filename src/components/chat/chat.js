import { SEND_MESSAGE_MUTATION } from "../graphql/mutation";
import React, { useState } from "react";
import { GET_CHAT_DETAILS } from "../graphql/subscription";
import { useClient } from "../client";
import Swal from "sweetalert2";
import { useSubscription } from "react-apollo";
const Chat = () => {
  const [chat, setChat] = useState([]);
  useSubscription(GET_CHAT_DETAILS, {
    variables: { link: "0p3hHqj4N" },

    onSubscriptionData: (options) => {
      setChat(options.subscriptionData.data.getChatDetails);
      console.log(options.subscriptionData.data.getChatDetails[0]);
    },
  });

  return (
    <div className="container">
      <form className="container">
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Message</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Start Chatting
        </button>
      </form>
      {chat.map((e) => (
        <p>
          {e.email}:{e.text}
        </p>
      ))}
    </div>
  );
};

export default Chat;
