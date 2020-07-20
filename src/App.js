import React, { useState } from "react";
import { USER_EXISTS_QUERY } from "./graphql/queries";
import { LINK_GENERATE_MUTATION } from "./graphql/mutation";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useClient } from "./client";
import Swal from "sweetalert2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const App = () => {
  const history = useHistory();
  const client = useClient();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const goToChat = async (e) => {
    history.push("/chat/" + code, { email });
  };
  const viewUser = async (e) => {
    try {
      e.preventDefault();
      const emailck = { email };
      const response = await client.request(USER_EXISTS_QUERY, emailck);
      if (response.userExists) {
        Swal.fire({
          icon: "success",
          title: "Great",
          text: "Thank You!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Opps...",
          text: "Please register with us!",
        });
      }
      console.log({ response });
    } catch (err) {
      console.log(err);
    }
  };
  const sendLink = async (e) => {
    try {
      e.preventDefault();
      const nlink = await client.request(LINK_GENERATE_MUTATION);
      console.log(nlink.linkGenerate);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    /* <form className="container" onSubmit={viewUser}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <small id="emailHelp" className="form-text text-muted" >
          Check that you are registered with us or not!
        </small>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form> */
    <Container maxWidth="sm">
      <center
        style={{
          margin: "auto",
          position: "absolute",
          top: "50%",
        }}
      >
        <Card variant="outlined">
          <CardContent>
            {" "}
            <div>
              <TextField
                required
                id="standard-required"
                label="Enter the Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {"  "}
              <TextField
                required
                id="standard-required"
                label="Enter the Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {"  "}
              <Button variant="contained" color="success" onClick={goToChat}>
                Go to Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </center>
    </Container>
  );
};

export default App;
