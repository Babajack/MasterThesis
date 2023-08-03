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
	setLoadingStatus,
	updateCode,
	updateFile,
} from "../redux/slices/taskSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingWrapper from "../components/Utils/LoadingWrapper";

const TaskMenuView = () => {
	const dispatch = useDispatch<AppDispatch>();
	const taskState = useSelector((state: RootState) => state.task);
	const { taskId } = useParams();

	useEffect(() => {
		dispatch(fetchTask({ taskId: taskId ?? "" }));
	}, [, taskId]);

	/**
	 * cleanup on unmount
	 */
	useEffect(() => {
		//console.log(taskState.loadingStatus);

		return () => {
			dispatch(setLoadingStatus("Idle"));
		};
	}, []);

	return (
		<LoadingWrapper loadingStatus={taskState.loadingStatus}>
			<MDBContainer fluid className="g-0 d-flex flex-column flex-grow-1">
				<MDBRow className="g-0 flex-grow-1">
					<MDBCol md={3} sm={12} className="flex-grow-1 p-2">
						<h1>Aufgabe:</h1>
					</MDBCol>
					<MDBCol
						md={5}
						sm={12}
						/* style={{ height: "90%" }} */ className="d-flex flex-grow-1 px-2 py-1"
					>
						<EditorComponent
							{...taskState}
							onAddFile={(file) => {
								return new Promise((resolve) => {
									dispatch(addNewFile({ filename: file.filename })).then((res) => {
										if (res.meta.requestStatus === "fulfilled") resolve(true);
										else resolve({ error: res.payload as string });
									});
								});
							}}
							onDeleteFile={(filename) => dispatch(deleteFileByName(filename))}
							onRunCode={(files) => dispatch(updateCode(files))}
							onUpdateFile={(oldFile, newFile) =>
								dispatch(updateFile({ old: oldFile, new: newFile }))
							}
							onTestCode={(files) => dispatch(runTest(files))}
							type={"task"}
						/>
					</MDBCol>
					<MDBCol
						md={4}
						sm={12}
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
