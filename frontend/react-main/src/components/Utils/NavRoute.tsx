import { Link, Outlet, useLocation } from "react-router-dom";
import { useBasePath } from "../../hooks/useBasePath";
import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";

const NavRoute = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentPathname = useBasePath();

	const currentTaskId = useSelector((state: RootState) => state.user.currentTaskId);

	const getIsActive = (pathname: string) => {
		return currentPathname === pathname;
	};

	return (
		<>
			<header>
				<Navbar collapseOnSelect expand="lg" className="app-navbar app-secondary">
					<Container>
						<Navbar.Brand className="app-text-primary" as={Link} to="/">
							Learn React <MDBIcon className="ms-2 app-text-secondary" fab icon="react" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav">
							<MDBIcon fas icon="bars" />
						</Navbar.Toggle>
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link
									className="app-text-primary"
									active={getIsActive("/tasks")}
									as={Link}
									eventKey={1}
									to="/tasks"
								>
									Aufgaben
								</Nav.Link>
								<Nav.Link
									className="app-text-primary"
									active={getIsActive("/sandbox")}
									as={Link}
									eventKey={2}
									to="/sandbox"
								>
									Sandbox
								</Nav.Link>
								{currentTaskId && (
									<Nav.Link
										className="app-text-primary"
										active={getIsActive(`/task`)}
										as={Link}
										eventKey={3}
										to={`/task/${currentTaskId}`}
									>
										Aktuelle Aufgabe
									</Nav.Link>
								)}
							</Nav>
							<Nav>
								<Nav.Link
									className="app-text-primary"
									eventKey={4}
									onClick={() => dispatch(logoutUser())}
								>
									Logout <MDBIcon className="ms-2" fas icon="sign-out-alt" />
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
			<section className="App-body">
				<Outlet />
			</section>
		</>
	);
};

export default NavRoute;
