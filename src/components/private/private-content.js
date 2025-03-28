import { useSelector } from "react-redux";
import { Error } from "../error/error";

export const PrivateContent = ({ children }) => {
	const adminIsLogin = useSelector((state) => state.auth.isAuthenticated);
	const accessError = adminIsLogin  ? null : "Доступ запрещён, пожалуйста авторизуйтесь!";
	const error =  accessError;   

	return error ? <Error >{error}</Error> : children;
};