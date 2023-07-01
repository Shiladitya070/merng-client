import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwttoken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwttoken"));
  // console.log("🔑", decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwttoken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  Login: (data) => {},
  Logout: () => {},
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
  const [state, dispatch] = useReducer(authReducer, initialState);
  const Login = (userData) => {
    localStorage.setItem("jwttoken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
  const Logout = () => {
    localStorage.removeItem("jwttoken");
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
