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
  }, [id, user]);

  const totalAmount =
    (singleS?.tuitionFees || 0) +
    (singleS?.applicationFees || 0) +
    (singleS?.serviceCharge || 0);

  const paymentInfo = {
    scholarshipId: singleS._id,
    universityName: singleS.universityName,
    scholarshipName: singleS.scholarshipName,
    userEmail: user.email,
    tuitionFees: singleS.tuitionFees,
    applicationFees: singleS.applicationFees,
    serviceCharge: singleS.serviceCharge,
  };

  const handlePayment = async () => {
    // if (!id || !user) return;
    fetch("http://localhost:3000/create-payment-session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(paymentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.url) {
          toast("Payment initialization failed");
          return;
        }
        window.location.href = data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto w-8/12 p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden p-5">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <p>
            <b>Scholarship:</b> {singleS.scholarshipName}
          </p>
          <p>
            <b>University:</b> {singleS.universityName}
          </p>
          <p className="">
            <b> Tuition Fees:</b>{" "}
            <span className="font-semibold text-gray-500">
              $ {singleS.tuitionFees}
            </span>
          </p>
          <p className="">
            <b>Application Fees:</b>{" "}
            <span className="font-semibold text-gray-500">
              $ {singleS.applicationFees}
            </span>
          </p>
          <p className="">
            <b>Service Charges:</b>{" "}
            <span className="font-semibold text-gray-500">
              $ {singleS.serviceCharge}
            </span>
          </p>
          <p className="text-2xl mt-2">Total: ${totalAmount}</p>

          <button
            onClick={handlePayment}
            className="btn bg-green-500 text-white w-full mt-4 hover:opacity-85"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
