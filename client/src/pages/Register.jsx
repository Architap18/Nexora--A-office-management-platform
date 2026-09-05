import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phoneNumber: "",
        email: "",
        username: "",
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
            await registerUser(formData);

            // Registration successful
            navigate("/login");

        } catch (error) {
            setError(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md">

                <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">

                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-zinc-900">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Start managing your team with Nexora.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Phone */}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="9999999999"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                                required
                            />
                        </div>

                        {/* Email */}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                                required
                            />
                        </div>

                        {/* Username */}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="janedoe"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                                required
                            />
                        </div>

                        {/* Password */}

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm outline-none focus:border-zinc-900"
                                required
                            />
                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>

                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-zinc-900 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Register;