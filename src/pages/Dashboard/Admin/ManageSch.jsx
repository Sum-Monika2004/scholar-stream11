import React from "react";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { DotLoader } from "react-spinners";
import Swal from "sweetalert2";

const ManageSch = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/all-scholarships")
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/all-scholarships/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const remaining = scholarships.filter((s) => s._id !== id);
            setScholarships(remaining);

            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <DotLoader className="w-1 h-4" color="#1E2C85" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Manage Scholarships</h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship</th>
              <th>University</th>
              <th>Country</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.scholarshipName}</td>
                <td>{item.universityName}</td>
                <td>{item.universityCountry}</td>
                <td>{item.degree}</td>
                <td>{item.applicationDeadline}</td>

                <td className="text-center space-x-2">
                  <Link
                    to={`/dashboard/update-scholarship/${item._id}`}
                    className="btn btn-sm bg-blue-400 hover:opacity-80 text-white"
                  >
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm bg-red-600 hover:opacity-50 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {scholarships.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSch;
