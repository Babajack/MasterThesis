import { ReactNode } from "react";
import { RotatingLines } from "react-loader-spinner";
import { LoadingStatus } from "../../types";

interface LoadingWrapperProps {
	children: ReactNode;
	errorComponent?: ReactNode;
	loadingStatus: LoadingStatus;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = (props) => {
	switch (props.loadingStatus) {
		case "Idle":
			return <></>;
		case "Pending":
			return (
				<RotatingLines
					strokeColor="grey"
					strokeWidth="5"
					animationDuration="0.75"
					width="96"
					visible={true}
				/>
			);

		case "Error":
			if (props.errorComponent) return <>{props.errorComponent}</>;
			else return <>ERROR</>;
		case "Success":
		default:
			return <>{props.children}</>;
	}
};

export default LoadingWrapper;
