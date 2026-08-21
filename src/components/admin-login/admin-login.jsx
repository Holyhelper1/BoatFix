import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin-login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { UploadButton } from "../upload_button/upload_button";
import { useDispatch } from "react-redux";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);      
      
      dispatch({ type: 'LOGIN' });
      navigate("/admin/control-orders");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Не удалось войти. Проверьте ваши учетные данные.");
    }
  };

   return (
    <>
      {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
      <div className={styles.admin_login_wrapper}>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.inputField}
          type={showPassword}
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span
            className={styles.passwordToggle}
            onClick={() =>
              setShowPassword(showPassword === "password" ? "text" : "password")
            }
          >
            {showPassword === "password" ? "👁" : "👁️"}
          </span>
        <UploadButton>Войти</UploadButton>
      </form>
      </div>
      
    </>
  );
  
};

