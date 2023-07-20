import {
	MDBTabs,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsContent,
	MDBTabsPane,
	MDBInput,
	MDBIcon,
	MDBBtn,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addNewFile, deleteFileByName } from "../../redux/slices/taskSlice";
import { Tooltip } from "react-tooltip";
import { ConfirmationModal } from "../Utils/ConfirmationModal";

interface TabConfig {
	tabName: string;
	fileEndings: string[];
}

interface TabsComponentProps {
	currentFilename: string;
	setCurrentFilename: (filename: string) => void;
	onDeleteFile: (filename: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = (props) => {
	const dispatch = useDispatch<AppDispatch>();

	/* -------------------- First Level -------------------- */
	const [basicActive, setBasicActive] = useState<TabConfig>({
		tabName: "JAVASCRIPT",
		fileEndings: [".js", ".jsx"],
	});

	const configs: TabConfig[] = [
		{
			tabName: "HTML",
			fileEndings: [".html"],
		},
		{
			tabName: "CSS",
			fileEndings: [".css"],
		},
		{
			tabName: "JAVASCRIPT",
			fileEndings: [".js", ".jsx"],
		},
	];

	const handleFirstLevelClick = (value: TabConfig) => {
		if (value === basicActive) {
			return;
		}
		setBasicActive(value);
		setEditMode(false);
		if (previousActiveFile[value.tabName])
			props.setCurrentFilename(previousActiveFile[value.tabName]);
	};

	/* -------------------- Second Level -------------------- */
	const [previousActiveFile, setPreviousActiveFile] = useState<any>(
		// configs.reduce((prev, cur) => {
		// 	return { ...prev, [cur.tabName]: undefined };
		// }, {})
		{ HTML: "index.html", CSS: "App.css", JAVASCRIPT: "App.js" }
	);

	const [showConfirmationModal, setShowConfirmationModal] = useState(false);

	const [editMode, setEditMode] = useState(false);
	const [inputError, setInputError] = useState<string>();
	const toggleEditMode = () => {
		setEditMode(!editMode);
		setInputError("");
	};

	const submitFile = (filename: string) => {
		if (basicActive.fileEndings.some((fileEnding) => filename.endsWith(fileEnding))) {
			dispatch(addNewFile({ filename: filename })).then((res) => {
				if (res.meta.requestStatus === "fulfilled") toggleEditMode();
				else setInputError(res.payload as string);
			});
		} else {
			setInputError("Datei hat nicht die korrekte Endung: " + basicActive.fileEndings.join(" / "));
		}
	};

	const files = useSelector((state: RootState) => state.task.currentFiles).filter((file) => {
		for (let fileEnding of basicActive.fileEndings) {
			if (file.filename.endsWith(fileEnding)) return true;
		}
	});

	const fileTabs = files.map((file) => {
		return (
			<MDBTabsItem key={file.filename}>
				<MDBTabsLink
					className="app-text"
					style={{ textTransform: "none" }}
					onClick={() => {
						props.setCurrentFilename(file.filename);
						setPreviousActiveFile({
							...previousActiveFile,
							[basicActive.tabName]: file.filename,
						});
					}}
					active={props.currentFilename === file.filename}
				>
					{file.filename}
					{file.isDeletable && file.filename === props.currentFilename && (
						<span className="ms-3" onClick={() => setShowConfirmationModal(true)}>
							<MDBIcon fas icon="trash-alt" />
						</span>
					)}
				</MDBTabsLink>
			</MDBTabsItem>
		);
	});

	fileTabs.push(
		<div key={"addFile"}>
			{editMode ? (
				<div className="d-flex align-items-center">
					<input
						autoFocus
						className="m-2 anchor-element-input"
						onBlur={(event) => {
							if (event.currentTarget.value) submitFile(event.currentTarget.value);
							else toggleEditMode();
						}}
						onKeyDown={(event) => {
							if (event.key === "Enter") event.currentTarget.blur();
						}}
					/>
					<span
						tabIndex={0}
						className="select-clear-btn d-block"
						role="button"
						onClick={toggleEditMode}
					>
						✕
					</span>
				</div>
			) : (
				<MDBTabsItem>
					<MDBTabsLink className="app-text" onClick={toggleEditMode}>
						+
					</MDBTabsLink>
				</MDBTabsItem>
			)}
		</div>
	);

	/* -------------------- render -------------------- */
	return (
		<div>
			<MDBTabs fill className="custom-tabs">
				{configs.map((elem) => {
					return (
						<MDBTabsItem key={elem.tabName + "-first-level"}>
							<MDBTabsLink
								className="app-text"
								style={{ textTransform: "none" }}
								onClick={() => handleFirstLevelClick(elem)}
								active={basicActive.tabName === elem.tabName}
							>
								{elem.tabName}
							</MDBTabsLink>
						</MDBTabsItem>
					);
				})}
			</MDBTabs>
			<MDBTabsContent>
				{configs.map((elem) => {
					return (
						<MDBTabsPane
							show={basicActive.tabName === elem.tabName}
							key={elem.tabName + "-second-level"}
						>
							<MDBTabs>{fileTabs}</MDBTabs>
						</MDBTabsPane>
					);
				})}
			</MDBTabsContent>
			<Tooltip anchorSelect=".anchor-element-input" place="top" isOpen={!!inputError}>
				{inputError}
			</Tooltip>
			<ConfirmationModal
				showModal={showConfirmationModal}
				setShowModal={setShowConfirmationModal}
				textBody={`Datei "${props.currentFilename}" wirklich löschen?`}
				confirmationFunction={() => {
					dispatch(deleteFileByName(props.currentFilename));
					props.onDeleteFile(props.currentFilename);
					setPreviousActiveFile({ ...previousActiveFile, [basicActive.tabName]: "App.js" });
					props.setCurrentFilename(files[0].filename);
				}}
				titel="Löschen"
			/>
		</div>
	);
};

export default TabsComponent;
