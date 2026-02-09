import React from "react";
import starImg from "../../assets/star.png";
import ReviewForm from "./ReviewForm";

const ReviewsSection = ({ reviews, scholarshipId, singleS, onAddReview }) => {
  return (
    <div className="mt-10 rounded-2xl">
      <div className="p-8">
        <h3 className="text-5xl text-center font-bold mb-4">Student Reviews</h3>

        <div className="space-y-4">
          {reviews.length === 0 && (
            <p className="text-gray-500 text-center text-xl">No reviews yet.</p>
          )}

          {/* review card */}

          {reviews.map((review) => (
            <div
              key={review._id}
              className=" rounded-lg p-4 shadow-md border border-gray-100 bg-white "
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3 bg-white">
                  <img
                    src={review.userImage}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-sm text-gray-400">{review.reviewDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-orange-300 badge-info">
                  <span>{review.ratingPoint}</span>
                  <img className="w-4 h-4" src={starImg} alt="" />
                </div>
              </div>

              <p className="mt-2 text-gray-700">{review.reviewComment}</p>
            </div>
          ))}
        </div>

        {/* Add review */}
        <ReviewForm
          scholarshipId={scholarshipId}
          singleS={singleS}
          onAddReview={onAddReview}
        />
      </div>
    </div>
  );
};

export default ReviewsSection;
