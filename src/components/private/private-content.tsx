import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Error } from "../error/error";
import type { RootState } from "../../store";

export const PrivateContent = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isAuthChecking } = useSelector(
    (state: RootState) => state.auth
  );

  if (isAuthChecking) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
          color: "#aaaaaa",
        }}
        role="status"
      >
        Проверяем доступ...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Error>Доступ запрещён, пожалуйста авторизуйтесь!</Error>;
  }

  return <>{children}</>;
};
