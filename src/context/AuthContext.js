import React, { useReducer } from "react";
import { LOGIN, REGISTER, LOGOUT, AUTH_ERROR } from "../config/Constants";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
        loading: false,
      };

    case REGISTER:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isAuthenticated: true,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: false,
      };

    default:
      throw new Error();
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
