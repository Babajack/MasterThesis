import * as React from "react";

interface Props {
	//result: string;
}

const PreviewComponent = (props: Props) => {
	return <iframe src="http://localhost:8000/static" className="h-100 w-100"></iframe>;
};

export default PreviewComponent;
