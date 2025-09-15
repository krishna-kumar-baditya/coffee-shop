// src/pages/SignUp.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../Redux/Slice/authSlice";
import { useDispatch } from "react-redux";

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Watch file input value
    const profilePicFile = watch("profilePic");

    // Create preview URL
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (profilePicFile && profilePicFile.length > 0) {
            const file = profilePicFile[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }

        // Cleanup URL on unmount or change
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [profilePicFile]); // Removed eslint disable — it's safe now

    const onSubmit = async (data) => {
        try {
            // 👇 Create FormData and append ALL fields including file
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("age", data.age);

            // 👇 Append profile picture if selected
            if (profilePicFile && profilePicFile.length > 0) {
                formData.append("profilePic", profilePicFile[0]);
            }

            // 👇 Dispatch signup thunk with FormData
            dispatch(signup(formData))
                .unwrap()
                .then((res) => {
                    console.log(res);

                    // 👇 On success
                    toast.success(
                        "✅ Welcome to Brew & Co.! Your account is ready."
                    );
                    navigate("/signin"); // Redirect to sign-in after successful signup
                });
        } catch (error) {
            // 👇 Handle error from rejected promise
            toast.error(error || "Failed to create account. Please try again.");
        }
    };

    return (
        <div className="signup-container w-full min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center p-4">
            {/* Background texture overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2RjYmFjMyIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div>

            <form
                className="signup-form bg-gradient-to-b from-amber-50/80 to-amber-100/80 backdrop-blur-sm shadow-2xl p-8 border border-amber-200/60 rounded-3xl max-w-md w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-900">
                        Welcome to Brew & Co.
                    </h1>
                    <p className="mt-2 text-amber-700 text-sm">
                        Join us for the perfect cup — and the perfect account.
                    </p>
                </div>

                {/* First Name */}
                <div className="mb-6">
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.firstName
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="Your first name"
                    />
                    {errors.firstName && (
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
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                {/* Last Name */}
                <div className="mb-6">
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName", {
                            required: "Last name is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.lastName
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="Your last name"
                    />
                    {errors.lastName && (
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
                            {errors.lastName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Email
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

                {/* Password */}
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

                {/* Age */}
                <div className="mb-6">
                    <label
                        htmlFor="age"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        {...register("age", {
                            required: "Age is required",
                            min: {
                                value: 13,
                                message: "You must be at least 13",
                            },
                        })}
                        className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 bg-white/90 ${
                            errors.age
                                ? "border-red-500 bg-red-50"
                                : "border-amber-300 hover:border-amber-400 shadow-sm"
                        }`}
                        placeholder="How old are you?"
                    />
                    {errors.age && (
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
                            {errors.age.message}
                        </p>
                    )}
                </div>

                {/* Profile Picture with Preview */}
                <div className="mb-6">
                    <label
                        htmlFor="profilePic"
                        className="block text-sm font-medium text-amber-900 mb-2"
                    >
                        Profile Picture
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            {...register("profilePic", {
                                required: "Profile picture is required",
                            })}
                            className="sr-only"
                        />

                        {/* Preview Container */}
                        <div className="relative mb-3">
                            {previewUrl ? (
                                <div className="flex flex-col items-center">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-full border-4 border-amber-200 shadow-md hover:shadow-lg transition-shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewUrl(null);
                                            document.getElementById(
                                                "profilePic"
                                            ).value = "";
                                        }}
                                        className="mt-2 text-xs text-amber-700 hover:text-amber-900 underline font-medium"
                                    >
                                        Change Photo
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="profilePic"
                                    className="cursor-pointer flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-amber-300 rounded-2xl hover:border-amber-400 transition-colors group"
                                >
                                    <svg
                                        className="w-8 h-8 text-amber-400 group-hover:text-amber-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    <span className="mt-2 text-sm text-amber-600 group-hover:text-amber-800">
                                        Click to upload photo
                                    </span>
                                    <p className="text-xs text-amber-500 mt-1">
                                        JPG, PNG — max 2MB
                                    </p>
                                </label>
                            )}
                        </div>

                        {/* Error Message */}
                        {errors.profilePic && (
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
                                {errors.profilePic.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-amber-700/30"
                >
                    Create My Brew Account
                </button>

                {/* Login Link */}
                <div className="other-links w-full flex justify-between mt-6">
                    <p className="text-amber-800 font-medium text-sm">
                        Already have an account?
                    </p>
                    <Link
                        to="/signin"
                        className="no-underline text-amber-800 font-medium text-sm hover:text-amber-900 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
