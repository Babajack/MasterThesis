import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingWrapper from "../Utils/LoadingWrapper";

const PreviewComponent: React.FC = () => {
	const taskState = useSelector((state: RootState) => state.task);

	const errors = taskState.errors?.map((error) => {
		return (
			<div key={error.filename}>
				<h3>{error.filename}</h3>
				{error.errors.map((e) => {
					return (
						<div key={e.line}>
							line {e.line}: {e.message}
						</div>
					);
				})}
			</div>
		);
	});

	return (
		<LoadingWrapper loadingStatus={taskState.buildStatus}>
			{taskState.errors ? (
				// <div className="" style={{ color: "red" }}>
				// 	{taskState.errors}
				// </div>
				<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors}</div>
			) : (
				<iframe src="http://localhost:8000/sessionContainer" className="h-100 w-100"></iframe>
			)}
		</LoadingWrapper>
	);
};

export default PreviewComponent;
