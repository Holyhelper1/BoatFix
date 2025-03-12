import React, { useState } from "react";
import axios from "axios";
import styles from "./order.module.css";
import cloudinaryConfig from '../../cloudinaryConfig'; // Импортируйте вашу конфигурацию Cloudinary
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Импортируем Firestore

import toolsImg from "../../image/toolsImg.jpg"; // Импортируйте изображение для отображения
import { UploadButton } from "../../components";

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const db = getFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const customerImages = [];

      // Загрузка изображений в Cloudinary
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset); // Замените на ваше значение uploadPreset

        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData);
        const url = response.data.secure_url;
        customerImages.push(url);
      }

      // eslint-disable-next-line  
      const docRef = await addDoc(collection(db, "orders"), {
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        customerMessage: question,
        customerImages: customerImages,
        timestamp: serverTimestamp(),
      });

      // Сброс состояния формы
      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      setFiles([]);
      setImageUrls([]);
    } catch (error) {
      console.error("Ошибка при добавлении документа: ", error);
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
            <UploadButton type="submit">Отправить</UploadButton>
          </div>
        </div>

        {imageUrls.length > 0 && (
          <div className={styles.previewImages}>
            {imageUrls.map((url, index) => (
              <div key={index} className={styles.previewImage}>
                <img src={url} alt={`Preview ${index + 1}`} width={90} height="auto" />
                <button onClick={() => {
                  const newFiles = [...files];
                  newFiles.splice(index, 1);
                  setFiles(newFiles);
                  const newUrls = [...imageUrls];
                  newUrls.splice(index, 1);
                  setImageUrls(newUrls);
                }}>&times;</button>
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
