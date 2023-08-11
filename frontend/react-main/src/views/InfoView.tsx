import { MDBCard, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router-dom";

const InfoView = () => {
	const [showShow, setShowShow] = useState(false);

	const toggleShow = () => setShowShow(!showShow);
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol>
					<MDBCard className="app-secondary my-3 p-3">
						<h3 className="app-text-primary mb-5">
							Welcome to Learn React
							<MDBIcon className="ms-2 app-text-secondary" fab icon="react" />
						</h3>
						<MDBRow className="text-start">
							<MDBCol sm={12} className="mb-6 text-center" style={{ whiteSpace: "pre-wrap" }}>
								<h5>What is Learn React?</h5>
								<span>
									Learn React is a platform to learn React in an interactive manner. {"\n"}
									If you want to become a web frontend developer or just want to learn the basics of
									React and like learning by doing, this is the right place for you. {"\n"}
									To get started right away, <Link to={"/tasks"}>choose your first task</Link>.
								</span>
							</MDBCol>
							<MDBCol sm={12} className="d-flex justify-content-center">
								<a className="nav-link" onClick={toggleShow}>
									show more...
								</a>
							</MDBCol>
						</MDBRow>
						<MDBCollapse show={showShow}>
							<MDBRow className="text-start">
								<MDBCol sm={4} className="p-3">
									<h5>What is React?</h5>
									<span>
										React is an open-source JavaScript library used for building user interfaces in
										web applications, particularly single-page applications and interactive web
										elements.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>Why React?</h5>
									<span>
										React is one of the most used technologies regarding Web Frontend Development.
										For your career as a web developer, React should be on your resumee.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>How does React work?</h5>
									<span>
										React follows the principle of a component-based architecture (composition) and
										aims to make it easier to manage complex User Interfaces by breaking them down
										into smaller, reusable and independent pieces.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>What is a React Component?</h5>
									<span>
										React applications are built using components. A component is a self-contained,
										reusable piece of UI that can be composed and combined to create more complex
										interfaces. Each component encapsulates its own logic, state, and UI elements.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>What is the virtual DOM?</h5>
									<span>
										React uses a virtual representation of the DOM{" "}
										<Link
											to={
												"https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
											}
										>
											(Document Object Model)
										</Link>
										, known as the Virtual DOM. This is an in-memory representation of the actual
										DOM elements. When changes are made to a React component's state or props, a new
										virtual DOM is created. React then compares the previous and new virtual DOMs to
										determine the minimal set of changes needed to update the actual DOM
										efficiently.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>What is a component state?</h5>
									<span>
										React allows components to manage their own state. State represents the data
										that can change over time and affect the UI. When the state of a component
										changes, React automatically triggers a re-render of that component and any
										child components that depend on its state.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>How does the data flow between components work?</h5>
									<span>
										Props (short for properties) are a way to pass data from a parent component to a
										child component. This allows for the composition of complex User Interfaces by
										reusing smaller components and passing different data to them. Data flows
										downward in a unidirectional manner, making it easier to understand how changes
										affect the application.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>How does the component lifecycle work?</h5>
									<span>
										React components have a lifecycle that consists of different phases, such as
										initialization, updating, and unmounting. Developers can hook into these
										lifecycle phases to perform actions like setting initial state, fetching data,
										or cleaning up resources when a component is removed from the UI.
									</span>
								</MDBCol>
								<MDBCol sm={4} className="p-3">
									<h5>What is JSX?</h5>
									<span>
										React uses JSX (JavaScript Syntax Extension) syntax, which allows developers to
										write components using a syntax that resembles HTML. JSX is transpiled into
										regular JavaScript by tools like Babel before being executed in the browser.
									</span>
								</MDBCol>
							</MDBRow>
						</MDBCollapse>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default InfoView;
