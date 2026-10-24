import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-zinc-50">
            <Sidebar />

            <Topbar />

            <main className="ml-[245px] pt-[70px]">
                <div className="min-h-[calc(100vh-70px)] p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;