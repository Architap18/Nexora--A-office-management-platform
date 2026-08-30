import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout() {
    return (
        <div className="flex min-h-screen">

            <Sidebar />

            <div className="min-h-screen w-full max-[700px]:ml-0 max-[700px]:w-full max-[1000px]:ml-[210px] max-[1000px]:w-[calc(100%-210px)] min-[1001px]:ml-[245px] min-[1001px]:w-[calc(100%-245px)]">

                <Topbar />

                <main className="p-[25px_18px] min-[701px]:px-10 min-[701px]:py-8 max-w-[1500px]">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;