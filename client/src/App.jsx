import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectBoard from "./pages/ProjectBoard";
import MyTasks from "./pages/MyTasks";
import Chat from "./pages/Chat";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main application */}
                <Route element={<DashboardLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectBoard />} />
                    <Route path="/tasks" element={<MyTasks />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>

                {/* Unknown route */}
                <Route path="*" element={<Navigate to="/dashboard" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;