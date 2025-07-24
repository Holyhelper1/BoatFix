import React, { useEffect, useState } from "react";
import styles from "./admin-control-orders.module.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { PrivateContent } from "../../components/private/private-content";
import { convertTimestampToDate } from "../../Utils/convertTimestampToDate";
// import cloudinaryConfig from "../../cloudinaryConfig";
// import { getPublicIdFromUrl } from "../../Utils/public-id-from-url";
import { Button } from "../../components";

export const AdminControlOrders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getNewOrders, setGetNewOrders] = useState(false);

  const openModal = (imageUrl) => {
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
      const ordersList = ordersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersList);
      setIsLoading(false);
    };
    fetchOrders();
  }, [getNewOrders]);

  // удаление изображений из Cloudinary
  // const deleteImageFromCloudinary = async (publicId) => {
  //   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`;

  //   try {
  //       const response = await fetch(cloudinaryUrl, {
  //           method: 'POST',
  //           headers: {
  //               'Authorization': `Basic ${btoa(`${cloudinaryConfig.apiKey}:${cloudinaryConfig.apiSecret}`)}`,
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //               public_id: publicId,
  //               invalidate: true,
  //           }),
  //       });

  //       if (!response.ok) {
  //           throw new Error(`Ошибка при удалении изображения: ${response.statusText}`);
  //       }

  //       console.log(`Изображение ${publicId} успешно удалено из Cloudinary.`);
  //   } catch (error) {
  //       console.error("Ошибка при удалении изображения: ", error);
  //   }
  // };

  const handleDelete = async (order) => {
    // if (order.customerImages && Array.isArray(order.customerImages)) {
    //   const deletePromises = order.customerImages.map((imageUrl) => {
    //     console.log("handleDelete - imageUrl", imageUrl);

    //     const publicId = getPublicIdFromUrl(imageUrl);
    //     if (publicId) {
    //       return deleteImageFromCloudinary(publicId);
    //     }
    //     return Promise.resolve();
    //   });

    //   await Promise.all(deletePromises);
    // } else {
    //   console.warn("customerImages не найден или не является массивом в заказе:", order);
    // }

    // Удаляем заказ из Firestore
    await deleteDoc(doc(db, "orders", order.id));
    setOrders(orders.filter((o) => o.id !== order.id));
  };

  const confirmDelete = (order) => {
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
            {isLoading && <div>Загрузка заказов...</div>}
            <Button
              className={styles.check_new_orders}
              onClick={() => setGetNewOrders(!getNewOrders)}
            >
              Обновить заказы ↩
            </Button>
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
              К сожалению на данный момент нет активных заказов 😔
            </div>
          </div>
        )}
      </PrivateContent>
    </>
  );
};
