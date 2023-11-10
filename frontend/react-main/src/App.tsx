import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavRoute from "./components/Utils/NavRoute";
import ProtectedRoute from "./components/Utils/ProtectedRoute";
import AuthView from "./views/AuthView";
import TaskView from "./views/TaskView";
import TaskMenuView from "./views/TaskMenuView";
import SandboxView from "./views/SandboxView";
import InfoView from "./views/InfoView";
import PrivacyPolicy from "./views/PrivacyPolicyView";
//import ProtectedRoute from "./components/Utils/ProtectedRoute";

function App() {
	return (
		<div className="App app-primary">
			<Routes>
				{/* public routes */}
				<Route path="/auth" element={<AuthView />} />
				<Route path="/privacy" element={<PrivacyPolicy />} />
				{/* protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<NavRoute />}>
						<Route path="/task/:taskId" element={<TaskView />} />
						<Route path="/tasks" element={<TaskMenuView />} />
						<Route path="/sandbox" element={<SandboxView />} />
						<Route path="/*" element={<InfoView />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
