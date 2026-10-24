
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckSquare,
  FolderKanban,
  Clock3,
  Users,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

import { useAuthContext } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/dashboard/TaskCard";
import api from "../services/api";

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [stats, setStats] = useState({
    activeProjects: 0,
    totalTasks: 0,
    tasksDueSoon: 0,
    teamMembers: 0,
  });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  const [statsError, setStatsError] = useState("");
  const [projectsError, setProjectsError] = useState("");
  const [tasksError, setTasksError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const data = await api.get("/users/dashboard/stats");

        if (!data.success) {
          throw new Error(data.message || "Could not load dashboard stats.");
        }

        if (!cancelled) {
          setStats((previous) => ({
            ...previous,
            ...data.stats,
          }));
          setStatsError("");
        }
      } catch (error) {
        if (!cancelled) {
          setStatsError(
            error.message || "Failed to load dashboard statistics."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingStats(false);
        }
      }

      try {
        const data = await api.get("/projects");

        if (!data.success) {
          throw new Error(data.message || "Could not load projects.");
        }

        if (!cancelled) {
          setProjects(
            Array.isArray(data.projects) ? data.projects.slice(0, 3) : []
          );
          setProjectsError("");
        }
      } catch (error) {
        if (!cancelled) {
          setProjectsError(error.message || "Failed to load projects.");
        }
      } finally {
        if (!cancelled) {
          setLoadingProjects(false);
        }
      }

      try {
        const data = await api.get("/users/me/tasks");

        if (!data.success) {
          throw new Error(data.message || "Could not load your tasks.");
        }

        if (!cancelled) {
          setTasks(
            Array.isArray(data.tasks) ? data.tasks.slice(0, 4) : []
          );
          setTasksError("");
        }
      } catch (error) {
        if (!cancelled) {
          setTasksError(error.message || "Failed to load your tasks.");
        }
      } finally {
        if (!cancelled) {
          setLoadingTasks(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const firstName =
    user?.name?.trim().split(/\s+/)[0] ||
    user?.username ||
    "there";

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="mb-[28px] flex items-end justify-between gap-4">
        <div>
          <p className="m-0 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#71717a]">
            {formatDate()}
          </p>

          <h1 className="m-0 text-[30px] font-bold tracking-[-0.04em] text-[#18181b]">
            {getGreeting()}, {firstName}
          </h1>

          <p className="mb-0 mt-[7px] text-[13px] text-[#71717a]">
            Here's what's happening across your workspace.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-3.5 py-2 text-xs font-semibold text-[#18181b]">
          <CalendarDays size={17} />
          This week
        </div>
      </div>

      {/* Dashboard statistics */}
      {statsError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          <p>{statsError}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-1 font-semibold underline"
          >
            Reload dashboard
          </button>
        </div>
      )}

      <div className="mb-[18px] grid grid-cols-4 gap-[14px] max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
        <StatCard
          title="My Tasks"
          value={loadingStats ? "…" : String(stats.totalTasks)}
          description={
            loadingStats ? "Loading..." : `${stats.tasksDueSoon} due soon`
          }
          icon={CheckSquare}
        />

        <StatCard
          title="Active Projects"
          value={loadingStats ? "…" : String(stats.activeProjects)}
          description="In your workspace"
          icon={FolderKanban}
        />

        <StatCard
          title="Tasks Due Soon"
          value={loadingStats ? "…" : String(stats.tasksDueSoon)}
          description="Within 7 days"
          icon={Clock3}
        />

        <StatCard
          title="Team Members"
          value={loadingStats ? "…" : String(stats.teamMembers)}
          description="Workspace members"
          icon={Users}
        />
      </div>

      {/* Recent projects */}
      <section className="mb-7">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="m-0 mb-1 text-[15px] font-bold text-[#18181b]">
              Active Projects
            </h2>
            <p className="m-0 text-[11px] text-[#a1a1aa]">
              Keep track of your team's progress.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="flex items-center gap-1 border-0 bg-transparent text-[11px] font-medium text-[#52525b] transition hover:text-[#18181b]"
          >
            View all
            <ArrowRight size={16} />
          </button>
        </div>

        {loadingProjects ? (
          <p className="text-sm text-zinc-400">Loading projects...</p>
        ) : projectsError ? (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {projectsError}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 p-8 text-center">
            <p className="text-sm text-zinc-500">
              No projects found in your workspace.
            </p>
            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="mt-3 text-sm font-medium text-zinc-700 hover:underline"
            >
              Explore projects →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
            {projects.map((project) => (
              <div
                key={project.id}
                role="link"
                tabIndex={0}
                onClick={() => navigate(`/projects/${project.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(`/projects/${project.id}`);
                  }
                }}
                className="cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <ProjectCard
                  name={project.name}
                  description={
                    project.description || "No description provided."
                  }
                  color={project.color || "#8b5cf6"}
                  progress={0}
                  tasks={0}
                  members={[]}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tasks and activity */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-[18px] max-[1000px]:grid-cols-1">
        <section className="overflow-hidden rounded-[12px] border border-[#e4e4e7] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="m-0 mb-1 text-[15px] font-bold text-[#18181b]">
                My Tasks
              </h2>
              <p className="m-0 text-[11px] text-[#a1a1aa]">
                Your upcoming work.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-1 border-0 bg-transparent text-[11px] font-medium text-[#52525b] transition hover:text-[#18181b]"
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="-mx-5 -mb-5">
            {loadingTasks ? (
              <p className="p-5 text-sm text-zinc-400">
                Loading tasks...
              </p>
            ) : tasksError ? (
              <p role="alert" className="p-5 text-sm text-red-600">
                {tasksError}
              </p>
            ) : tasks.length === 0 ? (
              <p className="p-5 text-center text-sm text-zinc-400">
                No tasks assigned to you yet.
              </p>
            ) : (
              tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  project={task.project_name || "No project"}
                  priority={
                    task.priority === "urgent" || task.priority === "high"
                      ? "High"
                      : task.priority === "medium"
                        ? "Medium"
                        : "Low"
                  }
                  completed={task.status === "done"}
                />
              ))
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[12px] border border-[#e4e4e7] bg-white p-5">
          <div className="mb-4">
            <h2 className="m-0 mb-1 text-[15px] font-bold text-[#18181b]">
              Recent Activity
            </h2>
            <p className="m-0 text-[11px] text-[#a1a1aa]">
              Latest workspace updates.
            </p>
          </div>

          <div className="px-2 py-8 text-center">
            <p className="text-sm text-zinc-500">
              Activity tracking is not connected yet.
            </p>
            <p className="text-xs text-zinc-400">
              Recent project and task activity will appear here once the
              activity API is implemented.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
