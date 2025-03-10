import { Route, Routes } from "react-router";
import style from "./boat-fix-web.module.css";
import { Footer, Header } from "./components";
import { routes } from "./routes/routes";
// import { Main } from "./pages";

export const App = () => {
  return (
    <div className={style.web_container}>
      <Header />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
};
