import { Timestamp } from "firebase/firestore";

export interface AuthState {
  isAuthenticated: boolean;
}

export type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" };

export interface OrderDoc {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerMessage: string;
  customerImages: string[];
  timestamp: Timestamp;
}

export interface WeatherData {
  city: string;
  temp: number;
  desc: string;
  icon: string;
}
