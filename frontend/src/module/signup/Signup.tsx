import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const API_URL = "http://localhost:7004";

// Define the form data type
interface FormData {
  username: string;
  email: string;
  password: string;
}

// Define the form errors type
interface FormErrors {
  username: string;
  email: string;
  password: string;
}

// Define the response data type
interface ResponseData {
  message: string;
}

export default function Signup() {
  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  // Initialize form errors state
  const [formErrors, setFormErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
  });

  // Hook for navigation
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate the form
  const validateForm = (): boolean => {
    const errors: FormErrors = { username: "", email: "", password: "" };
    let isValid = true;

    if (formData.username.trim().length < 5) {
      errors.username = "Username must be at least 5 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          const data: ResponseData = await response.json();
          if (data.message === "Signup data successfully") {
            window.alert("Signup successful");
            console.log("Signup successful", data);
            navigate("/login");
          } else {
            window.alert("Signup successful but received unexpected response");
            console.log("Signup unexpected response:", data);
          }
        } else if (response.status === 400) {
          window.alert("Email already exists");
        } else {
          const data: ResponseData = await response.json();
          window.alert("Signup failed");
          console.log("Signup failed:", data);
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <form
          id="signup-form"
          method="post"
          className="signup-form"
          onSubmit={handleSubmit}
        >
          <h2 id="title" className="mb-4 text-center">
            Sign up
          </h2>

          <div className="mb-3">
            <input
              id="username-field"
              type="text"
              className={`form-control ${formErrors.username ? "is-invalid" : ""}`}
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
            <small className="text-danger" id="username-validation">
              {formErrors.username}
            </small>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <small className="text-danger" id="uname-validation">
              {formErrors.email}
            </small>
          </div>

          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            <small className="text-danger" id="pass-validation">
              {formErrors.password}
            </small>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              defaultChecked
              name="remember"
              id="remember"
            />
            <label className="form-check-label" htmlFor="remember">
              Remember me
            </label>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" id="Signup-button" className="Signup-button">
              Sign up
            </button>

            <Link
              to="/login"
              className="custom-link-class"
              aria-label="Already have an account?"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
