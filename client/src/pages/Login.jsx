function Login() {
    return (
        <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center p-4">

            <div className="w-full max-w-[390px] bg-white border border-[#e4e4e7] rounded-[14px] p-[35px]">

                <div className="flex items-center gap-[10px] text-[#18181b] text-[20px] font-bold p-0 mb-[30px]">
                    <div className="w-[30px] h-[30px] rounded-[9px] bg-[#18181b] text-white flex items-center justify-center font-extrabold text-sm">N</div>
                    Nexora
                </div>

                <h1 className="m-0 text-[25px] font-bold text-[#18181b]">Welcome back</h1>

                <p className="text-[#71717a] text-[13px] mb-[24px] mt-1">
                    Sign in to continue to your workspace.
                </p>

                <input
                    type="email"
                    placeholder="Email address"
                    className="w-full p-[11px] border border-[#d4d4d8] rounded-[7px] mb-[10px] outline-none text-sm text-[#18181b] placeholder-[#a1a1aa] focus:border-[#18181b] transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-[11px] border border-[#d4d4d8] rounded-[7px] mb-[10px] outline-none text-sm text-[#18181b] placeholder-[#a1a1aa] focus:border-[#18181b] transition"
                />

                <button className="w-full mt-2 border-0 bg-[#18181b] hover:bg-[#27272a] text-white rounded-lg p-[11px] text-[13px] font-semibold transition cursor-pointer">
                    Sign in
                </button>

            </div>

        </div>
    );
}

export default Login;