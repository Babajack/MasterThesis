import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserData, loginUser } from "../../redux/slices/userSlice";
import LoadingComponent from "./LoadingComponent";
import EditorComponent from "../Task/EditorComponent";
import { useEffect } from "react";

interface ProtectedRouteProps {
	element: JSX.Element;
	path: string;
}

const ProtectedRoute = () => {
	// state
	const userState = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();

	useEffect(() => {
		// fetch user data
		dispatch(getUserData());
	}, []);

	let childComponent = <></>;
	// load component based on user data
	switch (userState.loadingStatus) {
		case "Idle":
			break;
		case "Pending":
			childComponent = <LoadingComponent />;
			break;
		case "Success":
			if (userState.isLoggedIn) childComponent = <Outlet />;
			else childComponent = <Navigate to={"/auth"} state={{ from: location }} />;
			break;
		case "Error":
			childComponent = <Navigate to={"/auth"} state={{ from: location }} />;
			break;
	}

	return childComponent;
};

export default ProtectedRoute;
