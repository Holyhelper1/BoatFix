import { AdminLogin } from "../components/admin-login/admin-login";
import { Main, Order } from "../pages";
import { AdminControlOrders } from "../pages/admin/admin-control-orders";
import { Contacts } from "../pages/contacts/contacts";
import { NotFound } from "../pages/not-found/not-found";

export const routes = [
  { path: "/", element: <Main /> },
  { path: "/order", element: <Order /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/adminRoom", element: <AdminLogin /> },
  { path: "/admin/control-orders", element: <AdminControlOrders /> },
  { path: "*", element: <NotFound /> },
];
