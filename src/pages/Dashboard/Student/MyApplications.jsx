import React from "react";

import { useEffect, useState, use } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthContext";

const MyApplications = () => {
  const { user } = use(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://scholar-stream-server-gules.vercel.app/my-applications/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => setApplications(data));
  }, [user]);

  const handleDelete = async (id) => {
    fetch(`https://scholar-stream-server-gules.vercel.app/applications/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    });

    toast.success("Application deleted");
    setApplications(applications.filter((app) => app._id !== id));
  };

  // Submit Review
  const handleReviewSubmit = async () => {
    const reviewData = {
      scholarshipId: selectedApp.scholarshipId,
      scholarshipName: selectedApp.scholarshipName,
      universityName: selectedApp.universityName,
      reviewerEmail: user.email,
      rating,
      comment,
    };

    await fetch("https://scholar-stream-server-gules.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(reviewData),
    });

    toast.success("Review Added");
    document.getElementById("reviewModal").close();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>University</th>
              <th>Address</th>
              <th>Category</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.universityName}</td>
                <td>{app.universityAddress}</td>
                <td>{app.subjectCategory}</td>
                <td>${app.applicationFees}</td>
                <td>
                  <span className="badge">{app.applicationStatus}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>
                <td>{app.feedback || "No feedback yet"}</td>

                <td className="space-x-2">
                  {/* Details */}
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      document.getElementById("detailsModal").showModal();
                    }}
                    className="btn btn-xs"
                  >
                    Details
                  </button>

                  {/* Edit */}
                  {app.applicationStatus === "pending" && (
                    <button
                      onClick={() =>
                        navigate(`/dashboard/edit-application/${app._id}`)
                      }
                      className="btn btn-xs btn-info"
                    >
                      Edit
                    </button>
                  )}

                  {/* Pay */}
                  {app.applicationStatus === "pending" &&
                    app.paymentStatus === "unpaid" && (
                      <button
                        onClick={() =>
                          navigate(`/dashboard/payment/${app._id}`)
                        }
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </button>
                    )}

                  {/* Delete */}
                  {app.applicationStatus === "pending" && (
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  )}

                  {/* Add Review */}
                  {app.applicationStatus === "completed" && (
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        document.getElementById("reviewModal").showModal();
                      }}
                      className="btn btn-xs btn-success"
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <dialog id="detailsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Application Details</h3>
          {selectedApp && (
            <div className="space-y-2 mt-3">
              <p>
                <b>Scholarship:</b> {selectedApp.scholarshipName}
              </p>
              <p>
                <b>University:</b> {selectedApp.universityName}
              </p>
              <p>
                <b>Status:</b> {selectedApp.applicationStatus}
              </p>
              <p>
                <b>Payment:</b> {selectedApp.paymentStatus}
              </p>
              <p>
                <b>Feedback:</b> {selectedApp.feedback}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* REVIEW MODAL */}
      <dialog id="reviewModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Review</h3>

          <div className="mt-3 space-y-3">
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Rating (1-5)"
            />

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your comment..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button
              onClick={handleReviewSubmit}
              className="btn btn-success w-full"
            >
              Submit Review
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
