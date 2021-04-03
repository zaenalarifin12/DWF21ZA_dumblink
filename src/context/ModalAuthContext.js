import React, { useReducer, useContext } from "react";
import {
  HIDE_MODAL_AUTH_ALL,
  HIDE_MODAL_LOGIN,
  SHOW_MODAL_LOGIN,
  SHOW_MODAL_REGISTER,
} from "../config/Constants";

export const ModalAuthContext = React.createContext();

const initialState = {
  login: false,
  register: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case HIDE_MODAL_AUTH_ALL:
      return {
        login: false,
        register: false,
      };

    case SHOW_MODAL_LOGIN:
      return {
        login: true,
        register: false,
      };

    case HIDE_MODAL_LOGIN:
      return {
        login: false,
        register: false,
      };

    case SHOW_MODAL_REGISTER:
      return {
        login: false,
        register: true,
      };

    case HIDE_MODAL_LOGIN:
      return {
        login: false,
        register: true,
      };

    default:
      throw new Error();
  }
};

export const ModalAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalAuthContext.Provider value={[ state, dispatch ]}>
      {children}
    </ModalAuthContext.Provider>
  );
};
