import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./order.module.css";
import toolsImg from "../../image/toolsImg.jpg";
import { UploadButton } from "../../components";
import { PhoneInput } from "../../components/phone-input/phone-input";
import { useOrderSubmit } from "../../hooks/use-order-submit";

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { submitOrder, isSubmitting, maxImages } = useOrderSubmit();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await submitOrder({
      name,
      phone,
      email,
      message: question,
      files,
    });

    if (success) {
      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      files.forEach((_, i) => URL.revokeObjectURL(imageUrls[i]));
      setFiles([]);
      setImageUrls([]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    if (selectedFiles.length + files.length > maxImages) {
      alert(`Вы можете загрузить не более ${maxImages} изображений.`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setImageUrls((prevUrls) => [
      ...prevUrls,
      ...selectedFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imageUrls[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
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
            <UploadButton type="submit" disabled={isSubmitting}>
              Отправить
            </UploadButton>
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
      <div className={styles.order_tools_imageContainer}>
        <img src={toolsImg} alt="Ремонт ПВХ лодок" />
      </div>
    </div>
  );
};
