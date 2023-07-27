import * as React from "react";
import { CodeType, Errors, LoadingStatus } from "../../types";
import LoadingWrapper from "../Utils/LoadingWrapper";

interface PreviewComponentProps {
	buildStatus: LoadingStatus;
	errors?: Errors;
	type: CodeType;
}

const PreviewComponent: React.FC<PreviewComponentProps> = (props) => {
	// const taskState = useSelector((state: RootState) => state.task);

	const errors = props.errors?.map((error) => {
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
		<LoadingWrapper loadingStatus={props.buildStatus}>
			{props.errors ? (
				// <div className="" style={{ color: "red" }}>
				// 	{taskState.errors}
				// </div>
				<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors}</div>
			) : (
				<iframe
					src={`http://localhost:8000/sessionContainer?type=${props.type}`}
					className="h-100 w-100"
				></iframe>
			)}
		</LoadingWrapper>
	);
};

export default PreviewComponent;
