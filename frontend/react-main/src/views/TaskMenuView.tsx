import {
	MDBAccordion,
	MDBAccordionItem,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardTitle,
	MDBCol,
	MDBContainer,
	MDBIcon,
	MDBListGroup,
	MDBListGroupItem,
	MDBRow,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskSchemaFrontend } from "../types";
import { getTasksByCategory } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const TaskMenuView = () => {
	//const userState = useSelector((state: RootState) => state.user);

	const tasksByCategory = useSelector(getTasksByCategory);
	const navigate = useNavigate();

	return (
		<MDBContainer fluid className="h-100 g-0 ">
			<MDBRow className="h-100 g-0 justify-content-center align-items-start pt-5">
				<MDBCol md={6}>
					<MDBCard className="app-secondary app-text-primary">
						<MDBCardBody>
							<MDBCardTitle>Select a task</MDBCardTitle>
							<MDBAccordion initialActive={undefined}>
								{tasksByCategory.map((taskByCategory, index) => {
									return (
										<MDBAccordionItem
											className="app-text-primary"
											key={taskByCategory.category}
											collapseId={++index}
											headerTitle={taskByCategory.category}
										>
											<MDBListGroup>
												{taskByCategory.tasks
													.sort((a, b) => a.task.index - b.task.index)
													.map((task) => {
														return (
															<MDBListGroupItem
																tag={"button"}
																key={task.task._id}
																className="app-text-primary"
																action
																disabled={!(task.isUnlocked || task.task.isDefaultUnlocked)}
																onClick={() => {
																	navigate(`/task/${task.task._id}`);
																}}
															>
																<MDBRow>
																	<MDBCol sm={2} className="d-flex justify-content-start">
																		{/* {task.task.index} */}
																	</MDBCol>
																	<MDBCol sm={8} className="d-flex justify-content-center">
																		{task.task.title}
																	</MDBCol>
																	<MDBCol sm={2} className="d-flex justify-content-end">
																		{(task.userSolution?.length ?? 0) > 0 && (
																			<span className="">
																				<MDBIcon style={{ color: "green" }} fas icon="check" />
																			</span>
																		)}
																	</MDBCol>
																</MDBRow>
															</MDBListGroupItem>
														);
													})}
											</MDBListGroup>
										</MDBAccordionItem>
									);
								})}
							</MDBAccordion>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default TaskMenuView;
