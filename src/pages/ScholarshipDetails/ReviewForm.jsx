import React, { useState } from "react";
import { use } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { toast } from "react-toastify";

const ReviewForm = ({ scholarshipId, singleS, onAddReview }) => {
  const { user } = use(AuthContext);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // if (!user) {
  //   return (
  //     <p className="mt-6 text-red-500">Please login to submit a review.</p>
  //   );
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      scholarshipId,
      universityName: singleS.universityName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: rating,
      reviewComment: comment,
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(reviewData),
    })
      .then((res) => res.json())

      .then((data) => {
        toast.success("Review submitted successfully");
        onAddReview(data);
        setComment("");
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 border border-gray-100 shadow-md p-6 rounded-lg bg-white"
    >
      <h4 className="text-xl font-semibold mb-4">Write a Review</h4>

      <label className="block mb-2">Rating</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="rounded p-2 w-full mb-4 border border-gray-200"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star
          </option>
        ))}
      </select>

      <label className="block mb-2">Comment</label>
      <textarea
        placeholder="Write Your Comment"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border border-gray-200 rounded p-2 w-full mb-4"
        rows="4"
      />

      <button className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded cursor-pointer">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
