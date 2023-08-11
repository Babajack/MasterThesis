import { Navigate, Outlet, Route, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserData, loginUser } from "../../redux/slices/userSlice";
import LoadingWrapper from "./LoadingWrapper";
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
		//if (!userState.isLoggedIn) dispatch(getUserData());
		dispatch(getUserData());
	}, []);

	// let navigateToLogin = <Navigate to={"/auth"} state={{ from: location }} />;
	let navigateToLogin = <Navigate to={"/auth"} />;

	return (
		<LoadingWrapper loadingStatus={userState.loadingStatus} errorComponent={navigateToLogin}>
			{userState.isLoggedIn ? <Outlet /> : navigateToLogin}
		</LoadingWrapper>
	);

	/* let childComponent = <></>;
	// load component based on user data
	switch (userState.loadingStatus) {
		case "Idle":
			break;
		case "Pending":
			childComponent = <LoadingWrapper />;
			break;
		case "Success":
			if (userState.isLoggedIn) childComponent = <Outlet />;
			else childComponent = <Navigate to={"/auth"} state={{ from: location }} />;
			break;
		case "Error":
			childComponent = <Navigate to={"/auth"} state={{ from: location }} />;
			break;
	} */
};

export default ProtectedRoute;
