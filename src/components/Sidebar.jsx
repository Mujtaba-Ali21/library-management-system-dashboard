import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar vh-100">
      <nav>
        <ul>
          <li className="item text-center">
            <i className="bi bi-house h5"></i>{" "}
            <span className="h6 fw-semibold">Home</span>
          </li>
          <a
            href="https://library-management-system-mujtaba-ali21s-projects.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            <li className="item text-center">
              <i className="bi bi-bookshelf h5"></i>{" "}
              <span className="h6 fw-semibold">Library</span>
            </li>
          </a>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
