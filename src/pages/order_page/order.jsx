import React, { useState } from "react";
import { UploadButton } from "../../components";
import styles from "./order.module.css";
import toolsImg from "../../image/toolsImg.jpg";

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      phone,
      email,
      question,
      file,
    });
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
              <input type="file" name="file" accept="image/*,image/jpeg" />
            </label>

            <UploadButton type="submit" onChange={(file) => setFile(file)}>
              Отправить
            </UploadButton>
          </div>
        </div>
      </form>
      <div className={styles.imageContainer}>
        <img src={toolsImg} alt="order" />
      </div>
    </div>
  );
};
