import React, { useState } from "react";
import axios from "axios";
import  FormValue  from "../component/Types";
const API_URL = "http://localhost:7004";


//the username property is optional and should be a string
interface ValidationError {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
}

// Function to call when the form is submitted.
interface UserFormProps {
  onFormSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ onFormSubmit }) => {
  // State to manage form values.
  const [formValue, setFormValue] = useState<FormValue>({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<ValidationError>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleValidation = (): boolean => {
    let errors: ValidationError = {};
    let isValid = true;

    if (!formValue.username) {
      errors.username = "Username is required";
      isValid = false;
    }
    if (!formValue.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!formValue.phone) {
      errors.phone = "Phone is required";
      isValid = false;
    }
    if (!formValue.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };


  // Handler for form submission.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (handleValidation()) {
      axios
        .post(`${API_URL}`, formValue)
        .then((response) => {
          console.log("Form submitted successfully", response.data);
          setFormValue({
            username: "",
            email: "",
            phone: "", 
            password: "",
          });
          setValidationErrors({});
          onFormSubmit();
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="username"
          value={formValue.username}
          onChange={handleInput}
        />
        {validationErrors.username && (
          <small className="text-danger">{validationErrors.username}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formValue.email}
          onChange={handleInput}
        />
        {validationErrors.email && (
          <small className="text-danger">{validationErrors.email}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone:
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={formValue.phone}
          onChange={handleInput}
        />
        {validationErrors.phone && (
          <small className="text-danger">{validationErrors.phone}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formValue.password}
          onChange={handleInput}
        />
        {validationErrors.password && (
          <small className="text-danger">{validationErrors.password}</small>
        )}
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;
