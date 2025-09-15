import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { profileDetails } from "../../Redux/Slice/userSlice";
import { logout } from "../../Redux/Slice/authSlice";
import toast from "react-hot-toast";

function DashboardHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock user data — replace with real auth state later
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profileData } = useSelector((state) => state?.userKey);
    useEffect(() => {
        dispatch(profileDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(profileData);
    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logout");
        navigate('/signin')
    };
    console.log("isMenuOpen ", isMenuOpen);

    return (
        <header className="bg-white w-full shadow-sm border-b border-amber-100 px-4 py-4 md:px-6">
            <div className="max-w-7xl mx-auto flex md:flex-row items-start md:items-center justify-between gap-4 pl-6">
                {/* Logo & Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                        B&C
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-amber-900">
                            Brew & Co.
                        </h1>
                        <p className="text-xs text-amber-600 md:block">
                            Admin Dashboard
                        </p>
                    </div>
                </div>

                {/* Right Side: Notifications & User Menu */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <button className="relative p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-5 5v-5zM10.5 19V17a2 2 0 10-4 0v2M12 21a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                        {/* Notification badge */}
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    {/* User Avatar Dropdown */}
                    <div className="relative">
                        {" "}
                        {/* 👈 Already has relative — good! */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-300 rounded-full transition-all hover:shadow-md"
                            aria-label="User menu"
                        >
                            <img
                                src={profileData?.profilePic}
                                alt={profileData?.firstName}
                                className="w-8 h-8 rounded-full object-cover border-2 border-amber-200"
                            />
                            <span className="hidden md:inline-block text-sm font-medium text-amber-800">
                                {profileData?.firstName}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 text-amber-600 transition-transform ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-amber-100 py-1 z-50 animate-fadeIn"
                                onMouseLeave={() => setIsMenuOpen(false)}
                                style={{
                                    minWidth: "max-content",
                                    zIndex: 9999, // 👈 Force highest possible z-index
                                    transformOrigin: "top right",
                                    animation: "fadeIn 0.2s ease-out forwards",
                                }}
                            >
                                <Link
                                    to={`/dashboard/profile`}
                                    className="block w-full text-left px-4 py-2 text-sm text-amber-800 hover:bg-amber-50 rounded-t-2xl transition-colors"
                                >
                                    Profile
                                </Link>
                                <hr className="border-amber-100 my-1" />
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-2xl transition-colors"
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>{" "}
                </div>
            </div>

            {/* Mobile welcome message */}
            <div className="mt-4 md:hidden">
                <p className="text-sm text-amber-700">
                    Welcome back,{" "}
                    <strong className="text-amber-900">
                        {profileData?.firstName}
                    </strong>
                    !
                </p>
            </div>

            {/* Add fade-in animation */}
            {/* <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style> */}
        </header>
    );
}

export default DashboardHeader;
