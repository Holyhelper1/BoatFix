import { useState } from "react";
import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
} from "react";
import {
  FiArrowRight,
  FiAward,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiEdit3,
  FiPhone,
  FiShield,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import styles from "./order.module.css";
import { PhoneInput } from "../../components/phone-input/phone-input";
import { ConsentCheckbox } from "../../components/consent-checkbox/consent-checkbox";
import {
  FaqAccordion,
  type FaqItem,
} from "../../components/faq-accordion/faq-accordion";
import { useOrderSubmit } from "../../hooks/use-order-submit";
import { toast } from "sonner";

const STEPS = [
  {
    icon: FiEdit3,
    title: "Данные о повреждении",
    text: "Опишите проблему и загрузите фото",
  },
  {
    icon: FiPhone,
    title: "Контактная информация",
    text: "Укажите удобный способ связи с вами",
  },
  {
    icon: FiCheckCircle,
    title: "Подтверждение заявки",
    text: "Мы свяжемся с вами и рассчитаем стоимость",
  },
];

const ADVANTAGES = [
  {
    icon: FiClock,
    title: "Расчёт бесплатно за 1 часа",
    text: "Оценим стоимость по фото в течение 1 часа",
  },
  {
    icon: FiShield,
    title: "Гарантия 1 месяц на все работы",
    text: "Предоставляем официальную гарантию на все виды ремонта",
  },
  {
    icon: FiAward,
    title: "Опытные специалисты",
    text: "Профессиональный ремонт ПВХ лодок любой сложности",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Сколько стоит ремонт?",
    answer:
      "Стоимость зависит от характера повреждения и модели лодки. Пришлите фото повреждения через форму заявки — мы бесплатно рассчитаем стоимость в течение 1 часа.",
  },
  {
    question: "Как быстро вы сможете сделать ремонт?",
    answer:
      "Мелкий ремонт (проколы, небольшие порезы) обычно занимает от 1 часа до одного дня. Более сложный ремонт или тюнинг — от 2 до 5 дней. Точный срок назовём после осмотра фото или лодки.",
  },
  {
    question: "Даёте ли гарантию на работы?",
    answer:
      "Да, мы предоставляем официальную гарантию 1 месяц на все виды ремонта. Если проблема повторится — устраним её бесплатно.",
  },
  {
    question: "Какие материалы используются при ремонте?",
    answer:
      "Работаем только с сертифицированными ПВХ-материалами и клеями проверенных производителей, подобранными под ткань вашей лодки.",
  },
];

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

interface PreviewItem {
  file: File;
  url: string;
}

interface FieldErrors {
  name?: boolean;
  phone?: boolean;
  message?: boolean;
  consent?: boolean;
}

export const Order = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [consent, setConsent] = useState(false);
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [shakeKey, setShakeKey] = useState(0);
  const { submitOrder, isSubmitting, maxImages } = useOrderSubmit();

  const addFiles = (incoming: FileList | File[]) => {
    const incomingFiles = Array.from(incoming);
    const valid = incomingFiles.filter(
      (f) =>
        ACCEPTED_TYPES.includes(f.type) &&
        f.size <= MAX_FILE_SIZE_MB * 1024 * 1024
    );

    if (valid.length < incomingFiles.length) {
      toast.warning(
        `Можно прикрепить только JPG/PNG размером до ${MAX_FILE_SIZE_MB} МБ.`
      );
    }

    const freeSlots = maxImages - items.length;
    if (freeSlots <= 0) {
      toast.warning(`Можно прикрепить не более ${maxImages} изображений.`);
      return;
    }
    if (valid.length > freeSlots) {
      toast.warning(`Можно прикрепить не более ${maxImages} изображений.`);
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

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: false }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors: FieldErrors = {
      name: !name.trim(),
      phone: !phone.trim(),
      message: !question.trim(),
      consent: !consent,
    };

    if (nextErrors.name || nextErrors.phone || nextErrors.message || nextErrors.consent) {
      setErrors(nextErrors);
      setShakeKey((k) => k + 1);
      toast.warning("Заполните обязательные поля и подтвердите согласие.");
      return;
    }

    const success = await submitOrder({
      name,
      phone,
      email,
      message: question,
      files: items.map((item) => item.file),
    });

    if (success) {
      setName("");
      setPhone("");
      setEmail("");
      setQuestion("");
      setConsent(false);
      clearItems();
    }
  };

  return (
    <div className="container">
      <div className={styles.order}>
        <aside className={styles.sidebar}>
        <section className={styles.card}>
          <h2 className={styles.card_title}>Как мы работаем</h2>
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.step_number}>{index + 1}</span>
                <span className={styles.step_body}>
                  <span className={styles.step_title}>{step.title}</span>
                  <span className={styles.step_text}>{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.card}>
          <ul className={styles.advantages}>
            {ADVANTAGES.map((advantage) => (
              <li key={advantage.title} className={styles.advantage}>
                <advantage.icon
                  className={styles.advantage_icon}
                  aria-hidden="true"
                />
                <span>
                  <span className={styles.advantage_title}>
                    {advantage.title}
                  </span>
                  <span className={styles.advantage_text}>
                    {advantage.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${styles.card} ${styles.faq_card}`}>
          <h2 className={styles.card_title}>Часто задаваемые вопросы</h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </section>
      </aside>

      <section className={styles.form_card}>
        <h1 className={styles.form_title}>Оставьте заявку</h1>
        <p className={styles.form_subtitle}>
          Заполните форму — свяжемся с вами для уточнения деталей
        </p>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
          key={shakeKey}
        >
          <div className={styles.fields_row}>
            <label className={styles.field}>
              <FiEdit3 className={styles.field_icon} aria-hidden="true" />
              <input
                type="text"
                placeholder="Ваше имя *"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                aria-label="Ваше имя"
                aria-invalid={errors.name || undefined}
                className={errors.name ? styles.input_error : ""}
              />
              {errors.name && (
                <span role="alert" className={styles.field_hint}>
                  Введите ваше имя
                </span>
              )}
            </label>

            <label className={styles.field}>
              <FiPhone className={styles.field_icon} aria-hidden="true" />
              <PhoneInput
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearError("phone");
                }}
                aria-invalid={errors.phone || undefined}
                className={errors.phone ? styles.input_error : ""}
              />
              {errors.phone && (
                <span role="alert" className={styles.field_hint}>
                  Укажите номер телефона
                </span>
              )}
            </label>
          </div>

          <label className={styles.field}>
            <FiClipboard className={styles.field_icon} aria-hidden="true" />
            <input
              type="email"
              placeholder="Ваш Email (необязательно)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Ваш Email"
            />
          </label>

          <label className={styles.field}>
            <FiEdit3 className={styles.field_icon} aria-hidden="true" />
            <textarea
              placeholder="Опишите повреждение или желаемый тюнинг *"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                clearError("message");
              }}
              rows={5}
              aria-label="Описание повреждения"
              aria-invalid={errors.message || undefined}
              className={errors.message ? styles.input_error : ""}
            />
            {errors.message && (
              <span role="alert" className={styles.field_hint}>
                Опишите задачу
              </span>
            )}
          </label>

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
            <FiUploadCloud className={styles.dropzone_icon} aria-hidden="true" />
            <span className={styles.dropzone_title}>
              Перетащите фото повреждений сюда
            </span>
            <span className={styles.dropzone_hint}>
              или{" "}
              <span className={styles.dropzone_link}>выберите файл</span>
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
              {items.map((item, index) => (
                <li key={item.url} className={styles.preview_item}>
                  <img src={item.url} alt={`Фото ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    aria-label={`Удалить фото ${index + 1}`}
                    className={styles.preview_remove}
                  >
                    <FiX aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправляем..." : "Отправить заявку"}
            {!isSubmitting && <FiArrowRight aria-hidden="true" />}
          </button>

          <ConsentCheckbox
            checked={consent}
            onChange={(checked) => {
              setConsent(checked);
              clearError("consent");
            }}
            error={errors.consent}
          />
        </form>
      </section>
      </div>
    </div>
  );
};
