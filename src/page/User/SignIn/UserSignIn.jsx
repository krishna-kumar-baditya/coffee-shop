// User Sign In Page (separate from admin signin)
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userSignin } from "../../../Redux/Slice/userAuthSlice";
import { useDispatch } from "react-redux";

function UserSignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            await dispatch(userSignin(data)).unwrap();
            toast.success("Welcome back! You're logged in.");
            navigate("/");
        } catch (error) {
            toast.error(
                error || "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-4">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2RjYmFjMyIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div>

            <form
                className="signup-form bg-gradient-to-b from-amber-50/80 to-amber-100/80 backdrop-blur-sm shadow-2xl p-8 border border-amber-200/60 rounded-3xl max-w-md w-full relative z-10"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900 tracking-tight">
                        Brew & Co.
                    </h1>
                    <p className="mt-2 text-amber-700 text-sm">
                        Sign in to continue shopping
                    </p>
                </div>

                {/* Email Field */}
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email",
                            },
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.email
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="you@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.password
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                            <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-amber-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing In...
                        </div>
                    ) : (
                        "Sign In"
                    )}
                </button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-amber-700 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/user/signup"
                        className="font-medium text-amber-800 hover:text-amber-900 underline"
                    >
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default UserSignIn;


