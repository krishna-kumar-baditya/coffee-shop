// src/pages/ProfilePage.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import { IoMdPerson } from "react-icons/io";
import { TfiEmail } from "react-icons/tfi";

import Dashboard from "../../Dashboards/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { profileDetails } from "../../Redux/Slice/userSlice";

function ProfilePage() {
    const dispatch = useDispatch();
    const { profileData } = useSelector((state) => state?.userKey);
    useEffect(() => {
        dispatch(profileDetails());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(profileData);

    return (
        <>
            <Dashboard>
                <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">
                    {/* Background texture overlay (same as signup) */}
                    {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2RjYmFjMyIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div> */}

                    <div className="max-w-4xl mx-auto pt-16 pb-20">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-amber-900">
                                Your Profile
                            </h1>
                            <p className="mt-2 text-amber-700 text-sm">
                                Manage your account details and preferences
                            </p>
                        </div>

                        {/* Main Profile Card */}
                        <div className="bg-gradient-to-b from-amber-50/80 to-amber-100/80 backdrop-blur-sm shadow-2xl border border-amber-200/60 rounded-3xl p-8 md:p-10 max-w-2xl mx-auto">
                            {/* Avatar & Name Section */}
                            <div className="flex flex-col items-center md:flex-row md:items-start gap-8 mb-10">
                                <div className="relative">
                                    <img
                                        src={profileData?.profilePic}
                                        alt={`${profileData?.firstName} ${profileData?.lastName}`}
                                        className="w-32 h-32 object-cover rounded-full border-4 border-amber-200 shadow-lg"
                                    />
                                    {/* <button className="absolute -bottom-2 -right-2 bg-amber-800 text-white p-2 rounded-full shadow-md hover:bg-amber-900 transition-colors">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </button> */}
                                </div>

                                <div className="text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-amber-900">
                                        {profileData?.firstName}{" "}
                                        {profileData?.lastName}
                                    </h2>
                                    <p className="text-amber-700 mt-1">
                                        {profileData?.email}
                                    </p>
                                    <p className="text-amber-600 text-sm mt-1">
                                        Joined:{" "}
                                        <span className="font-medium">
                                            {profileData?.joinedDate}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-amber-200 my-8"></div>

                            {/* Profile Details List */}
                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4 p-5 bg-white/70 rounded-2xl border border-amber-100 shadow-sm">
                                    <div className="bg-amber-100 p-3 rounded-xl text-amber-700 flex-shrink-0">
                                        <TfiEmail className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-amber-900">
                                            Email Address
                                        </h3>
                                        <p className="text-amber-700 mt-1">
                                            {profileData?.email}
                                        </p>
                                        {/* <button className="mt-2 text-sm text-amber-600 hover:text-amber-800 underline font-medium">
                                            Change
                                        </button> */}
                                    </div>
                                </div>

                                {/* Age */}
                                <div className="flex items-start gap-4 p-5 bg-white/70 rounded-2xl border border-amber-100 shadow-sm">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-amber-900">
                                            Age
                                        </h3>
                                        <p className="text-amber-700 mt-1">
                                            {profileData?.age} years old
                                        </p>
                                        {/* <button className="mt-2 text-sm text-amber-600 hover:text-amber-800 underline font-medium">
                                            Edit
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                            {/* Back to Dashboard Link */}
                            <div className="text-center mt-8">
                                <Link
                                    to="/dashboard"
                                    className="text-amber-800 text-sm hover:text-amber-900 underline font-medium"
                                >
                                    ← Back to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
        </>
    );
}

export default ProfilePage;
