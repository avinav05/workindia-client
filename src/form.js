import React, { useState } from "react";

const Form = ({ isFormVisible, setFormVisibility }) => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const handleFormSubmit = (e) => {
    e.preventDeafult();
    const data = { website, username, password };
    console.log({ data });
  };

  return (
    <div class={`modal ${isFormVisible ? "is-active" : ""}`}>
      <div
        class="modal-background"
        onClick={() => setFormVisibility(false)}
      ></div>
      <div class="modal-content">
        <div class="card">
          <div class="card-content">
            <form onSubmit={handleFormSubmit}>
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
                <button class="button is-link" type="submit">
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
};

export default Form;
