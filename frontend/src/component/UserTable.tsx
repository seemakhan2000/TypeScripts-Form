
import React, { useState } from "react";
import axios from "axios";
import { UserData } from "./Types";
const API_URL = "http://localhost:7004";

interface UserTableProps {
  // Array of user data to display in the table.
  submittedData: UserData[];
  // Function to call to fetch users.
fetchUsers: () => void;
}

const UserTable: React.FC<UserTableProps> = ({ submittedData, fetchUsers }) => {
  //Stores the user object being edited or null if no user is being edited.
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  // Controls whether the edit user modal is shown (true) or hidden (false).
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (id: string) => {
    console.log("Deleting data with ID:", id);
    axios
      .delete(`${API_URL}/delete/${id}`)
      .then((response) => {
        console.log("Data deleted successfully", response.data);
        fetchUsers();
      })
      .catch((error) => {
        console.error("There was an error deleting the data!", error);
      });
  };



/*This function sets editingUser to the selected user object and sets showModal to 
true, displaying the edit modal.*/
  const handleEditClick = (user: UserData) => {
    setEditingUser(user);
    setShowModal(true);
  };


//Resets showModal to false and clears editingUser, closing the modal.
  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
  };


  /*Updates editingUser state when input values change in the modal form. It uses e.target.name to 
  dynamically update the corresponding property (username, email, phone) of editingUser.*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        await axios.put(`${API_URL}/update/${editingUser._id}`, editingUser);
        console.log("User edited successfully", editingUser);
        fetchUsers();
        handleModalClose();
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  return (
    <div>
      {/* Modal */}
      {showModal && editingUser && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title edit-user">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={editingUser.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={editingUser.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary save-changes">
                    Save changes
                  </button>
                </form>
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table" id="myTable">
        <thead className="table-dark">
          <tr className="th">
            <th scope="col">S.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(data._id)}
                >
                  <i className="fas fa-trash" />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEditClick(data)}
                >
                  <i className="fas fa-pencil-alt" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
