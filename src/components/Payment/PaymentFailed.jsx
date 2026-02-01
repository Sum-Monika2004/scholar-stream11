import React from "react";
import { Link, useLocation } from "react-router";
import failedImg from "../../assets/failed.png";

const PaymentFailed = () => {
  const location = useLocation();

  const { scholarshipName, errorMessage } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="flex items-center justify-center">
            <img className="w-20 h-20 object-cover" src={failedImg} alt="" />
          </div>

          <h2 className="text-2xl font-bold text-error">Payment Failed</h2>

          <p className="mt-2 text-gray-600">
            Unfortunately, your payment could not be completed.
          </p>

          <div className="divider"></div>

          <div className="text-left space-y-2">
            <p>
              <strong>Scholarship:</strong> {scholarshipName || "N/A"}
            </p>
            <p className="text-gray-400">
              <strong className="text-red-600">Error:</strong>{" "}
              {errorMessage || "Transaction failed. Please try again."}
            </p>
          </div>

          <div className="card-actions justify-center mt-6">
            <Link to="/dashboard" className="btn bg-red-500 text-white w-full">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
