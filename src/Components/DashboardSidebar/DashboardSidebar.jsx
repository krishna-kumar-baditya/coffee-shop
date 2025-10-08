// src/components/DashboardSidebar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsReverseLayoutTextSidebarReverse } from "react-icons/bs";
import { useSidebar } from "../../Context/SidebarContext";

function DashboardSidebar() {
    const { isOpen, dispatch } = useSidebar();
    const [isMobile, setIsMobile] = useState(false);

    const navItems = [
        {
            id: "products",
            label: "Products",
            icon: "☕",
            path: "/dashboard/productlists",
        },
        // {
        //     id: "orders",
        //     label: "Orders",
        //     icon: "📦",
        //     path: "/dashboard/orders",
        // },
        // {
        //     id: "customers",
        //     label: "Customers",
        //     icon: "👥",
        //     path: "/dashboard/customers",
        // },
        // {
        //     id: "analytics",
        //     label: "Analytics",
        //     icon: "📊",
        //     path: "/dashboard/analytics",
        // },
        // {
        //     id: "settings",
        //     label: "Settings",
        //     icon: "⚙️",
        //     path: "/dashboard/settings",
        // },
    ];

    const toggle = () => {
        dispatch({ type: "TOGGLE" });
    };
    const close = () => {
        dispatch({ type: "CLOSE" });
    };

    // Sync sidebar state with screen size + respect user intent
    useEffect(() => {
        const checkWidth = () => {
            const isMobileNow = window.innerWidth < 1024;
            setIsMobile(isMobileNow);

            // if (isMobileNow) {
            //     dispatch({ type: "OPEN" }); // Mobile: always open
            // } else {
            //     dispatch({ type: "CLOSE" }); // Desktop: only close if user didn't touch it
            // }
        };

        checkWidth(); // Run on mount
        window.addEventListener("resize", checkWidth);

        return () => window.removeEventListener("resize", checkWidth);
    }, [dispatch]);

    // Close sidebar on Escape key (mobile only)
    // useEffect(() => {
    //     const handleEscape = (e) => {
    //         if (e.key === "Escape" && isMobile && isOpen) {
    //             dispatch({ type: "CLOSE" });
    //         }
    //     };

    //     window.addEventListener("keydown", handleEscape);
    //     return () => window.removeEventListener("keydown", handleEscape);
    // }, [isMobile, isOpen, dispatch]);

    console.log("isOpen:", isOpen, "isMobile:", isMobile);

    return (
        <>
            {/* Overlay to close sidebar on click (mobile only) */}
            {/* {isOpen && isMobile && ( */}
                {/* <div
                    className="fixed top-0 left-0 w-full h-screen bg-opacity-50 z-30"
                    onClick={toggle}
                    aria-label="Close sidebar overlay"
                ></div> */}
            {/* )} */}

            {/* Toggle Button (hidden on desktop) */}
            <button
                className={` absolute transition-all ease-in-out duration-200 text-2xl text-amber-900 z-50 ${
                    isOpen ? "left-50 top-7" : "left-4 top-7"
                }`}
                onClick={toggle}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
                <BsReverseLayoutTextSidebarReverse />
            </button>

            {/* Sidebar Content */}
            <aside
                className={`bg-gradient-to-b from-amber-50 to-amber-100 border-r border-amber-200 flex flex-col h-screen w-64 fixed ${!isMobile && isOpen && ' lg:static'} left-0 top-0 shadow-lg z-40 transition-all duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-[107%]"
                }`}
                aria-label="Main navigation sidebar"
            >
                {/* Logo / Brand */}
                <div className="p-6 flex items-center gap-3 border-b border-amber-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        B&C
                    </div>
                    <span className="text-amber-900 font-bold text-lg">
                        Brew & Co.
                    </span>
                </div>

                {/* Navigation Links */}
                <nav className="mt-6 px-3 space-y-1 flex-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            onClick={close}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group ${
                                window.location.pathname === item.path
                                    ? "bg-amber-200 text-amber-900 shadow-sm border-l-4 border-amber-600"
                                    : "text-amber-700 hover:bg-amber-100 hover:text-amber-900"
                            }`}
                            aria-current={window.location.pathname === item.path ? "page" : undefined}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer Section — User Info */}
                <div className="p-4 border-t border-amber-200 mt-auto">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 text-amber-800">
                        <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center text-xs font-medium text-amber-700">
                            U
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium">Admin User</p>
                            <p className="text-xs opacity-80">riya@brewco.com</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default DashboardSidebar;