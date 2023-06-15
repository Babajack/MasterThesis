import { RotatingLines } from "react-loader-spinner";

const LoadingComponent = () => {
	return (
		<RotatingLines
			strokeColor="grey"
			strokeWidth="5"
			animationDuration="0.75"
			width="96"
			visible={true}
		/>
	);
};

export default LoadingComponent;
