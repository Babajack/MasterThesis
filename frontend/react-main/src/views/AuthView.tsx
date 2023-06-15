import React from "react";
import {
	MDBBtn,
	MDBContainer,
	MDBCard,
	MDBCardBody,
	MDBCardImage,
	MDBRow,
	MDBCol,
	MDBIcon,
	MDBInput,
	MDBCardText,
	MDBCardTitle,
} from "mdb-react-ui-kit";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

interface AuthViewProps {
	type: "login" | "register";
}

const AuthView = ({ type }: AuthViewProps) => {
	return (
		<MDBContainer className="my-5 h-75">
			<MDBCard className="h-100">
				<MDBRow className="g-0 h-100 justify-content-between">
					<MDBCol md={5}>
						<MDBCardImage src={logo} className="rounded-start h-100" fluid />
					</MDBCol>
					<MDBCol md={6}>
						<MDBCardBody className="h-100 d-flex flex-column justify-content-center">
							<div className="d-flex flex-row mt-2">
								<MDBIcon fab icon="react fa-3x me-3" style={{ color: "blue" }} />
								<span className="h1 fw-bold mb-0">Learn React</span>
							</div>

							<h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
								Melde dich an und lerne React in einer interaktiven Umgebung
							</h5>
							<MDBInput wrapperClass="mb-4" label="Benutzername" type="text" size="lg" />
							<MDBInput wrapperClass="mb-4" label="Passwort" type="password" size="lg" />
							<MDBBtn className="mb-4 px-5" color="dark" size="lg">
								Login
							</MDBBtn>
							<p className="mb-5 pb-lg-2">
								Neu hier?{" "}
								<Link to={"/register"} style={{ color: "#1266f1" }}>
									registrieren
								</Link>
							</p>

							{/* <MDBInput
								wrapperClass="mb-4"
								label="Email address"
								id="formControlLg"
								type="email"
								size="lg"
							/>
							<MDBInput
								wrapperClass="mb-4"
								label="Password"
								id="formControlLg"
								type="password"
								size="lg"
							/>

							<MDBBtn className="mb-4 px-5" color="dark" size="lg">
								Login
							</MDBBtn>
							<a className="small text-muted" href="#!">
								Forgot password?
							</a>
							<p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
								Don't have an account?{" "}
								<a href="#!" style={{ color: "#393f81" }}>
									Register here
								</a>
							</p>

							<div className="d-flex flex-row justify-content-start">
								<a href="#!" className="small text-muted me-1">
									Terms of use.
								</a>
								<a href="#!" className="small text-muted">
									Privacy policy
								</a>
							</div> */}
						</MDBCardBody>
					</MDBCol>
				</MDBRow>
			</MDBCard>
		</MDBContainer>
	);
};

export default AuthView;
