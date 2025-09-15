// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";

function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true); // Show loading state

        try {
            dispatch(signin(data))
                .unwrap()
                .then((res) => {
                    console.log(res);
                    // 👇 Show success toast
                    toast.success(
                        "✅ Welcome back to Brew & Co.! You're logged in."
                    );

                    // 👇 Redirect to dashboard
                    navigate("/dashboard");
                });
        } catch (error) {
            // 👇 Handle error from backend or network
            toast.error(
                error || "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-4">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2RjYmFjMyIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div>

            <form
                className="signup-form bg-gradient-to-b from-amber-50/80 to-amber-100/80 backdrop-blur-sm shadow-2xl p-8 border border-amber-200/60 rounded-3xl max-w-md w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900 tracking-tight">
                        Brew & Co.
                    </h1>
                    <p className="mt-2 text-amber-700 text-sm">
                        Your favorite cup is just a click away.
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

                {/* Remember Me + Forgot Password */}
                <div className="flex flex-wrap gap-0.5 items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                        />
                        <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-amber-700"
                        >
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <Link
                            to="/forgot-password"
                            className="font-medium text-amber-800 hover:text-amber-900 no-underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
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

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-amber-300"></div>
                    <span className="px-4 text-amber-600 text-sm">
                        or continue with
                    </span>
                    <div className="flex-grow border-t border-amber-300"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-amber-300 rounded-2xl text-amber-800 hover:bg-amber-50 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-amber-300 rounded-2xl text-amber-800 hover:bg-amber-50 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-amber-700 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-medium text-amber-800 hover:text-amber-900 underline"
                    >
                        Create one
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default SignIn;
