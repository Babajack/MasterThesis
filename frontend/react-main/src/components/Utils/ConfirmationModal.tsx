import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
	MDBBtn,
	MDBModal,
	MDBModalDialog,
	MDBModalContent,
	MDBModalHeader,
	MDBModalTitle,
	MDBModalBody,
	MDBModalFooter,
} from "mdb-react-ui-kit";

interface ConfirmationModalProps {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
	textBody: ReactNode;
	titel: ReactNode;
	confirmationFunction: any;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
	return (
		<MDBModal show={props.showModal} setShow={props.setShowModal} tabIndex="-1">
			<MDBModalDialog centered>
				<MDBModalContent>
					<MDBModalHeader>
						<MDBModalTitle>{props.titel}</MDBModalTitle>
						<MDBBtn
							className="btn-close"
							color="none"
							onClick={() => props.setShowModal(false)}
						></MDBBtn>
					</MDBModalHeader>
					<MDBModalBody> {props.textBody} </MDBModalBody>
					<MDBModalFooter>
						<MDBBtn className="btn-secondary" onClick={() => props.setShowModal(false)}>
							No
						</MDBBtn>
						<MDBBtn
							onClick={() => {
								props.setShowModal(false);
								props.confirmationFunction();
							}}
						>
							Yes
						</MDBBtn>
					</MDBModalFooter>
				</MDBModalContent>
			</MDBModalDialog>
		</MDBModal>
	);
};
