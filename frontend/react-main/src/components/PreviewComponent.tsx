import * as React from "react";

interface Props {
	result: string;
}

const PreviewComponent = (props: Props) => {
	return <div>{props.result}</div>;
};

export default PreviewComponent;
