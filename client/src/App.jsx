import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { AuthProvider, useAuthContext } from "./context/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectBoard from "./pages/ProjectBoard";
import MyTasks from "./pages/MyTasks";
import Members from "./pages/Members";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";


function ProtectedRoute({ children }) {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


function AppRoutes() {
    return (
        <Routes>

            {/* Public routes */}

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />


            {/* Protected routes */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Projects />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/projects/:projectId"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <ProjectBoard />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <MyTasks />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/members"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Members />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Chat />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <Settings />
                        </DashboardLayout>
                    </ProtectedRoute>
                }
            />


            {/* Default */}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
    );
}


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}


export default App;