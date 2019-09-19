import React, { useContext, Fragment } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import UserContext from "../../contexts/user/userContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const userContext = userContext(UserContext);
  const { deleteUser } = userContext;
  const onDelete = () => {
    deleteUser(user._id);
  };
  return (
    <Fragment>
      <a className="dropdown-trigger btn" href="#" data-target="dropdown1">
        Users
      </a>
      <ul id="dropdown1" className="dropdown-content">
        <li>
          <p>{user.id}</p>
          <button className="btn" onClick={onDelete}>
            Delete
          </button>
        </li>
      </ul>
    </Fragment>
  );
};

export default Home;
