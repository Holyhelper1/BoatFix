import { Route, Routes } from "react-router";
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
    </div>
  );
};
