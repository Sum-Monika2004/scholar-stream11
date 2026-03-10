import React, { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../providers/AuthContext";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = use(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://scholar-stream-server-gules.vercel.app/reviews?email=${user.email}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

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
        fetch(`https://scholar-stream-server-gules.vercel.app/reviews/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            const remaining = reviews.filter((s) => s._id !== id);
            setReviews(remaining);

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

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedComment = e.target.comment.value;
    const updatedRating = Number(e.target.rating.value);

    fetch(
      `https://scholar-stream-server-gules.vercel.app/reviews/${selectedReview._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          reviewComment: updatedComment,
          ratingPoint: updatedRating,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const updatedList = reviews.map((r) =>
            r._id === selectedReview._id
              ? {
                  ...r,
                  reviewComment: updatedComment,
                  ratingPoint: updatedRating,
                }
              : r,
          );

          setReviews(updatedList);
          toast.success("Review updated");
          document.getElementById("edit_modal").close();
        }
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>University</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>{review.universityName}</td>
                <td>{review.reviewComment}</td>
                <td>{review.reviewDate}</td>
                <td>{review.ratingPoint}</td>
                <td className="space-x-2">
                  <button
                    className="btn bg-blue-400 text-white"
                    onClick={() => {
                      setSelectedReview(review);
                      document.getElementById("edit_modal").showModal();
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn bg-red-600 text-white"
                    onClick={() => handleDelete(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Review</h3>

          {selectedReview && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <textarea
                name="comment"
                defaultValue={selectedReview.reviewComment}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>

              <input
                type="number"
                name="rating"
                defaultValue={selectedReview.ratingPoint}
                min="1"
                max="5"
                className="input input-bordered w-full"
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("edit_modal").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyReviews;
