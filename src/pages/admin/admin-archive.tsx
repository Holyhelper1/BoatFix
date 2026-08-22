import { useEffect, useMemo, useState } from "react";
import styles from "./admin-orders.module.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { PrivateContent } from "../../components/private/private-content";
import { AdminSidebar } from "../../components/admin-sidebar/admin-sidebar";
import { AdminOrderCard } from "../../components/admin-order-card/admin-order-card";
import { ConfirmDialog } from "../../components/confirm-dialog/confirm-dialog";
import { FiArchive, FiRefreshCw } from "react-icons/fi";
import { toast } from "sonner";
import type { OrderDoc, OrderStatus } from "../../types";

export const AdminArchive = () => {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getNewOrders, setGetNewOrders] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<OrderDoc | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersList: OrderDoc[] = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<OrderDoc, "id">),
        }));
        ordersList.sort((a, b) => {
          const aSeconds = a.timestamp?.seconds ?? 0;
          const bSeconds = b.timestamp?.seconds ?? 0;
          return bSeconds - aSeconds;
        });
        setOrders(ordersList);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [getNewOrders]);

  const doneOrders = useMemo(
    () => orders.filter((o) => o.status === "done"),
    [orders]
  );

  const newCount = useMemo(
    () =>
      orders.filter((o) => o.status === "new").length,
    [orders]
  );

  const handleStatusChange = async (order: OrderDoc, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", order.id), { status });
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status } : o))
      );
      toast.success(
        status === "done"
          ? "Заявка перенесена в архив"
          : "Заявка возвращена в активные"
      );
    } catch {
      toast.error("Не удалось изменить статус. Проверьте правила Firestore.");
    }
  };

  const handleDelete = async (order: OrderDoc) => {
    try {
      await deleteDoc(doc(db, "orders", order.id));
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
      toast.success("Заявка успешно удалена");
    } catch {
      toast.error("Не удалось удалить заявку. Проверьте правила Firestore.");
    }
  };

  const confirmDelete = (order: OrderDoc) => {
    setPendingDelete(order);
  };

  return (
    <PrivateContent>
      <div className={styles.layout}>
        <AdminSidebar activeSection="archive" newCount={newCount} />

        <main className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Архив заказов</h1>

            <div className={styles.toolbar}>
              <button
                type="button"
                className={styles.refresh}
                onClick={() => setGetNewOrders((v) => !v)}
              >
                <FiRefreshCw
                  className={`${styles.refresh_icon} ${
                    isLoading ? styles.refresh_spin : ""
                  }`}
                  aria-hidden="true"
                />
                Обновить архив
              </button>
            </div>
          </header>

          {isLoading ? (
            <ul className={styles.order_list} aria-label="Загрузка архива">
              {[0, 1].map((i) => (
                <li key={i} className={styles.card_skeleton}>
                  <div className={styles.skeleton_line_title} />
                  <div className={styles.skeleton_line} />
                  <div className={styles.skeleton_line_short} />
                </li>
              ))}
            </ul>
          ) : doneOrders.length > 0 ? (
            <ul className={styles.order_list}>
              {doneOrders.map((order) => (
                <AdminOrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onDelete={confirmDelete}
                />
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <FiArchive className={styles.empty_icon} aria-hidden="true" />
              <h2 className={styles.empty_title}>Архив пуст</h2>
              <p className={styles.empty_text}>
                Здесь появятся заявки со статусом «Готово». Чтобы завершить
                заявку, смените её статус на странице активных заказов.
              </p>
            </div>
          )}
        </main>

        <ConfirmDialog
          isOpen={pendingDelete !== null}
          title="Удалить заявку?"
          message={
            pendingDelete
              ? `Заявка ${pendingDelete.orderNumber ?? `#${pendingDelete.id.slice(0, 6)}`} будет удалена безвозвратно. Это действие нельзя отменить.`
              : ""
          }
          onConfirm={() => {
            if (pendingDelete) handleDelete(pendingDelete);
            setPendingDelete(null);
          }}
          onCancel={() => setPendingDelete(null)}
        />
      </div>
    </PrivateContent>
  );
};
