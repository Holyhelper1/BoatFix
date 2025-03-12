import React, { useEffect, useState } from "react";
import styles from "./admin-control-orders.module.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { PrivateContent } from "../../components/private/private-content";
import { convertTimestampToDate } from "../../Utils/convertTimestampToDate";

export const AdminControlOrders = () => {
  // const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    setOrders(orders.filter((order) => order.id !== id));
  };

  console.log("order", orders);
  return (
    <PrivateContent>
      {orders.length > 0 ? (
        <div className={styles.admin_control_container}>
          <h1 className={styles.admin_control_tittle}>Активные заказы</h1>
          <ul className={styles.order_list}>
            {orders.map((order) => (
              <li key={order.id} className={styles.order_item}>
                <div className={styles.order_details}>
                  <div>                   
                    {convertTimestampToDate(order.timestamp)} - обращения
                  </div>{" "}
                  <hr></hr>
                  <div>Имя клиента: {order.customerName}</div>{" "}
                  <div>
                    Контактные данные клиента:{" "}
                    <a
                      className={styles.order_phone}
                      href={`tel:${order.customerPhone}`}
                    >
                      {order.customerPhone}{" "}
                    </a>
                    <br></br>
                    Почта: {order.customerEmail}
                  </div>{" "}
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
                    />
                  ))}
                </div>
                <button
                  className={styles.delete_button}
                  onClick={() => handleDelete(order.id)}
                >
                  Удалить
                </button>
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
        <div className={styles.admin_control_empty}>
          {" "}
          К сожалению на данный момент нет активных заказов 😔
        </div>
      )}
    </PrivateContent>
  );
};
