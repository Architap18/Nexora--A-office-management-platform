import {
    Search,
    Bell,
    Plus,
    Command,
} from "lucide-react";

function Topbar() {
    return (
        <header className="h-[68px] border-b border-[#e4e4e7] bg-white/90 backdrop-blur-sm flex items-center justify-between px-[35px] max-[700px]:px-[18px] sticky top-0 z-10">

            <div className="flex items-center gap-2 bg-[#f4f4f5] border border-[#e4e4e7] rounded-lg px-[10px] py-[7px] text-[#71717a] max-[700px]:hidden">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search anything..."
                    className="bg-transparent border-0 outline-none text-xs text-[#18181b] placeholder-[#71717a] w-48"
                />

                <div className="flex items-center gap-0.5 text-[10px] border border-[#d4d4d8] bg-white rounded px-1.5 py-0.5 text-[#71717a]">
                    <Command size={12} />
                    K
                </div>

            </div>

            <div className="flex items-center gap-2.5">

                <button className="flex items-center gap-1.5 border-0 bg-[#18181b] hover:bg-[#27272a] text-white rounded-lg px-3.5 py-[9px] text-[13px] font-semibold transition cursor-pointer">
                    <Plus size={17} />
                    <span>New</span>
                </button>

                <button className="w-[35px] h-[35px] border-0 bg-transparent hover:bg-gray-100 rounded-lg flex items-center justify-center relative cursor-pointer text-[#71717a] transition">
                    <Bell size={19} />
                    <span className="absolute w-[6px] h-[6px] rounded-full bg-[#ef4444] top-[6px] right-[6px]"></span>
                </button>

                <div className="w-8 h-8 rounded-full bg-[#e4e4e7] text-[#18181b] flex items-center justify-center text-[11px] font-bold cursor-pointer">
                    AP
                </div>

            </div>

        </header>
    );
}

export default Topbar;