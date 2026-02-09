import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
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
        fetch(`http://localhost:3000/reviews/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        All Student Reviews
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>User</th>
              <th>University</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, index) => (
              <tr key={review._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={review.userImage}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{review.userName}</p>
                      <p className="text-sm text-gray-400">
                        {review.userEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td>{review.universityName}</td>

                <td className="max-w-xs truncate">{review.reviewComment}</td>

                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm bg-red-600 text-white hover:opacity-65"
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

export default Reviews;
