import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import UserForm from "./component/UserForm";
import UserTable from "./component/UserTable";
import Login from "./module/login/Login";
import Signup from "./module/signup/Signup";
import { UserData } from "./component/Types";

const API_URL = "http://localhost:7004";

const App: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<UserData[]>([]);

  const fetchUsers = () => {
    axios.get<UserData[]>(`${API_URL}/get`)
      .then((res) => {
        console.log("Response from API:", res.data);
        setSubmittedData(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFormSubmit = () => {
    fetchUsers();
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={
          <>
            <button type="button" className=" btn btn-primary addUser" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add User
            </button>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h3 className="modal-title" id="exampleModalLabel">
                      User Form
                    </h3>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="containers">
                    <UserForm onFormSubmit={handleFormSubmit} />
                  </div>
                </div>
              </div>
            </div>
            <UserTable submittedData={submittedData} fetchUsers={fetchUsers} />
          </>
        } />
        <Route path="/" element={<Signup />} /> Default route
      </Routes>
    </Router>
  );
};

export default App;

