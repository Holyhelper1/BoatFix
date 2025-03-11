import React, { useState } from "react";
import { UploadButton } from "../../components";
import styles from "./order.module.css";
import toolsImg from "../../image/toolsImg.jpg";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Импортируем Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Импортируем Storage

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const db = getFirestore();
  const storage = getStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerImages = [];
      for (const file of files) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        customerImages.push(url);
      }

      const docRef = await addDoc(collection(db, "orders"), {
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerMessage: question,
        customerImages: customerImages,
        timestamp: serverTimestamp(),
      });      
      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      setFiles([]);
      setImageUrls([]);
    } catch (error) {
      console.error("Ошибка : ", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Ограничиваем количество файлов до 4
    if (selectedFiles.length + files.length > 4) {
      alert("Вы можете загрузить не более 4 изображений.");
      return;
    }
    
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...selectedFiles.map(file => URL.createObjectURL(file)),
    ]);
  };

  return (
    <div className={styles.order_container}>
      <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <div className={styles.form_box}>
          <div className={styles.formGroup_top}>
            <div className={styles.form_title}>Оставьте заявку</div>
            <input
              type="text"
              id="name"
              placeholder="Ваше имя *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup_middle}>
            <div className={styles.form_data}>
              <input
                type="tel"
                id="phone"
                placeholder="Ваш номер телефона *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_data}>
              <input
                type="email"
                id="email"
                placeholder="Ваш Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
                required
              />
            </div>
          </div>
          
          <div className={styles.formGroup_bottom}>
            <textarea
              id="question"
              placeholder="Вашe сообщение *"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <label className={styles.fileInput}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <UploadButton type="submit">
              Отправить
            </UploadButton>
          </div>
        </div>
       {imageUrls.length > 0 && (
         <div className={styles.previewImages}>
           {imageUrls.map((url, index) => (
             <div key={index} className={styles.previewImage}>
               <img src={url} alt={`Preview ${index}`} width={90} height={"auto"} />
               <button onClick={() => {
                 const newFiles = [...files];
                 newFiles.splice(index, 1);
                 setFiles(newFiles);
                 const newUrls = [...imageUrls];
                 newUrls.splice(index, 1);
                 setImageUrls(newUrls);
               }}>×</button>
             </div>
           ))}
         </div>
       )}
      </form>
      <div className={styles.imageContainer}>
        <img src={toolsImg} alt="order" />
      </div>
    </div>
  );
};




// import React, { useState } from "react";
// import { UploadButton } from "../../components";
// import styles from "./order.module.css";
// import toolsImg from "../../image/toolsImg.jpg";
// import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Импортируем Firestore
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Импортируем Storage

// export const Order = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [question, setQuestion] = useState("");
//   const [files, setFiles] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]); // Для хранения URL-адресов изображений
//   const db = getFirestore();
//   const storage = getStorage();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const customerImages = [];

//       // Загрузка файлов в Firebase Storage и получение URL
//       for (const file of files) {
//         const storageRef = ref(storage, `images/${file.name}`);
//         await uploadBytes(storageRef, file);
//         const url = await getDownloadURL(storageRef);
//         customerImages.push(url);
//       }

//       // Создаем новый документ в коллекции "orders"
//       const docRef = await addDoc(collection(db, "orders"), {
//         customerName: name,
//         customerPhone: phone,
//         customerEmail: email,
//         customerMessage: question,
//         customerImages: customerImages,
//         timestamp: serverTimestamp(),
//       });

//       console.log("Document written with ID: ", docRef.id);

//       // Очистка состояния формы после успешной отправки
//       setName("");
//       setPhone("");
//       setEmail("");
//       setQuestion("");
//       setFiles([]);
//       setImageUrls([]);
//     } catch (error) {
//       console.error("Ошибка добавления документа: ", error);
//     }
//   };

//   return (
//     <div className={styles.order_container}>
//       <form className={styles.feedbackForm} onSubmit={handleSubmit}>
//         <div className={styles.form_box}>
//           <div className={styles.formGroup_top}>
//             <div className={styles.form_title}>Оставьте заявку</div>
//             <input
//               type="text"
//               id="name"
//               placeholder="Ваше имя *"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className={styles.formGroup_middle}>
//             <div className={styles.form_data}>
//               <input
//                 type="tel"
//                 id="phone"
//                 placeholder="Ваш номер телефона *"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.form_data}>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Ваш Email *"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
          
//           <div className={styles.formGroup_bottom}>
//             <textarea
//               id="question"
//               placeholder="Вашe сообщение *"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className={styles.buttonContainer}>
//             <label className={styles.fileInput}>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => {
//                   setFiles(Array.from(e.target.files));
//                   // Обновляем предосмотр изображений
//                   const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
//                   setImageUrls(urls);
//                 }}
//               />
//             </label>

//             <UploadButton type="submit">
//               Отправить
//             </UploadButton>
//           </div>
//         </div>
//        {imageUrls.length > 0  && <div className={styles.previewImages}>
//           {imageUrls.map((url, index) => (
//             <img key={index} src={url} alt={`Preview ${index}`} className={styles.previewImage}  width={90} height={"auto"}/>
//           ))}
//           <button onClick={() => setImageUrls([])}>&times;</button>
//         </div>}
//       </form>
//       <div className={styles.imageContainer}>
//         <img src={toolsImg} alt="order" />
//       </div>
//     </div>
//   );
// };



// почти всё работает нет только отображения фоток которые загрузили, и отправки ссылок изображений
// import React, { useState } from "react";
// import { UploadButton } from "../../components";
// import styles from "./order.module.css";
// import toolsImg from "../../image/toolsImg.jpg";
// import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Импортируем serverTimestamp
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Импортируем Firebase Storage

// export const Order = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [question, setQuestion] = useState("");
//   const [files, setFiles] = useState([]); // Изменяем на массив для нескольких файлов
//   const db = getFirestore();
//   const storage = getStorage();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const customerImages = []; // Массив для хранения URL загруженных изображений

//       // Загрузка файлов в Firebase Storage и получение URL
//       for (const file of files) {
//         const storageRef = ref(storage, `images/${file.name}`); // Укажите путь для хранения изображений
//         await uploadBytes(storageRef, file); // Загружаем файл
//         const url = await getDownloadURL(storageRef); // Получаем URL
//         customerImages.push(url); // Добавляем URL в массив
//       }

//       // Создаем новый документ в коллекции "orders"
//       const docRef = await addDoc(collection(db, "orders"), {
//         customerName: name,
//         customerPhone: phone,
//         customerEmail: email,
//         customerMessage: question,
//         customerImages: customerImages,
//         timestamp: serverTimestamp(), // Автоматическая временная метка на сервере
//       });

//       console.log("Document written with ID: ", docRef.id);

//       console.log("docRef", docRef);
      
//       // Можно очистить форму или показать сообщение об успехе
//       setName("");
//       setPhone("");
//       setEmail("");
//       setQuestion("");
//       setFiles([]);
//     } catch (error) {
//       console.error("Ошибка добавления документа: ", error);
//     }
//   };

//   return (
//     <div className={styles.order_container}>
//       <form className={styles.feedbackForm} onSubmit={handleSubmit}>
//         <div className={styles.form_box}>
//           <div className={styles.formGroup_top}>
//             <div className={styles.form_title}>Оставьте заявку</div>
//             <input
//               type="text"
//               id="name"
//               placeholder="Ваше имя *"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className={styles.formGroup_middle}>
//             <div className={styles.form_data}>
//               <input
//                 type="tel"
//                 id="phone"
//                 placeholder="Ваш номер телефона *"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
                
//                 required
//               />
//             </div>
//             <div className={styles.form_data}>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Ваш Email *"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <div className={styles.formGroup_bottom}>
//             <textarea
//               id="question"
//               placeholder="Вашe сообщение *"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className={styles.buttonContainer}>
//             <label className={styles.fileInput}>
//               <input
//                 type="file"
//                 multiple // Позволяем выбор нескольких файлов
//                 accept="image/*,image/jpeg"
//                 onChange={(e) => setFiles(Array.from(e.target.files))} // Устанавливаем выбранные файлы
//               />
//             </label>

//             <UploadButton type="submit">
//               Отправить
//             </UploadButton>
//           </div>
//         </div>
//       </form>
//       <div className={styles.imageContainer}>
//         <img src={toolsImg} alt="order" />
//       </div>
//     </div>
//   );
// };




// import React, { useState } from "react";
// import { UploadButton } from "../../components";
// import styles from "./order.module.css";
// import toolsImg from "../../image/toolsImg.jpg";

// export const Order = () => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [question, setQuestion] = useState("");
//   const [file, setFile] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log({
//       name,
//       phone,
//       email,
//       question,
//       file,
//     });
//   };

//   return (
//     <div className={styles.order_container}>
//       <form className={styles.feedbackForm} onSubmit={handleSubmit}>
//         <div className={styles.form_box}>
//           <div className={styles.formGroup_top}>
//             <div className={styles.form_title}>Оставьте заявку</div>
//             <input
//               type="text"
//               id="name"
//               placeholder="Ваше имя *"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className={styles.formGroup_middle}>
//             <div className={styles.form_data}>
//               <input
//                 type="tel"
//                 id="phone"
//                 placeholder="Ваш номер телефона *"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.form_data}>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Ваш Email *"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <div className={styles.formGroup_bottom}>
//             <textarea
//               id="question"
//               placeholder="Вашe сообщение *"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className={styles.buttonContainer}>
//             <label className={styles.fileInput}>
//               <input type="file" name="file" accept="image/*,image/jpeg" />
//             </label>

//             <UploadButton type="submit" onChange={(file) => setFile(file)}>
//               Отправить
//             </UploadButton>
//           </div>
//         </div>
//       </form>
//       <div className={styles.imageContainer}>
//         <img src={toolsImg} alt="order" />
//       </div>
//     </div>
//   );
// };
