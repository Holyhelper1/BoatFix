import { AnyAction } from "redux";
import { AuthState } from "../types";

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
