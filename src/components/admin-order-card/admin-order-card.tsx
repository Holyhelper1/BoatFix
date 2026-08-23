import { useEffect, useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./admin-order-card.module.css";
import { CustomSelect } from "../custom-select/custom-select";
import type { OrderDoc, OrderStatus } from "../../types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Новый",
  in_progress: "В работе",
  done: "Готово",
};

const STATUS_OPTIONS: OrderStatus[] = ["new", "in_progress", "done"];

const formatDate = (timestamp: OrderDoc["timestamp"]): string => {
  if (!timestamp || typeof timestamp.seconds !== "number") {
    return "Дата неизвестна";
  }
  const date = new Date(
    timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6
  );
  if (isNaN(date.getTime())) return "Дата неизвестна";

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};

const getWhatsAppLink = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
};

interface AdminOrderCardProps {
  order: OrderDoc;
  onStatusChange: (order: OrderDoc, status: OrderStatus) => void;
  onDelete: (order: OrderDoc) => void;
}

export const AdminOrderCard = ({
  order,
  onStatusChange,
  onDelete,
}: AdminOrderCardProps) => {
  const [previewImage, setPreviewImage] = useState("");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const status: OrderStatus = order.status ?? "new";
  const isLongDescription = order.customerMessage.length > 140;

  useEffect(() => {
    if (!previewImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImage("");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  const displayId = order.orderNumber ?? `#${order.id.slice(0, 6)}`;

  return (
    <li className={styles.card}>
      <div className={styles.card_header}>
        <span className={styles.date}>
          <FiCalendar aria-hidden="true" />
          Дата и время: {formatDate(order.timestamp)}
        </span>
        <span className={styles.order_id}>ID заказа: {displayId}</span>
        <span className={`${styles.badge} ${styles[`badge_${status}`]}`}>
          <span className={styles.badge_dot} aria-hidden="true" />
          {STATUS_LABELS[status]}
        </span>
      </div>

      <div className={styles.card_body}>
        <div className={styles.client}>
          <p className={styles.field}>
            <span className={styles.field_label}>Клиент:</span>
            <span className={styles.field_value}>{order.customerName}</span>
          </p>
          <p className={styles.field}>
            <span className={styles.field_label}>Телефон:</span>
            <span className={styles.field_value}>
              <a href={`tel:${order.customerPhone}`} className={styles.phone}>
                {order.customerPhone}
              </a>
              <a
                href={getWhatsAppLink(order.customerPhone)}
                className={styles.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Написать в WhatsApp"
                title="Написать в WhatsApp"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
            </span>
          </p>
          <p className={styles.field}>
            <span className={styles.field_label}>Email:</span>
            <span className={styles.field_value}>
              {order.customerEmail || "Не указан"}
            </span>
          </p>
          {order.boatModel && (
            <p className={styles.field}>
              <span className={styles.field_label}>Модель лодки:</span>
              <span className={styles.field_value}>{order.boatModel}</span>
            </p>
          )}
        </div>

        <div className={styles.details}>
          <p className={styles.field}>
            <span className={styles.field_label}>Описание:</span>
            <span className={styles.field_value}>
              <span
                className={`${styles.description} ${
                  !isDescriptionExpanded && isLongDescription
                    ? styles.description_clamped
                    : ""
                }`}
              >
                {order.customerMessage}
              </span>
              {isLongDescription && (
                <button
                  type="button"
                  className={styles.description_toggle}
                  onClick={() =>
                    setIsDescriptionExpanded((prev) => !prev)
                  }
                >
                  {isDescriptionExpanded
                    ? "Свернуть"
                    : "Показать полностью"}
                </button>
              )}
            </span>
          </p>
          {order.customerImages.length > 0 && (
            <div className={styles.photos_row}>
              <span className={styles.field_label}>Фото:</span>
              <div className={styles.thumbnails}>
                {order.customerImages.map((imageUrl, index) => (
                  <img
                    key={imageUrl}
                    src={imageUrl}
                    alt={`Фото заявки ${index + 1}`}
                    className={styles.thumbnail}
                    onClick={() => setPreviewImage(imageUrl)}
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.card_footer}>
        {status !== "done" && (
          <button
            type="button"
            className={styles.accept_button}
            onClick={() => onStatusChange(order, "in_progress")}
            disabled={status === "in_progress"}
          >
            <FiCheckCircle aria-hidden="true" />
            Принять в работу
          </button>
        )}

        <div className={styles.status_control}>
          <CustomSelect
            value={status}
            options={STATUS_OPTIONS.map((option) => ({
              value: option,
              label: STATUS_LABELS[option],
            }))}
            onChange={(newStatus) => onStatusChange(order, newStatus)}
            variant="outline"
            ariaLabel="Изменить статус"
          />
        </div>

        <button
          type="button"
          className={styles.delete_button}
          onClick={() => onDelete(order)}
        >
          <FiTrash2 aria-hidden="true" />
          Удалить
        </button>
      </div>

      {previewImage && (
        <div className={styles.modal} onClick={() => setPreviewImage("")}>
          <img
            src={previewImage}
            alt="Просмотр фотографии"
            className={styles.modal_image}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className={styles.close_button}
            onClick={() => setPreviewImage("")}
            aria-label="Закрыть просмотр"
          >
            <FiX aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  );
};
