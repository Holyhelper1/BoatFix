// import { Error } from '../components/error-message/error-message';
// import { ERROR } from '../constants/error';

import { AdminLogin } from "../components/admin-login/admin-login";  
import { Main, Order } from "../pages";
import { AdminControlOrders } from "../pages/admin/admin-control-orders";
import { Contacts } from "../pages/contacts/contacts";

export const routes = [
  { path: "/", element: <Main /> },
  { path: "/order", element: <Order /> },
  { path: "/contacts", element: <Contacts /> },
  { path: "/adminRoom", element: <AdminLogin /> },
  { path: '/admin/control-orders', element: <AdminControlOrders /> },
  // { path: '/contacts', element: <Contacts /> },
  // { path: '/user_account/:login/:id', element: <UserAccount /> },
  // { path: '/hotel', element: <HotelPage /> },
  // { path: '/hotel/:id', element: <HotelPage /> },
  // { path: '/hotel/:id/edit', element: <HotelPage /> },
  // { path: '*', element: <Error message={ERROR.PAGE_NOT_EXIST} /> },
];
