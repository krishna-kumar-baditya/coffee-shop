import React from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../../Components/DashboardHeader/DashboardHeader";

function Dashboard({ children }) {
    return (
        <>
            <div className="dashboard w-full min-h-screen flex">
                <>
                    <DashboardSidebar />
                </>
                <div className="dashboard-content w-full">
                    <div>
                        <DashboardHeader />
                    </div>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
