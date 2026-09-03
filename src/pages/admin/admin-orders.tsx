import { useMemo, useState } from "react";
import styles from "./admin-orders.module.css";
import {
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { PrivateContent } from "../../components/private/private-content";
import { AdminSidebar } from "../../components/admin-sidebar/admin-sidebar";
import { AdminOrderCard } from "../../components/admin-order-card/admin-order-card";
import { ConfirmDialog } from "../../components/confirm-dialog/confirm-dialog";
import { CustomSelect } from "../../components/custom-select/custom-select";
import { useOrdersPoller } from "../../hooks/use-orders-poller";
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
  const { orders, isLoading, isRefreshing, unseenCount, refresh, updateOrders } =
    useOrdersPoller("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [pendingDelete, setPendingDelete] = useState<OrderDoc | null>(null);

  const handleStatusChange = async (order: OrderDoc, status: OrderStatus) => {
    try {
      await updateDoc(doc(db, "orders", order.id), { status });
      updateOrders((prev) =>
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
      updateOrders((prev) => prev.filter((o) => o.id !== order.id));
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

  const activeCount = useMemo(() => activeOrders.length, [activeOrders]);

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
        <AdminSidebar
          activeSection="orders"
          activeCount={activeCount}
          unseenCount={unseenCount}
        />

        <main className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Управление заказами</h1>

            <div className={styles.toolbar}>
              <button
                type="button"
                className={styles.refresh}
                onClick={() => refresh("Заказы успешно обновлены")}
                disabled={isRefreshing || isLoading}
              >
                <FiRefreshCw
                  className={`${styles.refresh_icon} ${
                    isRefreshing ? styles.refresh_spin : ""
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

              <div className={styles.filter}>
                <CustomSelect
                  value={statusFilter}
                  options={STATUS_FILTER_OPTIONS}
                  onChange={(value) =>
                    setStatusFilter(value as "all" | OrderStatus)
                  }
                  ariaLabel="Фильтр по статусу"
                />
              </div>
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
