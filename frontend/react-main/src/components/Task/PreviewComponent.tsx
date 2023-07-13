import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingWrapper from "../Utils/LoadingWrapper";

interface Props {
	//result: string;
}

const PreviewComponent = (props: Props) => {
	const status = useSelector((state: RootState) => state.task.buildStatus);

	return (
		<LoadingWrapper loadingStatus={status}>
			<iframe src="http://localhost:8000/sessionContainer" className="h-100 w-100"></iframe>
		</LoadingWrapper>
	);
};

export default PreviewComponent;
