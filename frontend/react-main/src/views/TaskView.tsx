import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import EditorComponent from "../components/Task/EditorComponent";
import PreviewComponent from "../components/Task/PreviewComponent";
import { AppDispatch, RootState } from "../redux/store";
import {
	addNewFile,
	deleteFileByName,
	fetchTask,
	runTest,
	setCurrentFiles,
	setLoadingStatus,
	runCode,
	updateFile,
	setShowConfetti,
} from "../redux/slices/taskSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingWrapper from "../components/Utils/LoadingWrapper";
import TaskDescriptionComponent from "../components/Task/TaskDescriptionComponent";
import { getIndexOfLastTaskByCategory, updateUserCode } from "../redux/slices/userSlice";
import { TaskCategory } from "../types";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const TaskMenuView = () => {
	const dispatch = useDispatch<AppDispatch>();
	const taskState = useSelector((state: RootState) => state.task);
	const userState = useSelector((state: RootState) => state.user);
	const showRunCodeBtn = !(
		taskState.task.category === "JavaScript Basics" ||
		(taskState.task.category == "JSX" && taskState.task.index < 3)
	);
	const { taskId } = useParams();
	const navigate = useNavigate();
	const taskCategories: TaskCategory[] = [
		"JavaScript Basics",
		"JSX",
		"Components",
		"Interactivity",
		"Practise",
	];
	const lastIndex = getIndexOfLastTaskByCategory(userState.tasks, taskState.task.category);
	const { width, height } = useWindowSize();

	const nextTask =
		taskState.task.index === lastIndex
			? userState.tasks.find(
					(elem) =>
						elem.task.category ===
							taskCategories[
								taskCategories.findIndex((category) => category === taskState.task.category) + 1
							] &&
						elem.task.index === 1 &&
						(elem.isUnlocked || elem.task.isDefaultUnlocked)
			  )
			: userState.tasks.find(
					(elem) =>
						elem.task.category === taskState.task.category &&
						elem.task.index === taskState.task.index + 1 &&
						(elem.isUnlocked || elem.task.isDefaultUnlocked)
			  );
	const previousTask =
		taskState.task.index === 1
			? userState.tasks.find(
					(elem) =>
						elem.task.category ===
							taskCategories[
								taskCategories.findIndex((category) => category === taskState.task.category) - 1
							] &&
						elem.task.index === getIndexOfLastTaskByCategory(userState.tasks, elem.task.category) &&
						(elem.isUnlocked || elem.task.isDefaultUnlocked)
			  )
			: userState.tasks.find(
					(elem) =>
						elem.task.category === taskState.task.category &&
						elem.task.index === taskState.task.index - 1
			  );

	useEffect(() => {
		dispatch(fetchTask(taskId ?? ""));
	}, [, taskId]);

	/**
	 * cleanup on unmount
	 */
	useEffect(() => {
		return () => {
			dispatch(setLoadingStatus("Idle"));
			// dispatch(
			// 	updateUserCode({ files: taskState.currentFiles, type: "task", taskId: taskState.task._id })
			// );
		};
	}, []);

	useEffect(() => {
		setTimeout(() => dispatch(setShowConfetti(false)), 4000);
	}, [taskState.showConfetti]);

	return (
		<LoadingWrapper loadingStatus={taskState.loadingStatus}>
			<MDBContainer fluid className="g-0 d-flex flex-column flex-grow-1">
				<Confetti height={height} width={width} numberOfPieces={taskState.showConfetti ? 100 : 0} />
				<MDBRow className="g-0 flex-grow-1">
					<MDBCol xxl={4} lg={12} className="d-flex flex-grow-1 p-2" style={{ maxHeight: "90vh" }}>
						<TaskDescriptionComponent />
					</MDBCol>
					<MDBCol
						xl={4}
						lg={12}
						/* style={{ height: "90%" }} */ className="d-flex flex-grow-1 px-2 py-1"
					>
						<EditorComponent
							defaultFilename={
								taskState.task.category === "JavaScript Basics" ? "index.js" : "App.js"
							}
							shouldNotValidateCode={true}
							buildStatus={taskState.buildStatus}
							currentFiles={taskState.currentFilesMap[taskId as string] ?? []}
							onAddFile={(file) => {
								return new Promise((resolve) => {
									dispatch(addNewFile({ filename: file.filename })).then((res) => {
										if (res.meta.requestStatus === "fulfilled") resolve(true);
										else resolve({ error: res.payload as string });
									});
								});
							}}
							onDeleteFile={(filename) => dispatch(deleteFileByName(filename))}
							onRunCode={
								showRunCodeBtn //taskState.task.category !== "JavaScript Basics"   <- disabled for first tasks?
									? () => dispatch(runCode(taskState.currentFilesMap[taskId as string]))
									: undefined
							}
							onUpdateFile={(oldFile, newFile) =>
								dispatch(updateFile({ old: oldFile, new: newFile }))
							}
							onTestCode={() =>
								dispatch(runTest(taskState.currentFilesMap[taskId as string], taskState.task._id))
							}
							onResetCode={() => dispatch(setCurrentFiles(taskState.task.defaultFiles!))}
							onSetToSampleSolution={
								taskState.task.solutionFiles?.length
									? () => dispatch(setCurrentFiles(taskState.task.solutionFiles!))
									: undefined
							}
							onSetToUserSolution={
								taskState.userSolution?.length
									? () => dispatch(setCurrentFiles(taskState.userSolution!))
									: undefined
							}
							onGotoNextTask={nextTask ? () => navigate(`/task/${nextTask.task._id}`) : undefined}
							onGotoPreviousTask={
								previousTask ? () => navigate(`/task/${previousTask.task._id}`) : undefined
							}
							type={"task"}
						/>
					</MDBCol>
					<MDBCol
						xl={4}
						lg={12}
						className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-2"
					>
						<PreviewComponent {...taskState} type="task" />
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</LoadingWrapper>
	);
};

export default TaskMenuView;
