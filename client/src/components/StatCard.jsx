function StatCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
}) {
    return (
        <div className="bg-white border border-[#e4e4e7] rounded-[12px] p-[18px]">

            <div className="flex items-center justify-between text-[#71717a] text-xs">

                <div className="text-[#71717a]">
                    <Icon size={19} />
                </div>

                {trend && (
                    <span className="text-xs font-semibold text-[#16a34a]">
                        {trend}
                    </span>
                )}

            </div>

            <div className="block text-[28px] font-bold text-[#18181b] my-[12px_0_5px] leading-tight">
                {value}
            </div>

            <div className="text-xs font-medium text-[#18181b] mb-1">
                {title}
            </div>

            <div className="text-[#71717a] text-[11px] m-0">
                {description}
            </div>

        </div>
    );
}

export default StatCard;