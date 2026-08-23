import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import style from "./app.module.css";
import { Footer, Header } from "./components";
import { routes } from "./routes/routes";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "AUTH_STATE_RESOLVED",
        payload: Boolean(user),
      });
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className={style.web_container}>
      <Header />
      <main className={style.main_content}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e1e",
            border: "1px solid rgba(0, 160, 233, 0.25)",
            color: "#ffffff",
            fontFamily: "'Exo 2', system-ui, sans-serif",
            opacity: 1,
          },
          classNames: {
            success: "toast-success",
            error: "toast-error",
            warning: "toast-warning",
            info: "toast-info",
          },
        }}
      />
    </div>
  );
};
