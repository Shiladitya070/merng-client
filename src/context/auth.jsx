import React, { createContext, useReducer } from "react";

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const Login = (userData) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const Logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, Login, Logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
