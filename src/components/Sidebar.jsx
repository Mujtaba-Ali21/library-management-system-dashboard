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
          <li className="item text-center">
            <i className="bi bi-bookshelf h5"></i>{" "}
            <a
              href="https://library-management-system-mujtaba-ali21s-projects.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="h6 fw-semibold text-decoration-none"
            >
              Library
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
