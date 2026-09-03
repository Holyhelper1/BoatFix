import { useCallback, useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";
import type { OrderDoc } from "../types";
import {
  getSavedSoundId,
  playNotificationSound,
} from "../Utils/notification-sound";

const POLL_INTERVAL_MS = 1 * 60 * 1000;
const TITLE_BLINK_INTERVAL_MS = 1000;
const SEEN_AT_STORAGE_KEY = "boatfix_orders_seen_at";
const ANNOUNCED_STORAGE_KEY = "boatfix_orders_announced_count";

type PollerMode = "orders" | "archive";

interface UseOrdersPollerResult {
  orders: OrderDoc[];
  isLoading: boolean;
  isRefreshing: boolean;
  unseenCount: number;
  refresh: (toastMessage?: string) => void;
  updateOrders: (updater: (prev: OrderDoc[]) => OrderDoc[]) => void;
}

const toMilliseconds = (timestamp: OrderDoc["timestamp"]): number => {
  if (!timestamp || typeof timestamp.seconds !== "number") return 0;
  return timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6;
};

const readStoredNumber = (key: string): number | null => {
  const raw = sessionStorage.getItem(key);
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};

const formatNewOrders = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "новых заявок";
  if (lastDigit === 1) return "новая заявка";
  if (lastDigit >= 2 && lastDigit <= 4) return "новые заявки";
  return "новых заявок";
};

export const useOrdersPoller = (mode: PollerMode): UseOrdersPollerResult => {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [unseenCount, setUnseenCount] = useState(0);

  const [seenAt] = useState<number>(() => {
    const stored = readStoredNumber(SEEN_AT_STORAGE_KEY);
    if (stored !== null) return stored;
    const now = Date.now();
    sessionStorage.setItem(SEEN_AT_STORAGE_KEY, String(now));
    return now;
  });
  const seenAtRef = useRef(seenAt);
  const announcedRef = useRef(
    readStoredNumber(ANNOUNCED_STORAGE_KEY) ?? 0
  );
  const originalTitleRef = useRef(document.title);
  const isFirstFetchRef = useRef(true);

  const resetSeenState = useCallback(() => {
    const now = Date.now();
    seenAtRef.current = now;
    sessionStorage.setItem(SEEN_AT_STORAGE_KEY, String(now));
    announcedRef.current = 0;
    sessionStorage.removeItem(ANNOUNCED_STORAGE_KEY);
    setUnseenCount(0);
  }, []);

  const countUnseen = useCallback((orderList: OrderDoc[]): number => {
    const seenAt = seenAtRef.current;
    if (seenAt === null) return 0;
    return orderList.filter((order) => {
      if ((order.status ?? "new") === "done") return false;
      return toMilliseconds(order.timestamp) > seenAt;
    }).length;
  }, []);

  const fetchOrders = useCallback(
    async (showToast: boolean, toastMessage?: string) => {
      if (showToast) setIsRefreshing(true);
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

        if (showToast && toastMessage) {
          toast.success(toastMessage);
        }

        const markSeen =
          mode === "orders" &&
          (isFirstFetchRef.current || document.hasFocus());

        if (markSeen) {
          resetSeenState();
          isFirstFetchRef.current = false;
          return;
        }

        isFirstFetchRef.current = false;

        const nextUnseen = countUnseen(ordersList);
        setUnseenCount(nextUnseen);

        if (nextUnseen > announcedRef.current) {
          playNotificationSound(getSavedSoundId());
        }
        announcedRef.current = Math.max(announcedRef.current, nextUnseen);
        sessionStorage.setItem(
          ANNOUNCED_STORAGE_KEY,
          String(announcedRef.current)
        );
      } catch {
        // Ошибка чтения: текущий список остаётся на месте
        if (showToast) {
          toast.error("Не удалось обновить заказы. Проверьте правила Firestore.");
        }
      } finally {
        setIsLoading(false);
        if (showToast) setIsRefreshing(false);
      }
    },
    [countUnseen, mode, resetSeenState]
  );

  useEffect(() => {
    void fetchOrders(false);

    const intervalId = window.setInterval(() => {
      void fetchOrders(false);
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [fetchOrders]);

  useEffect(() => {
    if (unseenCount === 0) {
      document.title = originalTitleRef.current;
      return;
    }

    let blinkId = 0;

    const stopBlink = () => {
      window.clearInterval(blinkId);
      blinkId = 0;
      document.title = originalTitleRef.current;
    };

    const startBlink = () => {
      if (blinkId) return;
      const applyTitle = () => {
        document.title =
          document.title === originalTitleRef.current
            ? `\u{1F514} ${unseenCount} ${formatNewOrders(unseenCount)} | BoatFix`
            : originalTitleRef.current;
      };
      applyTitle();
      blinkId = window.setInterval(applyTitle, TITLE_BLINK_INTERVAL_MS);
    };

    const handleBlur = () => startBlink();
    const handleFocus = () => stopBlink();

    if (!document.hasFocus()) startBlink();
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      stopBlink();
    };
  }, [unseenCount]);

  useEffect(() => {
    if (mode !== "orders") return;
    const handleFocus = () => {
      void fetchOrders(false);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchOrders(false);
      }
    };
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mode, fetchOrders]);

  const refresh = useCallback(
    (toastMessage?: string) => {
      void fetchOrders(true, toastMessage);
    },
    [fetchOrders]
  );

  const updateOrders = useCallback(
    (updater: (prev: OrderDoc[]) => OrderDoc[]) => {
      setOrders(updater);
    },
    []
  );

  return {
    orders,
    isLoading,
    isRefreshing,
    unseenCount,
    refresh,
    updateOrders,
  };
};
