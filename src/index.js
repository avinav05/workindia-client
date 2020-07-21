import React from "react";
import ReactDOM from "react-dom";
import "bulma/css/bulma.css";
import "./index.css";
import { Suspense, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



const App = React.lazy(() => import('./App'));
const Root = () => {
return (
  <Suspense fallback={<h1>Loading</h1>}>
    <Router>
      
        <Switch>
          <Route exact path="/" component={App} />
          
        </Switch>
      
    </Router>
  </Suspense>
);
}
ReactDOM.render(<Root />, document.getElementById('root'));

