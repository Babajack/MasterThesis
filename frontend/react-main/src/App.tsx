import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TaskView from "./views/TaskView";
import { Routes, Route } from "react-router-dom";
import EditorComponent from "./components/Task/EditorComponent";
import AuthView from "./views/AuthView";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
//import ProtectedRoute from "./components/Utils/ProtectedRoute";

function App() {
	return (
		<div className="App vh-100">
			<header className="App-header h-100">
				<Routes>
					{/* public routes */}
					<Route path="/login" element={<AuthView type="login" />} />
					<Route path="/register" element={<AuthView type="register" />} />

					<Route path="/" element={<EditorComponent />} />

					{/* protected routes */}
					<Route element={<ProtectedRoute />}>
						<Route path="/task" element={<TaskView />} />
					</Route>
				</Routes>
			</header>
		</div>
	);
}

export default App;
