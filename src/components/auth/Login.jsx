import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import M from "materialize-css/dist/js/materialize.min.js";

const Login = () => {
  const authContext = useContext(AuthContext);

  const { login } = authContext;

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const { email, password } = user;
  if (!email || !password) {
    M.Toast({ html: "Please fill all the fields" });
  }
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login({
      email,
      password
    });
  };
  return (
    <div className="row center">
      <form className="col s8 " onSubmit={onSubmit}>
        <div className="row">
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
          value="Sign In"
        />
      </form>
    </div>
  );
};

export default Login;
