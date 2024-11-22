import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Lấy danh sách người dùng
  const getUsers = async () => {
    const response = await axios.get("http://localhost:3000/users");
    setUsers(response.data);
  };

  // Tạo người dùng mới
  const createUser = async () => {
    await axios.post("http://localhost:3000/users", newUser);
    setNewUser({ name: "", email: "" }); // Reset form
    getUsers(); // Tải lại danh sách người dùng
  };

  // Cập nhật người dùng (Ví dụ, thay đổi tên)
  const updateUser = async (id, updatedData) => {
    await axios.patch(`http://localhost:3000/users/${id}`, updatedData);
    getUsers(); // Tải lại danh sách người dùng
  };

  // Xóa người dùng
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    getUsers(); // Tải lại danh sách người dùng
  };

  useEffect(() => {
    getUsers(); // Tải danh sách người dùng khi ứng dụng khởi động
  }, []);

  return (
    <div>
      <h1>User CRUD Operations</h1>

      {/* Form tạo người dùng */}
      <div>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={createUser}>Create</button>
      </div>

      {/* Danh sách người dùng */}
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button
              onClick={() => updateUser(user.id, { name: "Updated Name" })}
            >
              Update
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
