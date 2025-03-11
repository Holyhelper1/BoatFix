import React, { useEffect, useState } from 'react';
import styles from './admin-control-orders.module.css';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export const AdminControlOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCollection = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    setOrders(orders.filter(order => order.id !== id)); // Удалить из локального состояния
  };

  console.log("orders", orders);
  

  return (
    <div className={styles.admin_control_container} >
      <h1>Заказы</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {order.customerName} - {order.customerPhone} - {order.customerEmail} - {order.customerMessage}
            <button onClick={() => handleDelete(order.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

