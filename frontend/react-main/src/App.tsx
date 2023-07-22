import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavRoute from "./components/Utils/NavRoute";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import AuthView from "./views/AuthView";
import TaskView from "./views/TaskView";
import TaskMenuView from "./views/TaskMenuView";
import SandboxView from "./views/SandboxView";
//import ProtectedRoute from "./components/Utils/ProtectedRoute";

function App() {
	return (
		<div className="App vh-100 app-primary ">
			<Routes>
				{/* public routes */}
				<Route path="/auth" element={<AuthView />} />
				{/* protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<NavRoute />}>
						<Route path="/task" element={<TaskView />} />
						<Route path="/tasks" element={<TaskMenuView />} />
						<Route path="/sandbox" element={<SandboxView />} />
						<Route path="/*" element={<TaskView />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
