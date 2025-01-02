import React from "react";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              Home
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is the main content area. Customize it as needed!</p>
      </main>
    </div>
  );
};

export default Dashboard;
