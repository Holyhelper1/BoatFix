import type { ReactElement } from "react";
import { AdminLogin } from "../components/admin-login/admin-login";
import { Main, Order, Prices } from "../pages";
import { AdminControlOrders } from "../pages/admin/admin-control-orders";
import { Contacts } from "../pages/contacts/contacts";
import { NotFound } from "../pages/not-found/not-found";
import { PrivacyPolicy } from "../pages/privacy/privacy";
import { LINKS } from "../Constants/links";

interface AppRoute {
  path: string;
  element: ReactElement;
}

export const routes: AppRoute[] = [
  { path: "/", element: <Main /> },
  { path: "/order", element: <Order /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/prices", element: <Prices /> },
  { path: LINKS.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { path: "/adminRoom", element: <AdminLogin /> },
  { path: "/admin/control-orders", element: <AdminControlOrders /> },
  { path: "*", element: <NotFound /> },
];
