import {
    CheckSquare,
    FolderKanban,
    Clock3,
    Users,
    ArrowRight,
    CalendarDays,
} from "lucide-react";

import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/dashboard/TaskCard";
import ActivityItem from "../components/dashboard/ActivityItem";

function Dashboard() {
    return (
        <div className="space-y-7">

            {/* Header */}

            <div className="flex items-end justify-between mb-[28px]">

                <div>
                    <p className="text-[10px] text-[#71717a] tracking-[0.1em] font-bold m-0 mb-2 uppercase">
                        Monday, August 30
                    </p>

                    <h1 className="m-0 text-[30px] font-bold tracking-[-0.04em] text-[#18181b]">
                        Good evening, Alex
                    </h1>

                    <p className="text-[#71717a] mt-[7px] mb-0 text-[13px]">
                        Here's what's happening across your workspace.
                    </p>
                </div>

                <button className="flex items-center gap-2 border border-[#e4e4e7] bg-white rounded-lg px-3.5 py-2 text-xs font-semibold text-[#18181b] hover:bg-gray-50 transition cursor-pointer">
                    <CalendarDays size={17} />
                    This week
                </button>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 gap-[14px] mb-[18px]">

                <StatCard
                    title="My Tasks"
                    value="24"
                    description="8 due this week"
                    icon={CheckSquare}
                    trend="+12%"
                />

                <StatCard
                    title="Active Projects"
                    value="6"
                    description="2 need attention"
                    icon={FolderKanban}
                    trend="+2"
                />

                <StatCard
                    title="Time Tracked"
                    value="31h 42m"
                    description="This week"
                    icon={Clock3}
                    trend="+8%"
                />

                <StatCard
                    title="Team Members"
                    value="18"
                    description="3 online now"
                    icon={Users}
                />

            </div>

            {/* Projects */}

            <section className="mb-7">

                <div className="flex items-center justify-between mb-4">

                    <div>
                        <h2 className="text-[15px] font-bold text-[#18181b] m-0 mb-1">Active Projects</h2>
                        <p className="text-[11px] text-[#a1a1aa] m-0">Keep track of your team's progress.</p>
                    </div>

                    <button className="flex items-center gap-1 border-0 bg-transparent text-[11px] text-[#52525b] hover:text-[#18181b] font-medium cursor-pointer transition">
                        View all
                        <ArrowRight size={16} />
                    </button>

                </div>

                <div className="grid grid-cols-3 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1 gap-4">

                    <ProjectCard
                        name="Website Redesign"
                        description="Revamp the company website and improve conversion."
                        color="#8b5cf6"
                        progress={72}
                        tasks={24}
                        members={["AP", "RK", "SM", "JD"]}
                    />

                    <ProjectCard
                        name="Mobile App"
                        description="Build the next generation mobile experience."
                        color="#3b82f6"
                        progress={48}
                        tasks={38}
                        members={["RK", "SM", "NT"]}
                    />

                    <ProjectCard
                        name="Marketing Campaign"
                        description="Launch Q3 product marketing campaign."
                        color="#22c55e"
                        progress={85}
                        tasks={16}
                        members={["AP", "JD", "MK"]}
                    />

                </div>

            </section>

            {/* Bottom Grid */}

            <div className="grid grid-cols-[1.4fr_1fr] max-[1000px]:grid-cols-1 gap-[18px]">

                <section className="bg-white border border-[#e4e4e7] rounded-[12px] overflow-hidden p-5">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-[15px] font-bold text-[#18181b] m-0 mb-1">My Tasks</h2>
                            <p className="text-[11px] text-[#a1a1aa] m-0">Your upcoming work.</p>
                        </div>

                        <button className="flex items-center gap-1 border-0 bg-transparent text-[11px] text-[#52525b] hover:text-[#18181b] font-medium cursor-pointer transition">
                            View all
                            <ArrowRight size={16} />
                        </button>

                    </div>

                    <div className="-mx-5 -mb-5">

                        <TaskCard
                            title="Finalize landing page design"
                            project="Website Redesign"
                            priority="High"
                        />

                        <TaskCard
                            title="Implement authentication flow"
                            project="Mobile App"
                            priority="Medium"
                        />

                        <TaskCard
                            title="Review campaign analytics"
                            project="Marketing Campaign"
                            priority="Low"
                        />

                        <TaskCard
                            title="Create responsive navigation"
                            project="Website Redesign"
                            priority="High"
                            completed
                        />

                    </div>

                </section>

                <section className="bg-white border border-[#e4e4e7] rounded-[12px] overflow-hidden p-5">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-[15px] font-bold text-[#18181b] m-0 mb-1">Recent Activity</h2>
                            <p className="text-[11px] text-[#a1a1aa] m-0">Latest workspace updates.</p>
                        </div>

                    </div>

                    <div className="-mx-5 -mb-5">

                        <ActivityItem
                            avatar="RK"
                            name="Riya"
                            action="completed a task in Website Redesign"
                            time="12 minutes ago"
                        />

                        <ActivityItem
                            avatar="SM"
                            name="Sam"
                            action="commented on Authentication Flow"
                            time="34 minutes ago"
                        />

                        <ActivityItem
                            avatar="JD"
                            name="John"
                            action="joined Mobile App"
                            time="1 hour ago"
                        />

                        <ActivityItem
                            avatar="MK"
                            name="Maya"
                            action="created a new task"
                            time="2 hours ago"
                        />

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Dashboard;