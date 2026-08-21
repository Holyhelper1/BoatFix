import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import styles from "./order.module.css";
import cloudinaryConfig from "../../cloudinaryConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import toolsImg from "../../image/toolsImg.jpg";
import { UploadButton } from "../../components";
import { PhoneInput } from "../../components/phone-input/phone-input";
import { Modal } from "../../components/modal/modal";

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const customerImages: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", cloudinaryConfig.uploadPreset as string);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          formData
        );
        customerImages.push(response.data.secure_url);
      }

      await addDoc(collection(db, "orders"), {
        customerName: name.trim(),
        customerPhone: phone,
        customerEmail: email.trim(),
        customerMessage: question.trim(),
        customerImages,
        timestamp: serverTimestamp(),
      });

      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      setFiles([]);
      setImageUrls([]);
      setSuccessMessage(
        "Заявка успешно отправлена, ожидайте от нас обратного звонка."
      );
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ошибка при отправке заявки: ", error);
      setErrorMessage(
        "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз."
      );
      setIsModalOpen(true);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    if (selectedFiles.length + files.length > 4) {
      alert("Вы можете загрузить не более 4 изображений.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    const newUrls = [...imageUrls];
    URL.revokeObjectURL(newUrls[index]);
    newUrls.splice(index, 1);
    setImageUrls(newUrls);
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
              <PhoneInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.form_data}>
              <input
                type="email"
                id="email"
                title="Введите корректную электронную почту"
                placeholder="Ваш Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formGroup_bottom}>
            <textarea
              id="question"
              placeholder="Ваше сообщение *"
              title="Опишите повреждение лодки"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
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
                <img src={url} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  className={styles.order_image_closeButton}
                  onClick={() => removeImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </form>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setErrorMessage("");
            setSuccessMessage("");
          }}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      )}
      <div className={styles.order_tools_imageContainer}>
        <img src={toolsImg} alt="Ремонт ПВХ лодок" />
      </div>
    </div>
  );
};
