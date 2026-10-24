import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuthContext } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);

            // Save logged-in user and update React auth state
            login(data.user);

            // Go to dashboard
            navigate("/dashboard");
        } catch (error) {
            setError(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center p-4">
            <div className="w-full max-w-[390px] bg-white border border-[#e4e4e7] rounded-[14px] p-[35px]">

                {/* Logo */}
                <div className="flex items-center gap-[10px] text-[#18181b] text-[20px] font-bold mb-[30px]">
                    <div className="w-[30px] h-[30px] rounded-[9px] bg-[#18181b] text-white flex items-center justify-center font-extrabold text-sm">
                        N
                    </div>

                    Nexora
                </div>

                {/* Heading */}
                <h1 className="m-0 text-[25px] font-bold text-[#18181b]">
                    Welcome back
                </h1>

                <p className="text-[#71717a] text-[13px] mb-[24px] mt-1">
                    Sign in to continue to your workspace.
                </p>

                {/* Error */}
                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="mb-[16px]">
                        <label className="block text-[13px] font-medium text-[#3f3f46] mb-2">
                            Email address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full h-[44px] border border-[#d4d4d8] rounded-[8px] px-3 text-[14px] outline-none focus:border-[#18181b]"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-[20px]">
                        <label className="block text-[13px] font-medium text-[#3f3f46] mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full h-[44px] border border-[#d4d4d8] rounded-[8px] px-3 text-[14px] outline-none focus:border-[#18181b]"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[44px] bg-[#18181b] text-white rounded-[8px] text-[14px] font-medium hover:bg-[#27272a] transition disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                {/* Register */}
                <p className="mt-6 text-center text-[13px] text-[#71717a]">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-[#18181b] hover:underline"
                    >
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;