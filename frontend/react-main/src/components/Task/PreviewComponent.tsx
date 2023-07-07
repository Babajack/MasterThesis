import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LoadingComponent from "../Utils/LoadingComponent";

interface Props {
	//result: string;
}

const PreviewComponent = (props: Props) => {
	const status = useSelector((state: RootState) => state.task.buildStatus);
	if (status === "Pending") return <LoadingComponent />;
	else
		return <iframe src="http://localhost:8000/sessionContainer" className="h-100 w-100"></iframe>;
};

export default PreviewComponent;
