import * as React from "react";
import { CodeType, Errors, LoadingStatus, TestResults } from "../../types";
import LoadingWrapper from "../Utils/LoadingWrapper";
import { MDBIcon } from "mdb-react-ui-kit";

interface PreviewComponentProps {
	buildStatus: LoadingStatus;
	errors?: Errors | string;
	testResults?: TestResults;
	type: CodeType;
}

const PreviewComponent: React.FC<PreviewComponentProps> = (props) => {
	// const taskState = useSelector((state: RootState) => state.task);

	const errors = Array.isArray(props.errors)
		? props.errors?.map((error) => {
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
		  })
		: props.errors;

	const testResults = props.testResults?.map((elem, index) => {
		return (
			<div key={index}>
				<span className="pe-4">{++index + ". " + elem.title}</span>
				{elem.status === "passed" ? (
					<span className="float-end" style={{ color: "green" }}>
						<MDBIcon fas icon="check" />
					</span>
				) : (
					<span className="float-end" style={{ color: "red" }}>
						<MDBIcon fas icon="times" />
					</span>
				)}
			</div>
		);
	});

	const getSuccessResult = () => {
		if (!props.testResults?.some((result) => result.status !== "passed")) {
			return <h3 style={{ color: "green" }}>Aufgabe gelöst!</h3>;
		}
	};

	return (
		<LoadingWrapper loadingStatus={props.buildStatus}>
			{props.testResults ? (
				<>
					<h3>Test Results:</h3>
					<div className="text-start pb-5">{testResults}</div>
					{getSuccessResult()}
				</>
			) : props.errors ? (
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
