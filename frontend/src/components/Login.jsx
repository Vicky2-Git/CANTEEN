import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "./img/background.jpeg"; // Import the background image


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the email and password are for the admin
    if (email === "admin@gmail.com" && password === "admin123") {
      navigate("/Admin"); // Navigate to admin page if the credentials match
      return;
    }

    // If not admin credentials, make an API call to check for normal login
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          console.log("Login Success");
          alert("Login successful!");
          navigate("/menu"); // Navigate to home page after successful login
        } else {
          alert("Incorrect password! Please try again.");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Background Image */}
      <img
        src={BackgroundImage}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div className="d-flex justify-content-center align-items-center vh-100">
        {/* Blurred Container */}
        <div
          className="p-5 rounded text-center"
          style={{
            width: "30%",
            background: "rgba(0, 0, 0, 0.5)", // Dark transparent background
            backdropFilter: "blur(10px)", // Blur effect
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)", // Shadow for contrast
            border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
            color: "#f8f9fa", // Light font color
          }}
        >
          <h2 className="mb-4" style={{ color: "#00d5ff" }}>
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Email Id</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                }}
              />
            </div>
            <div className="mb-4 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(event) => setPassword(event.target.value)}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#fff",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "#00d5ff",
                color: "#000",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              Login
            </button>
          </form>
          <a href="/forgot-password" style={{ color: "#00d5ff" }}>
            Forgot Password?
          </a>
          <p className="container my-3" style={{ color: "#f8f9fa" }}>
            Don&apos;t have an account?
          </p>
          <br />
          <Link
            to="/register"
            className="btn mt-3"
            style={{
              backgroundColor: "#0095ff",
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
