import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface TabConfig {
	tabName: string;
	fileEndings: string[];
}

interface TabsComponentProps {
	currentFile: string;
	setCurrentFile: (filename: string) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = (props) => {
	/* First Level */
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
			tabName: "JavaScript",
			fileEndings: [".js", ".jsx"],
		},
	];

	const [basicActive, setBasicActive] = useState<TabConfig>({
		tabName: "JavaScript",
		fileEndings: [".js", ".jsx"],
	});

	const [previousActiveFile, setPreviousActiveFile] = useState<any>(
		configs.reduce((prev, cur) => {
			return { ...prev, [cur.tabName]: undefined };
		}, {})
	);

	const handleFirstLevelClick = (value: TabConfig) => {
		if (value === basicActive) {
			return;
		}
		setBasicActive(value);
		if (previousActiveFile[value.tabName]) props.setCurrentFile(previousActiveFile[value.tabName]);
	};

	/* Second Level */
	const files = useSelector((state: RootState) => state.task.currentFiles).filter((file) => {
		for (let fileEnding of basicActive.fileEndings) {
			if (file.filename.endsWith(fileEnding)) return true;
		}
	});

	return (
		<div>
			<MDBTabs fill>
				{configs.map((elem) => {
					return (
						<MDBTabsItem key={elem.tabName + "-first-level"}>
							<MDBTabsLink
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
							<MDBTabs>
								{files.map((file) => {
									return (
										<MDBTabsItem key={file.filename}>
											<MDBTabsLink
												onClick={() => {
													props.setCurrentFile(file.filename);
													setPreviousActiveFile({
														...previousActiveFile,
														[basicActive.tabName]: file.filename,
													});
												}}
												active={props.currentFile === file.filename}
											>
												{file.filename}
											</MDBTabsLink>
										</MDBTabsItem>
									);
								})}
							</MDBTabs>
						</MDBTabsPane>
					);
				})}
			</MDBTabsContent>
		</div>
	);
};

export default TabsComponent;
