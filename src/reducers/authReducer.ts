import type { AnyAction } from "redux";
import type { AuthState } from "../types";

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthChecking: true,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AnyAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, isAuthChecking: false };
    case "LOGOUT":
      return { isAuthenticated: false, isAuthChecking: false };
    case "AUTH_STATE_RESOLVED":
      return {
        isAuthenticated: action.payload as boolean,
        isAuthChecking: false,
      };
    default:
      return state;
  }
};
