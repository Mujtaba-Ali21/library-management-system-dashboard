import React from "react";
import '../styles/Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar vh-100">
      <nav>
        <ul>
          <li className="item text-center">
            <i className="bi bi-house h5"></i>{" "}
            <span className="h6 fw-semibold">Home</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
