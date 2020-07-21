import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

import Form from "./Form";


const renderCards = (data) => (
  <div className="columns is-multiline">
    {data.map((e, i) => (
      <div className="column is-4" key={i}>
        <div className="card">
          <header className="card-header is-shadowless">
            <p className="card-header-title">{e.website}</p>
            {/* <a href="#" className="card-header-icon" aria-label="more options">
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a> */}
          </header>
          <div className="card-content">
            <div className="content">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label is-family-monospace">Username</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        class="input"
                        type="text"
                        value={e.username}
                        disabled
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label is-family-monospace">Password</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="control has-icons-left">
                      <input
                        class="input"
                        type="text"
                        value={e.password}
                        disabled
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="card-footer has-text-right" style={{ border: 0 }}>
            <a href="#" className="card-footer-item">
              Delete
            </a>
          </footer>
        </div>
      </div>
    ))}
  </div>
);
const App = () => {
  const [isLoading, setLoadingStatus] = useState(true);
  const [data, setData] = useState([]);
  const [isFormVisible, setFormVisibility] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/sites/user/9')
    .then(function (response) {
      setData(response);
      setLoadingStatus(false);
    })
  }, []);

  return (
    <div className="App">
      <div className="container has-text-centered">
        {isLoading ? <div>Loading...</div> : renderCards(data)}

        <button
          className="button is-link is-light"
          onClick={() => setFormVisibility(true)}
        >
          Add more
        </button>
      </div>
      <Form {...{ isFormVisible, setFormVisibility }} />
    </div>
  );
};

export default App;
