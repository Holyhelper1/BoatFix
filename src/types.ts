import { Timestamp } from "firebase/firestore";

export interface AuthState {
  isAuthenticated: boolean;
  isAuthChecking: boolean;
}

export type AuthAction =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "AUTH_STATE_RESOLVED"; payload: boolean };

export type OrderStatus = "new" | "in_progress" | "done";

export interface OrderDoc {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerMessage: string;
  customerImages: string[];
  timestamp: Timestamp;
  status?: OrderStatus;
  orderNumber?: string;
  boatModel?: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  desc: string;
  icon: string;
}
