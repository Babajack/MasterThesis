import React, { useEffect, useRef, useState } from "react";
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
	MDBValidation,
	MDBValidationItem,
} from "mdb-react-ui-kit";
import logo from "../logo.svg";
import { Form } from "react-bootstrap";
import { httpRequest } from "../network/httpRequest";
import { loginUser, registerUser } from "../redux/slices/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const AuthView = () => {
	// state
	const [isLogin, setIsLogin] = useState(true);
	const [formValue, setFormValue] = useState<{
		username?: string;
		password?: string;
		password2?: string;
	}>({});
	const [formError, setFormError] = useState<{
		username?: string;
		password?: string;
		password2?: string;
	}>({});
	const [isValidated, setValidated] = useState(false);
	const resetState = () => {
		setFormValue({});
		setFormError({});
		setValidated(false);
	};
	const userState = useSelector((state: RootState) => state.user);
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	// effect
	useEffect(() => {
		if (isValidated) validateInput();
	}, [formValue]);

	useEffect(() => {
		if (userState.isLoggedIn) {
			const to = state ? state.from ?? "/" : "/";
			navigate(to);
		}
	}, [userState.isLoggedIn]);

	useEffect(() => {
		setFormError({ username: userState.error });
	}, [userState.error]);

	// ref
	const usernameFormRef = useRef<HTMLInputElement>(null);
	const passwordFormRef = useRef<HTMLInputElement>(null);
	const password2FormRef = useRef<HTMLInputElement>(null);

	// functions
	const handleLoginRegisterSwitch = () => {
		resetState();
		setIsLogin(!isLogin);
	};

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue({ ...formValue, [event.target.name]: event.target.value });
	};

	const validateInput = () => {
		let newFormError: typeof formError = {};
		if (!isLogin && formValue?.password !== formValue?.password2)
			newFormError = {
				...newFormError,
				password: "Passwörter müssen übereinstimmen!",
				password2: "Passwörter müssen übereinstimmen!",
			};
		if (!formValue?.username)
			newFormError = { ...newFormError, username: "Bitte alle Felder ausfüllen!" };
		if (!formValue?.password)
			newFormError = { ...newFormError, password: "Bitte alle Felder ausfüllen!" };
		if (!isLogin && !formValue?.password2)
			newFormError = { ...newFormError, password2: "Bitte alle Felder ausfüllen!" };

		usernameFormRef.current?.setCustomValidity(newFormError.username ?? "");
		passwordFormRef.current?.setCustomValidity(newFormError.password ?? "");
		password2FormRef.current?.setCustomValidity(newFormError.password2 ?? "");

		setFormError(newFormError);
		setValidated(true);
		return Object.keys(newFormError).length === 0;
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		if (validateInput()) {
			if (isLogin) {
				dispatch(loginUser({ username: formValue.username!, password: formValue.password! }));
			} else {
				dispatch(registerUser({ username: formValue.username!, password: formValue.password! }));
			}
		}
	};

	const getSubmitBtnText = () => {
		if (isLogin) return "Login";
		else return "Registrieren";
	};

	const getValidationItemClassName = (type: keyof typeof formError) => {
		let className = "mb-0 ";
		if (isValidated) {
			className += formError[type] ? "is-invalid" : "is-valid";
		}
		return className;
	};

	return (
		<MDBContainer key={String(isLogin)} className="my-5 ">
			<MDBCard className="">
				<MDBRow className="g-0 justify-content-between">
					<MDBCol md={6}>
						<MDBCardImage src={logo} className="rounded-start img-fluid" fluid />
					</MDBCol>
					<MDBCol md={6}>
						<MDBCardBody className=" d-flex flex-column justify-content-center align-items-center">
							<div className="d-flex flex-row mt-2 ">
								<MDBIcon fab icon="react fa-3x me-3" style={{ color: "blue" }} />
								<span className="h1 fw-bold mb-0">Learn React</span>
							</div>

							<h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
								Melde dich an und lerne React in einer interaktiven Umgebung
							</h5>

							<Form
								onSubmit={handleSubmit}
								noValidate
								validated={isValidated}
								className="row justify-content-center"
							>
								<Form.Group className="col-md-8 mb-2">
									<MDBInput
										ref={usernameFormRef}
										onChange={onChange}
										value={formValue?.username ?? ""}
										label="Benutzername"
										name="username"
										type="text"
										size="lg"
										className={getValidationItemClassName("username")}
										required
									/>
									<div className="text-danger mt-2">{formError?.username}</div>
								</Form.Group>
								<Form.Group className="col-md-8 mb-2">
									<MDBInput
										ref={passwordFormRef}
										onChange={onChange}
										value={formValue?.password ?? ""}
										label="password"
										name="password"
										type="password"
										size="lg"
										className={getValidationItemClassName("password")}
										required
									/>
									<div className="text-danger mt-2">{formError?.password}</div>
								</Form.Group>

								{!isLogin && (
									<Form.Group className="col-md-8 mb-2">
										<MDBInput
											ref={password2FormRef}
											onChange={onChange}
											value={formValue?.password2 ?? ""}
											label="password bestätigen"
											name="password2"
											type="password"
											size="lg"
											className={getValidationItemClassName("password2")}
											required
										/>
										<div className="text-danger mt-2">{formError?.password2}</div>
									</Form.Group>
								)}

								<MDBCol md={8}>
									<MDBBtn type="submit" className="mb-4 px-5 mt-2" color="dark" size="lg">
										{getSubmitBtnText()}
									</MDBBtn>
								</MDBCol>
							</Form>
							<p className="mb-5 pb-lg-2">
								<>
									{isLogin && "Neu hier? "}
									{!isLogin && "Bereits angemeldet? "}
									<span
										onClick={handleLoginRegisterSwitch}
										style={{ color: "#1266f1", cursor: "pointer" }}
									>
										{isLogin && "registrieren"}
										{!isLogin && "anmelden"}
									</span>
								</>
							</p>
						</MDBCardBody>
					</MDBCol>
				</MDBRow>
			</MDBCard>
		</MDBContainer>
	);
};

export default AuthView;
