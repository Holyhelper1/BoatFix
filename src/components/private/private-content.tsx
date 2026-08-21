import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Error } from "../error/error";
import type { RootState } from "../../store";

export const PrivateContent = ({ children }: { children: ReactNode }) => {
  const adminIsLogin = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const accessError = adminIsLogin
    ? null
    : "Доступ запрещён, пожалуйста авторизуйтесь!";
  const error = accessError;

  return error ? <Error>{error}</Error> : <>{children}</>;
};
