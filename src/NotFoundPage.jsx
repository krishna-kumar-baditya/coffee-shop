import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 flex items-center justify-center p-4">
            {/* Background texture overlay
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2RjYmFjMyIgb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30"></div> */}

            <div className="text-center max-w-md mx-auto">
                {/* Emoji + Icon */}
                <div className="mb-6">
                    <span className="text-8xl">☕</span>
                </div>

                {/* Title */}
                <h1 className="text-5xl font-bold text-amber-900 mb-2">404</h1>
                <h2 className="text-2xl font-medium text-amber-800 mb-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-amber-700 text-lg mb-8 leading-relaxed">
                    Oops! The page you’re looking for is nowhere to be found —
                    maybe it’s hiding in the coffee beans?
                </p>

                {/* Action Button */}
                <Link
                    to="/"
                    className=" cursor-pointer  inline-block bg-amber-800 hover:bg-amber-900 text-white font-semibold py-3 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Go Back to Dashboard
                </Link>

                {/* Footer Note */}
                <p className="mt-12 text-xs text-amber-600 italic">
                    If you think this is a mistake, please contact support.
                </p>
            </div>
        </div>
    );
}

export default NotFoundPage;
