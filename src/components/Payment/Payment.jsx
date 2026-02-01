import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [singleS, setSingleS] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/all-scholarships/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleS(data.result);
      });
  }, []);

  const totalAmount =
    singleS.tuitionFees + singleS.applicationFees + singleS.serviceCharge;

  const handlePayment = (e) => {
    e.preventDefault();
    toast("Payment Successful! Application Submitted.");
    navigate("/payment-success", {
      state: {
        scholarshipName: singleS.scholarshipName,
        universityName: singleS.universityName,
        amount: totalAmount,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Scholarship Application Payment
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scholarship Summary */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Scholarship Summary</h3>
            <p>
              <strong>Scholarship:</strong> {singleS.scholarshipName}
            </p>
            <p>
              <strong>University:</strong> {singleS.universityName}
            </p>
            <p>
              <strong>tuition Fee:</strong> ${singleS.tuitionFees}
            </p>
            <p>
              <strong>Application Fee:</strong> ${singleS.applicationFees}
            </p>
            <p>
              <strong>Service Charge:</strong> ${singleS.serviceCharge}
            </p>

            <div className="divider"></div>

            <p className="text-xl font-bold">Total: ${totalAmount}</p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Payment Details</h3>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="label">Card Holder Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Card Number</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Expiry Date</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label className="label">CVV</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn bg-green-500 text-white hover:opacity-75 w-full"
              >
                Pay & Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
