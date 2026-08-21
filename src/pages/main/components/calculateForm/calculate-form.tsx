import { useEffect, useState } from "react";
import type { ChangeEvent, DragEvent, FormEvent } from "react";
import {
  FiImage,
  FiCheckCircle,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import { PhoneInput } from "../../../../components/phone-input/phone-input";
import { useOrderSubmit } from "../../../../hooks/use-order-submit";
import { toast } from "sonner";
import styles from "./calculate-form.module.css";

const CHECKLIST = [
  "Быстрый расчет стоимости",
  "Ответ в течение 30 минут",
  "Консультация специалиста",
  "Без обязательств",
];

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

interface PreviewItem {
  file: File;
  url: string;
}

export const CalculateForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [problem, setProblem] = useState("");
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { submitOrder, isSubmitting, maxImages } = useOrderSubmit();

  useEffect(() => {
    return () => {
      setItems((prev) => {
        prev.forEach((item) => URL.revokeObjectURL(item.url));
        return [];
      });
    };
  }, []);

  const addFiles = (incoming: FileList | File[]) => {
    const incomingFiles = Array.from(incoming);
    const valid = incomingFiles.filter(
      (f) =>
        ACCEPTED_TYPES.includes(f.type) &&
        f.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );

    if (valid.length < incomingFiles.length) {
      toast.error(
        `Можно прикрепить только JPG/PNG размером до ${MAX_FILE_SIZE_MB} МБ.`
      );
    }

    const freeSlots = maxImages - items.length;
    if (freeSlots <= 0) {
      toast.error(`Можно прикрепить не более ${maxImages} изображений.`);
      return;
    }
    if (valid.length > freeSlots) {
      toast.error(`Можно прикрепить не более ${maxImages} изображений.`);
    }

    const accepted = valid.slice(0, freeSlots);
    setItems((prev) => [
      ...prev,
      ...accepted.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(items[index].url);
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearItems = () => {
    items.forEach((item) => URL.revokeObjectURL(item.url));
    setItems([]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await submitOrder({
      name,
      phone,
      message: problem,
      files: items.map((item) => item.file),
    });

    if (success) {
      setName("");
      setPhone("");
      setProblem("");
      clearItems();
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <h2 className={styles.title}>Рассчитать стоимость ремонта</h2>
          <p className={styles.subtitle}>
            Пришлите фото повреждений, и мы рассчитаем стоимость работ
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Ваше имя"
              />
              <PhoneInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <textarea
                placeholder="Опишите проблему: опишите, что случилось с вашей лодкой"
                rows={4}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                required
                aria-label="Описание проблемы"
              />
            </div>

            <div className={styles.upload_area}>
              <label
                className={`${styles.dropzone} ${
                  dragActive ? styles.dropzone_active : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <FiImage className={styles.dropzone_icon} aria-hidden="true" />
                <span className={styles.dropzone_title}>
                  Загрузите фото лодки
                </span>
                <span className={styles.dropzone_hint}>
                  Перетащите файлы сюда или нажмите для выбора
                </span>
                <span className={styles.dropzone_formats}>
                  JPG, PNG до {MAX_FILE_SIZE_MB} МБ, до {maxImages} шт.
                </span>
                <input
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  multiple
                  onChange={handleFileChange}
                  aria-label="Загрузить фотографии повреждений"
                />
              </label>

              {items.length > 0 && (
                <ul className={styles.preview_grid}>
                  {items.map((item, i) => (
                    <li key={item.url} className={styles.preview_item}>
                      <img src={item.url} alt={`Фото ${i + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        aria-label={`Удалить фото ${i + 1}`}
                      >
                        <FiX aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.aside}>
              <ul className={styles.checklist}>
                {CHECKLIST.map((item) => (
                  <li key={item}>
                    <FiCheckCircle
                      className={styles.check_icon}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                className={styles.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправляем..." : "Отправить заявку"}
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
