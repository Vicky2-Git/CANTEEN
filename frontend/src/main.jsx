import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const MainApp = () => (
  <div>
    <h1>Cafeteria Management System</h1>
    <App /> {/* You can keep App component for routing and logic */}
    {/* Add the AddProduct component wherever you want */}
    <Footer />
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
