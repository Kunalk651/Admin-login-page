import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import M from "materialize-css/dist/js/materialize.min.js";

const Register = () => {
  const authContext = useContext(AuthContext);

  const { register } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      M.Toast({ html: "Please fill all the fields." });
    } else if (password !== password2) {
      M.Toast({ html: "Password does not match." });
    } else {
      register({
        name,
        email,
        password
      });
    }
  };
  return (
    <div className="row center">
      <form className="col s8 " onSubmit={onSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name"
              type="text"
              name="name"
              className="validate"
              onChange={onChange}
            />
            <label for="name">Name</label>
          </div>
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              name="email"
              className="validate"
              onChange={onChange}
            />
            <label for="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              name="password"
              className="validate"
              onChange={onChange}
            />
            <label for="password">Password</label>
          </div>
        </div>
        <input
          className="btn red accent-1 col s12"
          type="submit"
          value="Sign Up"
        />
      </form>
    </div>
  );
};

export default Register;
