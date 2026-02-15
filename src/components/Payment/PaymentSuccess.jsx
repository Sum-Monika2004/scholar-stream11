import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import successImg from "../../assets/success.png";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const location = useLocation();
  const navigate = useNavigate();
  const [s, setS] = useState({});

  useEffect(() => {
    {
      fetch(
        `https://scholar-stream-server-gules.vercel.app/payment-success/${sessionId}`,
      )
        .then((res) => res.json())
        .then((result) => {
          setS(result);
        });
    }
  }, [sessionId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      fetch("https://scholar-stream-server-gules.vercel.app/verify-payment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          toast("Application saved:", data);
        });
    }
  }, []);

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
              <strong>Scholarship:</strong> {s.scholarshipName || "N/A"}
            </p>
            <p>
              <strong>University:</strong> {s.universityName || "N/A"}
            </p>
            <p>
              <strong>Amount Paid:</strong> ${s.amount || "0"}
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
