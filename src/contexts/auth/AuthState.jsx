import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  CLEARS_ERRORS,
  LOGOUT
} from "../Types";

const AuthState = props => {
  const initialState = {
    isAuthenticated: null,
    loading: null,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUsar = async () => {
    try {
      const res = await axios.get("http://localhost/");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //  Register User
  const register = async formData => {
    const config = {
      headers: {
        "Containt-Type": "application/json"
      }
    };

    try {
      const res = await axios.post(
        "http://localhost/register",
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUsar();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        "Containt-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("http://localhost/login", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUsar();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Error
  const clearErrors = () => dispatch({ type: CLEARS_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUsar,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
