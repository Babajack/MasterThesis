import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TaskDescriptionComponent = () => {
	const taskState = useSelector((state: RootState) => state.task);

	return (
		<div className="h-100 app-secondary app-text-primary">
			<h3 className="pt-3"> {taskState.task.title} </h3>
		</div>
	);
};

export default TaskDescriptionComponent;
