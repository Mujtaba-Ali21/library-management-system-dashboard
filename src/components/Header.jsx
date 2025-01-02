import React from "react";

import "../styles/Header.css";

function Header() {
  return (
    <header className="header">
      <div className="breadcrumb"></div>
      <div className="actions">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </header>
  );
}

export default Header;
