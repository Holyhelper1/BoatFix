import { useEffect, useState } from "react";
import styles from "./admin-control-orders.module.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { PrivateContent } from "../../components/private/private-content";
import { convertTimestampToDate } from "../../Utils/convertTimestampToDate";
import type { OrderDoc } from "../../types";

export const AdminControlOrders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getNewOrders, setGetNewOrders] = useState(false);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList: OrderDoc[] = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<OrderDoc, "id">),
      }));
      setOrders(ordersList);
      setIsLoading(false);
    };
    fetchOrders();
  }, [getNewOrders]);

  const handleDelete = async (order: OrderDoc) => {
    await deleteDoc(doc(db, "orders", order.id));
    setOrders(orders.filter((o) => o.id !== order.id));
  };

  const confirmDelete = (order: OrderDoc) => {
    if (window.confirm("Вы уверены, что хотите удалить заказ?")) {
      handleDelete(order);
      alert("Заказ успешно удален");
    }
  };

  return (
    <>
      <PrivateContent>
        {orders.length > 0 ? (
          <div className={styles.admin_control_container}>
            <h2 className={styles.admin_control_tittle}>Активные заказы</h2>
            {isLoading && (
              <div className={styles.loading}>Загрузка заказов...</div>
            )}
            <button
              className={styles.refresh_button}
              onClick={() => setGetNewOrders(!getNewOrders)}
            >
              ↻ Обновить заказы
            </button>
            <ul className={styles.order_list}>
              {orders.map((order) => (
                <li key={order.id} className={styles.order_item}>
                  <div className={styles.order_details}>
                    <div className={styles.order_date_container}>
                      <div>
                        {convertTimestampToDate(order.timestamp)} - обращения
                      </div>
                      <button
                        className={styles.delete_button}
                        onClick={() => confirmDelete(order)}
                      >
                        Удалить заказ
                      </button>
                    </div>
                    <hr></hr>
                    <div>Имя клиента: {order.customerName}</div>
                    <div>
                      Контактные данные клиента:
                      <a
                        className={styles.order_phone}
                        href={"tel:" + order.customerPhone}
                      >
                        {`${order.customerPhone}`}
                      </a>
                      <br></br>
                      Почта:{" "}
                      {order.customerEmail
                        ? order.customerEmail
                        : "почта не указана"}
                    </div>
                    <div>Описание проблемы: {order.customerMessage}</div>
                  </div>
                  <div className={styles.order_images}>
                    {order.customerImages.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Customer ${index}`}
                        className={styles.order_image}
                        onClick={() => openModal(imageUrl)}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            {isModalOpen && (
              <div className={styles.modal} onClick={closeModal}>
                <img
                  src={selectedImage}
                  alt="Large View"
                  className={styles.modal_image}
                />
                <button className={styles.close_button} onClick={closeModal}>
                  ×
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.admin_control_empty_container}>
            <div className={styles.admin_control_empty}>
              <span className={styles.admin_control_empty_icon}>
                &#128338;
              </span>
              <div className={styles.admin_control_empty_title}>
                Нет активных заказов
              </div>
              <p>
                На данный момент заявки отсутствуют. Новые заказы появятся
                здесь после отправки клиентами формы на сайте.
              </p>
              <div className={styles.admin_control_empty_sub}>
                Нажмите «Обновить заказы», чтобы проверить снова
              </div>
            </div>
          </div>
        )}
      </PrivateContent>
    </>
  );
};
