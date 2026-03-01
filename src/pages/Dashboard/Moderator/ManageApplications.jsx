import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthContext";

const ManageApplications = () => {
  const [app, setApp] = useState([]);
  const { user } = use(AuthContext);
  useEffect(() => {
    fetch("https://scholar-stream-server-gules.vercel.app/applications")
      .then((res) => res.json())
      .then((data) => {
        setApp(data);
      });
  }, []);

  const handleStatusUpdate = async (id, status) => {
    await fetch(
      `https://scholar-stream-server-gules.vercel.app/applications/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ status }),
      },
    );
  };

  const handleFeedback = async (id, feedback) => {
    await fetch(
      `https://scholar-stream-server-gules.vercel.app/applications/feedback/${id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({ feedback }),
      },
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Manage Applications
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Email</th>
                <th>University</th>
                <th>Feedback</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {app.map((a) => (
                <tr key={a._id}>
                  <td>{a.applicantEmail}</td>
                  <td>{a.universityName}</td>
                  <td>{a.applicationFeedback || "—"}</td>
                  <td>{a.applicationStatus}</td>
                  <td>{a.paymentStatus}</td>

                  <td className="space-x-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center justify-around gap-2 ">
                        {/* Details */}
                        <button className="btn bg-blue-400 btn-sm text-white ">
                          Details
                        </button>

                        {/* Feedback */}
                        <button
                          className="btn btn-sm bg-orange-600 text-white "
                          onClick={() => openFeedbackModal(a)}
                        >
                          Feedback
                        </button>
                        {/* Cancel */}
                        <button
                          className="btn btn-sm bg-red-600 text-white "
                          onClick={() => handleStatusUpdate(a._id, "Rejected")}
                        >
                          Cancel
                        </button>
                      </div>

                      {/* Status Update */}
                      <div className="ml-2">
                        <select
                          className="select select-sm"
                          onChange={(e) =>
                            handleStatusUpdate(a._id, e.target.value)
                          }
                        >
                          <option>Processing</option>
                          <option>Completed</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              {app.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6">
                    No Applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageApplications;
