import { useLocation, useParams } from "react-router-dom";

export const useBasePath = () => {
	const location = useLocation();
	const params = useParams<Record<string, string>>();

	return Object.values(params).reduce(
		(path, param) => path?.replace("/" + param, ""),
		location.pathname
	);
};
