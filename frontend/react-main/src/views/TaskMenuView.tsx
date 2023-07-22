import { MDBAccordion, MDBAccordionItem, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskSchema } from "../types";

const TaskMenuView = () => {
	const userState = useSelector((state: RootState) => state.user);

	const tasksByCategory = userState.tasks.reduce(
		(prev, cur) => {
			const index = prev.findIndex((elem) => elem.category === cur.task.category);
			if (index === -1) {
				prev.push({ category: cur.task.category, tasks: [cur.task] });
			} else {
				prev[index].tasks.push(cur.task);
			}
			return prev;
		},
		[] as { category: string; tasks: TaskSchema[] }[]
	);

	return (
		<MDBContainer fluid className="h-100 g-0">
			<MDBRow className="h-100 g-0 justify-content-center align-items-center">
				<MDBCol md={8}>
					<MDBAccordion alwaysOpen initialActive={undefined}>
						{tasksByCategory.map((taskByCategory, index) => {
							return (
								<MDBAccordionItem
									key={taskByCategory.category}
									collapseId={++index}
									headerTitle={taskByCategory.category}
								>
									<ul>
										{taskByCategory.tasks
											.sort((a, b) => a.index - b.index)
											.map((task) => {
												return <li key={task.index}>Aufgabe {task.index}</li>;
											})}
									</ul>
								</MDBAccordionItem>
							);
						})}
					</MDBAccordion>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskMenuView;
