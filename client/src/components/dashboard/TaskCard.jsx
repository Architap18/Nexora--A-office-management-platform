import { Circle, CheckCircle2 } from "lucide-react";

function TaskCard({
    title,
    project,
    priority,
    completed = false,
}) {
    return (
        <div className="flex items-center gap-3 p-[15px_20px] border-b border-[#f4f4f5] last:border-b-0 hover:bg-[#fafafa] transition">

            <div className="text-[#d4d4d8] shrink-0 cursor-pointer">
                {completed ? (
                    <CheckCircle2 size={19} className="text-[#16a34a]" />
                ) : (
                    <Circle size={19} />
                )}
            </div>

            <div className="flex-1 flex flex-col gap-1">

                <strong className={`text-xs font-semibold text-[#18181b] ${completed ? "line-through text-[#a1a1aa]" : ""}`}>
                    {title}
                </strong>

                <span className="text-[10px] text-[#a1a1aa]">
                    {project}
                </span>

            </div>

            <span
                className={`text-[10px] px-[7px] py-[4px] rounded-[5px] font-medium ${
                    priority.toLowerCase() === "high"
                        ? "bg-[#fef2f2] text-[#dc2626]"
                        : priority.toLowerCase() === "medium"
                        ? "bg-[#fffbeb] text-[#d97706]"
                        : "bg-[#f4f4f5] text-[#52525b]"
                }`}
            >
                {priority}
            </span>

        </div>
    );
}

export default TaskCard;