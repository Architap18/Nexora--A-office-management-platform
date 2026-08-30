function ProjectCard({
    name,
    description,
    color,
    progress,
    tasks,
    members,
}) {
    return (
        <div className="bg-white border border-[#e4e4e7] rounded-[12px] p-5 transition-all duration-200 hover:border-[#a1a1aa] hover:-translate-y-0.5">

            <div className="flex items-center justify-between">

                <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                />

                <button className="border-0 bg-transparent text-[#a1a1aa] hover:text-[#18181b] cursor-pointer text-sm font-semibold">
                    •••
                </button>

            </div>

            <h3 className="text-[15px] font-semibold text-[#18181b] mt-[18px] mb-[5px]">
                {name}
            </h3>

            <p className="text-[#71717a] text-xs m-0 mb-5">
                {description}
            </p>

            <div className="mb-4">

                <div className="flex justify-between text-xs text-[#71717a] mb-1.5">
                    <span>Progress</span>
                    <strong className="text-[#18181b] font-semibold">{progress}%</strong>
                </div>

                <div className="h-[5px] bg-[#f4f4f5] rounded-[10px] overflow-hidden">
                    <div
                        className="h-full rounded-[inherit] transition-all duration-300"
                        style={{
                            width: `${progress}%`,
                            backgroundColor: color,
                        }}
                    />
                </div>

            </div>

            <div className="flex items-center justify-between pt-2">

                <div className="flex items-center -space-x-2">

                    {members.map((member, index) => (
                        <div
                            className="w-7 h-7 rounded-full bg-[#e4e4e7] text-[#18181b] text-[10px] font-bold flex items-center justify-center border-2 border-white"
                            key={index}
                            style={{
                                zIndex: members.length - index,
                            }}
                        >
                            {member}
                        </div>
                    ))}

                </div>

                <span className="text-[11px] text-[#71717a] hover:text-[#18181b] flex items-center gap-1 transition cursor-pointer">
                    {tasks} tasks →
                </span>

            </div>

        </div>
    );
}

export default ProjectCard;