function ActivityItem({
    avatar,
    name,
    action,
    time,
}) {
    return (
        <div className="flex items-start gap-3 p-[15px_20px] border-b border-[#f4f4f5] last:border-b-0">

            <div className="w-8 h-8 rounded-full bg-[#e4e4e7] text-[#18181b] text-xs font-bold flex items-center justify-center shrink-0">
                {avatar}
            </div>

            <div className="flex-1 text-xs text-[#71717a]">

                <p className="m-0 leading-snug">
                    <strong className="font-semibold text-[#18181b]">{name}</strong>{" "}
                    {action}
                </p>

                <span className="block text-[10px] text-[#a1a1aa] mt-1">{time}</span>

            </div>

        </div>
    );
}

export default ActivityItem;