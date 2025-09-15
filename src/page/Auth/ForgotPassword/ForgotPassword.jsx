import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ForgetPasswordForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();

    const newPassword = watch("password");

    const onSubmit = async (data) => {
        try {
            console.log(data);

            toast.success("✅ Your password has been updated successfully!");
            // Redirect to login after success
        } catch (error) {
            console.error("Error:", error);
            toast.error("Network error. Please check your connection.");
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
                        Reset your password
                    </p>
                </div>

                {/* Warning Banner (Highly Recommended for Security) */}
                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-xs text-yellow-800 flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        This form is intended for use by authorized users or
                        support staff. Only proceed if you have secure access to
                        the target email.
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
                        disabled={isSubmitting}
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

                {/* New Password Field */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        New Password
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
                        disabled={isSubmitting}
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

                {/* Confirm Password Field */}
                <div className="mb-6">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === newPassword ||
                                "Passwords do not match",
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.confirmPassword
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="••••••••"
                        disabled={isSubmitting}
                    />
                    {errors.confirmPassword && (
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
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-800 hover:bg-amber-900 disabled:bg-amber-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-amber-700/30 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
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
                            Updating...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-amber-300"></div>
                    <span className="px-4 text-amber-600 text-sm">or</span>
                    <div className="flex-grow border-t border-amber-300"></div>
                </div>

                {/* Back to Sign In */}
                <div className="text-center">
                    <p className="text-sm text-amber-700">
                        Remember your password?{" "}
                        <Link
                            to="/signin"
                            className="font-medium text-amber-800 hover:text-amber-900 underline"
                        >
                            Sign in instead
                        </Link>
                    </p>
                </div>

                {/* Footer note */}
                <p className="mt-8 text-center text-xs text-amber-600 italic">
                    By continuing, you agree to our{" "}
                    <a href="#" className="hover:text-amber-800 underline">
                        Privacy Policy
                    </a>
                    . Passwords are encrypted on our servers.
                </p>
            </form>
        </div>
    );
}

export default ForgetPasswordForm;
