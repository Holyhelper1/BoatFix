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
import {
  FiInbox,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import { toast } from "sonner";
import type { OrderDoc, OrderStatus } from "../../types";

const STATUS_FILTER_OPTIONS: { value: "all" | OrderStatus; label: string }[] = [
  { value: "all", label: "Все статусы" },
  { value: "new", label: "Новые" },
  { value: "in_progress", label: "В работе" },
];

export const AdminOrders = () => {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getNewOrders, setGetNewOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
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

  const handleStatusChange = async (order: OrderDoc, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", order.id), { status });
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status } : o))
      );
      toast.success(
        status === "done"
          ? `Заявка #${order.orderNumber ?? order.id.slice(0, 6)} перенесена в архив`
          : "Статус заявки обновлён"
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

  const activeOrders = useMemo(
    () => orders.filter((o) => o.status !== "done"),
    [orders]
  );

  const newCount = useMemo(
    () => activeOrders.filter((o) => o.status === "new").length,
    [activeOrders]
  );

  const visibleOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return activeOrders.filter((order) => {
      if (statusFilter !== "all" && (order.status ?? "new") !== statusFilter) {
        return false;
      }
      if (!query) return true;
      const haystack = [
        order.customerName,
        order.customerPhone,
        order.customerEmail,
        order.customerMessage,
        order.boatModel ?? "",
        order.orderNumber ?? `#${order.id.slice(0, 6)}`,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeOrders, searchQuery, statusFilter]);

  return (
    <PrivateContent>
      <div className={styles.layout}>
        <AdminSidebar activeSection="orders" newCount={newCount} />

        <main className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Управление заказами</h1>

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
                Обновить заказы
              </button>

              <div className={styles.search}>
                <input
                  type="search"
                  className={styles.search_input}
                  placeholder="Поиск по заказам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Поиск по заказам"
                />
                <FiSearch className={styles.search_icon} aria-hidden="true" />
              </div>

              <label className={styles.filter}>
                <span className={styles.filter_label}>Фильтр по статусу</span>
                <select
                  className={styles.filter_select}
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as "all" | OrderStatus)
                  }
                >
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </header>

          {isLoading ? (
            <ul className={styles.order_list} aria-label="Загрузка заказов">
              {[0, 1, 2].map((i) => (
                <li key={i} className={`${styles.card_skeleton}`}>
                  <div className={styles.skeleton_line_title} />
                  <div className={styles.skeleton_line} />
                  <div className={styles.skeleton_line_short} />
                </li>
              ))}
            </ul>
          ) : visibleOrders.length > 0 ? (
            <ul className={styles.order_list}>
              {visibleOrders.map((order) => (
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
              <FiInbox className={styles.empty_icon} aria-hidden="true" />
              <h2 className={styles.empty_title}>
                {activeOrders.length === 0
                  ? "Нет активных заказов"
                  : "Ничего не найдено"}
              </h2>
              <p className={styles.empty_text}>
                {activeOrders.length === 0
                  ? "На данный момент заявки отсутствуют. Новые заказы появятся здесь после отправки клиентами формы на сайте."
                  : "По вашему запросу ничего не найдено. Измените поисковый запрос или фильтр по статусу."}
              </p>
              {activeOrders.length === 0 && (
                <p className={styles.empty_hint}>
                  Нажмите «Обновить заказы», чтобы проверить снова
                </p>
              )}
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
