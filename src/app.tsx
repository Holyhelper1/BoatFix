import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import style from "./app.module.css";
import { Footer, Header } from "./components";
import { routes } from "./routes/routes";

export const App = () => {
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
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            color: "#ffffff",
            fontFamily: "'Exo 2', system-ui, sans-serif",
          },
        }}
      />
    </div>
  );
};
