import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin-login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import {
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from "react-icons/fi";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN" });
      navigate("/admin/control-orders");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Не удалось войти. Проверьте ваши учетные данные.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <span className={styles.icon_badge}>
          <FiLock aria-hidden="true" />
        </span>

        <h1 className={styles.title}>Вход для администратора</h1>
        <p className={styles.subtitle}>Панель управления заявками</p>

        {error && (
          <div role="alert" className={styles.error_box}>
            <FiAlertCircle aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        <label className={styles.field}>
          <FiMail className={styles.field_icon} aria-hidden="true" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-label="Email"
          />
        </label>

        <label className={styles.field}>
          <FiLock className={styles.field_icon} aria-hidden="true" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-label="Пароль"
            className={styles.password_input}
          />
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <FiEyeOff aria-hidden="true" />
            ) : (
              <FiEye aria-hidden="true" />
            )}
          </button>
        </label>

        <button
          type="submit"
          className={styles.submit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Входим..." : "Войти"}
        </button>
      </form>
    </div>
  );
};
