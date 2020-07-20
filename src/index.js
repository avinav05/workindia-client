import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
const App = React.lazy(() => import("./App"));
const Chat = React.lazy(() => import("./pages/chat"));



const httpLink = new HttpLink({
  uri: "http://localhost:5000/", // use https for secure endpoint
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:5000/graphql", // use wss for a secure endpoint
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(App)} />
          <Route path="/chat/:id" component={withRouter(Chat)} />
          <Route component={Error}></Route>
        </Switch>
      </Router>
    </Suspense>
  );
};
// ReactDOM.render(
//   <Router client={client}>

//   </Router>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);

serviceWorker.register();
