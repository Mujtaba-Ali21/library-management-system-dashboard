import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductsTable from "./components/BooksTable";
import "./styles/App.css";

function App() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <ProductsTable />
      </div>
    </div>
  );
}

export default App;
