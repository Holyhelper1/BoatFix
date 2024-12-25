
// import { Error } from '../components/error-message/error-message';
// import { ERROR } from '../constants/error';

import { Main, Order } from "../pages";

export const routes = [
	{ path: '/BoatFix', element: <Main /> },
	{ path: '/order', element: <Order /> },
	// { path: '/registration', element: <Registration /> },
	// { path: '/contacts', element: <Contacts /> },
	// { path: '/user_account/:login/:id', element: <UserAccount /> },
	// { path: '/admin_page/booking_history', element: <AdminPage /> },
	// { path: '/hotel', element: <HotelPage /> },
	// { path: '/hotel/:id', element: <HotelPage /> },
	// { path: '/hotel/:id/edit', element: <HotelPage /> },
	// { path: '*', element: <Error message={ERROR.PAGE_NOT_EXIST} /> },
];
 