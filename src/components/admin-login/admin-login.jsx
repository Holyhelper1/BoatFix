import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin-login.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Button } from "../button/button";
import { UploadButton } from "../upload_button/upload_button";

export const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log(userCredential);

      navigate("/admin/control-orders");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Не удалось войти. Проверьте ваши учетные данные.");
    }
  };

   return (
    <>
      {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}
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
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <UploadButton>Войти</UploadButton>
      </form>
    </>
  );
  
};





// import React, { useState, 
//   // useEffect 
// } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./admin-login.module.css";
// import { signInWithEmailAndPassword, 
//   // onAuthStateChanged 
// } from "firebase/auth";
// import { auth } from "../../firebase";
// // import { AdminControlOrders } from "../../pages/admin/admin-control-orders";

// export const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   // const [successLogin, setSuccessLogin] = useState(false);
//   const [error, setError] = useState("");
  
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const unsubscribe = onAuthStateChanged(auth, (user) => {
//   //     if (user) {
//   //       setSuccessLogin(true);
//   //     }
//   //   });

//   //   return () => unsubscribe(); // Очистка подписки при размонтировании
//   // }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Успешно вошли
//         console.log(userCredential);
//         // setSuccessLogin(true);

//         // Перенаправление на страницу управления заказами
//         navigate("/admin/control-orders"); 
//       })
//       .catch((error) => {
//         console.error("Ошибка входа:", error);
//         setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
//       });
//   };

//   return (
//     <>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       <form className={styles.loginForm} onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Пароль"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Войти</button>
//       </form>
//       {/* {successLogin && <AdminControlOrders />} */}
//     </>
//   );
// };
