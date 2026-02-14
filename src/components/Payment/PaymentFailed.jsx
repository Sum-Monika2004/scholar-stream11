import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import failedImg from "../../assets/failed.png";

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [s, setS] = useState({});

  useEffect(() => {
    {
      fetch(`http://localhost:3000/payment-failure/${sessionId}`)
        .then((res) => res.json())
        .then((result) => {
          setS(result);
        });
    }
  }, [sessionId]);

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
              <strong>Scholarship:</strong> {s.scholarshipName || "N/A"}
            </p>
            <p>
              <strong>Amount :</strong> ${s.amount || "0"}
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
