import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // New state for Reg. No.
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }

    axios
      .post("http://localhost:3001/register", {
        name,
        email,
        regNo,
        password,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: "40%" }}>
          <h2 className="mb-3 text-primary">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputName" className="form-label">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                id="exampleInputName"
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
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
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputRegNo" className="form-label">
                <strong>Reg. No</strong>
              </label>
              <input
                type="varchar"
                placeholder="Enter Registration Number"
                className="form-control"
                id="exampleInputRegNo"
                onChange={(event) => setRegNo(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <strong>Password</strong>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle type between "text" and "password"
                  placeholder="Enter Password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="mb-3 text-start">
              <label
                htmlFor="exampleInputConfirmPassword"
                className="form-label"
              >
                <strong>Confirm Password</strong>
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"} // Toggle type between "text" and "password"
                  placeholder="Confirm Password"
                  className="form-control"
                  id="exampleInputConfirmPassword"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>

          <p className="container my-2">Already have an account?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
