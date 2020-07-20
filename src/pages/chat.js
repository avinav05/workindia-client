import { SEND_MESSAGE_MUTATION } from "../graphql/mutation";
import { GET_CHAT_DETAILS } from "../graphql/queries";
import React, { useState, useEffect } from "react";
import { GET_CHAT_DETAIL } from "../graphql/subscription";
import { useMutation, useQuery, useApolloClient } from "@apollo/react-hooks";
import GridList from "@material-ui/core/GridList";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import GridListTile from "@material-ui/core/GridListTile";
import { useSubscription } from "react-apollo";
import { printIntrospectionSchema } from "graphql";
import { useHistory } from "react-router-dom";
const Chat = (props) => {
  const client = useApolloClient();
  const history = useHistory();
  const [email, setEmail] = useState(
    props.history.location.state
      ? props.history.location.state.email
      : "undefined"
  );
  const [ema, setEma] = useState("");
  const goToChat = async (e) => {
    window.location.reload();
    history.push("/chat/" + props.match.params.id, {
      email: ema,
    });
  };
  const [check, setCheck] = useState(false);
  const [mess, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const { res } = useQuery(GET_CHAT_DETAILS, {
    variables: { link: props.match.params.id },
    onCompleted: (data) => {
      setChat(data.getChat);
    },
  });

  useSubscription(GET_CHAT_DETAIL, {
    variables: { link: props.match.params.id },

    onSubscriptionData: (options) => {
      setChat(options.subscriptionData.data.getChatDetails);
      //console.log(options.subscriptionData.data.getChatDetails[0]);
    },
  });
  const [send] = useMutation(SEND_MESSAGE_MUTATION);
  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      send({
        variables: { text: mess, link: props.match.params.id, email },
        onCompleted: (data) => {
          setMessage("");
        },
      });
    } catch (err) {}
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      scrollBehavior: "auto",
    },
    gridList: {
      width: 450,
      height: 350,
    },
  }));
  const classes = useStyles();

  return (
    <div className="container">
      {email === "undefined" ? (
        <div>
          <center
            style={{
              margin: "0",
              position: "absolute",
              top: "50%",
            }}
          >
            <Card variant="outlined">
              <CardContent>
                <TextField
                  required
                  id="standard-required1"
                  label="Enter the Email"
                  value={ema}
                  onChange={(e) => setEma(e.target.value)}
                />
                {"  "}
                <Button variant="contained" color="success" onClick={goToChat}>
                  Go to Chat
                </Button>
              </CardContent>
            </Card>
          </center>
        </div>
      ) : (
        <div>
          <br />
          <br />
          <center>
            <Card variant="outlined">
              <GridList cellHeight={16} className={classes.gridList} cols={1}>
                {chat.map((e) => (
                  <p autofocus>
                    {e.email}:{e.text}
                  </p>
                ))}
              </GridList>

              <CardContent>
                <form onSubmit={sendMessage}>
                  <TextField
                    required
                    id="standard-required1"
                    label="Enter the Message"
                    multiline
                    rowsMax={4}
                    value={mess}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {"  "}
                  <Button type="submit" variant="contained" color="success">
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>
          </center>
        </div>
      )}
    </div>
  );
};

export default Chat;
