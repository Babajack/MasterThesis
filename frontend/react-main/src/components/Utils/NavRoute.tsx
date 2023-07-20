import { Link, Outlet, useLocation } from "react-router-dom";
import { useBasePath } from "../../hooks/useBasePath";
import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/store";

const NavRoute = () => {
	const dispatch = useDispatch<AppDispatch>();
	const currentPathname = useBasePath();

	const getIsActive = (pathname: string) => {
		return currentPathname === pathname;
	};

	return (
		<>
			<header>
				<Navbar collapseOnSelect expand="lg" className="app-menu">
					<Container>
						<Navbar.Brand as={Link} to="/">
							Learn React <MDBIcon className="ms-2" fab icon="react" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav">
							<MDBIcon fas icon="bars" />
						</Navbar.Toggle>
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link active={getIsActive("/tasks")} as={Link} eventKey={1} to="/tasks">
									Aufgaben
								</Nav.Link>
								<Nav.Link active={getIsActive("/sandbox")} as={Link} eventKey={2} to="/sandbox">
									Sandbox
								</Nav.Link>
							</Nav>
							<Nav>
								<Nav.Link eventKey={3} onClick={() => dispatch(logoutUser())}>
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
