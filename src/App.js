import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

//import Form from "./Form";


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
    const fetchData=async()=>{
      const register = await axios({
        method: 'get',
        url: 'http://localhost:5000/sites/user/8',
      });
      console.log(register);
      setData(register.data);
      setLoadingStatus(false);
    };
    fetchData();
  }, []);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setWebsite("");
    setUsername("");
    setPassword("");
  };
  const adddatapass = async(e) => {
    e.preventDeafult();
    const data = { website, username, password };
    const datavalue = await axios({
      method: 'post',
      url: 'http://localhost:5000/sites/9',
      data: {
        userid:9,
        password: password,
        username:username,
        website:website
      }
    });
    console.log(datavalue.data);
    //console.log({ data });
  };
const addmodal=()=>{
  return (
    <div class={`modal ${isFormVisible ? "is-active" : ""}`}>
      <div
        class="modal-background"
        onClick={() => setFormVisibility(false)}
      ></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <form >
              <div class="field">
                <label class="label">Website</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="www.google.com"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="john.doe"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input
                    class="input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
              </div>
            </form>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                <button class="button is-link" type="submit" onClick={adddatapass}>
                  Submit
                </button>
              </span>
            </p>
            <p class="card-footer-item">
              <span>
                <button class="button is-danger" onClick={clearForm}>
                  Clear
                </button>
              </span>
            </p>
          </footer>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={() => setFormVisibility(false)}
      ></button>
    </div>
  );
}
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
      {addmodal()}
    </div>
  );
};

export default App;
