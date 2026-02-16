import React from "react";
import { useEffect, useState, use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthContext";

const ManageUsers = () => {
  const { user } = use(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://scholar-stream-server-gules.vercel.app/users", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [user]);

  const handleRoleChange = (id, newRole) => {
    fetch(`https://scholar-stream-server-gules.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ role: newRole }),
    });

    toast.success("Role updated");

    setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
  };

  const handleDelete = (id) => {
    fetch(`https://scholar-stream-server-gules.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });

    toast.success("User deleted");

    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge">{u.role}</span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>

                <td className="space-x-2">
                  {/* Role Change */}
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "admin")}
                      className="btn btn-xs btn-success"
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
