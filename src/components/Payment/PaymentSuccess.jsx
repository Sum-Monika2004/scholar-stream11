import React from "react";
import { Link, useLocation } from "react-router";
import successImg from "../../assets/success.png";

const PaymentSuccess = () => {
  const location = useLocation();

  // Optional data passed from checkout
  const { scholarshipName, universityName, amount } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="items-center justify-center flex ">
            <img className="w-20 h-20 object-cover" src={successImg} alt="" />
          </div>

          <h2 className="text-3xl font-semibold text-success">
            Payment Successful
          </h2>

          <p className="mt-2 text-gray-500 text-[15px]">
            Your scholarship application has been submitted successfully.
          </p>

          <div className="divider"></div>

          <div className="text-left space-y-2">
            <p>
              <strong>Scholarship:</strong> {scholarshipName || "N/A"}
            </p>
            <p>
              <strong>University:</strong> {universityName || "N/A"}
            </p>
            <p>
              <strong>Amount Paid:</strong> ${amount || "0"}
            </p>
          </div>

          <div className="card-actions justify-center mt-6">
            <Link
              to="/dashboard/my-applications"
              className="btn bg-green-500 text-white w-full"
            >
              Go to My Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
