import React from "react";
import { useEffect, useState, use } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthContext";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { user } = use(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("https://scholar-stream-server-gules.vercel.app/users", {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [user]);

  // const handleRoleChange = (id, newRole) => {
  //   fetch(`https://scholar-stream-server-gules.vercel.app/users/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${user.accessToken}`,
  //     },
  //     body: JSON.stringify({ role: newRole }),
  //   });

  //   toast.success("Role updated");

  //   setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
  // };

  const handleDelete = (id) => {
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   if (result.isConfirmed) {
    fetch(`https://scholar-stream-server-gules.vercel.app/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data);

    const remaining = users.filter((s) => s._id !== id);
    setUsers(remaining);

    //   Swal.fire({
    //     title: "Deleted!",
    //     text: "Your user has been deleted.",
    //     icon: "success",
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    //   }
    // });
  };

  useEffect(() => {
    if (!user?.email) return;

    const loadUsers = async () => {
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const res = await fetch(
          `https://scholar-stream-server-gules.vercel.app/users?searchText=${searchText}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("User fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [user, searchText]);

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
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge border dark:border-blue-200">
                    {u.role}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>

                <td className="space-x-2">
                  {/* Role Change */}
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(u._id, "admin")}
                      className="btn bg-blue-400 text-white"
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn bg-red-600 text-white btn-error"
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

    // <div>
    //   <h2 className="text-4xl">Manage Users: {users.length}</h2>
    //   <p>search text: {searchText}</p>
    //   <label className="input">
    //     <svg
    //       className="h-[1em] opacity-50"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //     >
    //       <g
    //         strokeLinejoin="round"
    //         strokeLinecap="round"
    //         strokeWidth="2.5"
    //         fill="none"
    //         stroke="currentColor"
    //       >
    //         <circle cx="11" cy="11" r="8"></circle>
    //         <path d="m21 21-4.3-4.3"></path>
    //       </g>
    //     </svg>
    //     <input
    //       onChange={(e) => setSearchText(e.target.value)}
    //       type="search"
    //       className="grow"
    //       placeholder="Search users"
    //     />
    //   </label>
    //   <div className="overflow-x-auto">
    //     <table className="table">
    //       {/* head */}
    //       <thead>
    //         <tr>
    //           <th>#</th>
    //           <th>User</th>
    //           <th>Email</th>
    //           <th>Role</th>
    //           <th>Admin Action</th>
    //           <th>Others Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {users.map((user, index) => (
    //           <tr>
    //             <td>{index + 1}</td>
    //             <td>
    //               <div className="flex items-center gap-3">
    //                 <div className="avatar">
    //                   <div className="mask mask-squircle h-12 w-12">
    //                     <img
    //                       src={user.photoURL}
    //                       alt="Avatar Tailwind CSS Component"
    //                     />
    //                   </div>
    //                 </div>
    //                 <div>
    //                   <div className="font-bold">{user.displayName}</div>
    //                   <div className="text-sm opacity-50">United States</div>
    //                 </div>
    //               </div>
    //             </td>
    //             <td>{user.email}</td>
    //             <td>{user.role}</td>
    //             <td>
    //               {user.role === "admin" ? (
    //                 <button
    //                   onClick={() => handleRemoveAdmin(user)}
    //                   className="btn bg-red-300"
    //                 >
    //                   <FiShieldOff />
    //                 </button>
    //               ) : (
    //                 <button
    //                   onClick={() => handleMakeAdmin(user)}
    //                   className="btn bg-green-400"
    //                 >
    //                   <FaUserShield></FaUserShield>
    //                 </button>
    //               )}
    //             </td>
    //             <th>Actions</th>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default ManageUsers;
