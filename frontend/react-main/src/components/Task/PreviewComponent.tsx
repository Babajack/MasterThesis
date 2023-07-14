import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingWrapper from "../Utils/LoadingWrapper";

interface Props {
	//result: string;
}

const PreviewComponent = (props: Props) => {
	const taskState = useSelector((state: RootState) => state.task);

	return (
		<LoadingWrapper loadingStatus={taskState.buildStatus}>
			{taskState.errors ? (
				// <div className="" style={{ color: "red" }}>
				// 	{taskState.errors}
				// </div>
				<div
					dangerouslySetInnerHTML={{ __html: taskState.errors }}
					style={{ whiteSpace: "pre-line", color: "red" }}
				></div>
			) : (
				<iframe src="http://localhost:8000/sessionContainer" className="h-100 w-100"></iframe>
			)}
		</LoadingWrapper>
	);
};

export default PreviewComponent;
