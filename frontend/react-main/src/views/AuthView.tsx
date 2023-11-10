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
	MDBSpinner,
} from "mdb-react-ui-kit";
import logo from "../logo.svg";
import { Form } from "react-bootstrap";
import { httpRequest } from "../network/httpRequest";
import { getUserData, loginUser, registerUser, setError } from "../redux/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

	// effects
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
		if (userState.error) setFormError({ username: userState.error });
	}, [userState.error]);

	// useEffect(() => {
	// 	dispatch(getUserData());
	// }, []);

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
		dispatch(setError(undefined));
		setFormValue({ ...formValue, [event.target.name]: event.target.value });
	};

	const validateInput = () => {
		let newFormError: typeof formError = {};
		if (!isLogin && formValue?.password !== formValue?.password2)
			newFormError = {
				...newFormError,
				password: "Passwords must be the same!",
				password2: "Passwords must be the same!",
			};
		if (!formValue?.username)
			newFormError = { ...newFormError, username: "Please fill in all the fields!" };
		if (!formValue?.password)
			newFormError = { ...newFormError, password: "Please fill in all the fields!" };
		if (!isLogin && !formValue?.password2)
			newFormError = { ...newFormError, password2: "Please fill in all the fields!" };

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
		if (isLogin) return "login";
		else return "sign up";
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
			<MDBCard className="app-text-primary">
				<MDBRow className="g-0 justify-content-between">
					<MDBCol md={6}>
						<MDBCardImage src={logo} className="rounded-start img-fluid" fluid />
					</MDBCol>
					<MDBCol md={6}>
						<MDBCardBody className=" d-flex flex-column justify-content-center align-items-center">
							<div className="d-flex flex-row mt-2 ">
								<MDBIcon className="app-text-secondary" fab icon="react fa-3x me-3" />
								<span className="h1 fw-bold mb-0">Learn React</span>
							</div>

							<h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
								Sign up and learn React in an interactive environment
							</h5>

							<Form
								onSubmit={handleSubmit}
								noValidate
								validated={isValidated}
								className="row justify-content-center"
							>
								<Form.Group className="col-md-8 mb-2">
									<MDBInput
										style={{ backgroundColor: "white" }}
										ref={usernameFormRef}
										onChange={onChange}
										value={formValue?.username ?? ""}
										label="username"
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
										style={{ backgroundColor: "white" }}
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
											style={{ backgroundColor: "white" }}
											ref={password2FormRef}
											onChange={onChange}
											value={formValue?.password2 ?? ""}
											label="confirm password"
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
									<MDBBtn
										type="submit"
										disabled={userState.loadingStatus === "Pending"}
										className="mb-4 px-5 mt-2"
										color="dark"
										size="lg"
									>
										{userState.loadingStatus === "Pending" ? (
											<MDBSpinner size="sm" />
										) : (
											getSubmitBtnText()
										)}
									</MDBBtn>
								</MDBCol>
							</Form>
							<p className="mb-2 pb-lg-2">
								<>
									{isLogin && "New here? "}
									{!isLogin && "Already have an account? "}
									<span
										onClick={handleLoginRegisterSwitch}
										style={{ color: "#1266f1", cursor: "pointer" }}
									>
										{isLogin && "sign up"}
										{!isLogin && "login"}
									</span>
								</>
							</p>
							<p className="">
								<Link to={"/privacy"}>Privacy Policy</Link>
							</p>
						</MDBCardBody>
					</MDBCol>
				</MDBRow>
			</MDBCard>
		</MDBContainer>
	);
};

export default AuthView;
