import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReduser from "./userReduser";

import { DELETE_USER, USER_ERROR } from "../Types";

const ContactState = props => {
  const initialState = {
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(UserReduser, initialState);

  const deleteUser = async id => {
    try {
      await axios.delete(`http://localhost/user/:${id}`);

      dispatch({ type: DELETE_USER, payload: id });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.response.msg });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.contacts,
        deleteUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContactState;
