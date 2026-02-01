import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../providers/AuthContext";

const ScholarshipDetails = () => {
  const [singleS, setSingleS] = useState({});
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

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

  return (
    <div className="max-w-11/12 mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden p-5">
        <div className="flex flex-col md:flex-row gap-8 p-6  ">
          {/* image and text  */}
          <div className="p-8 flex-row md:flex gap-4 items-center w-full">
            {/* image  */}
            <div className="shrink-0 w-full flex-1">
              <img
                className=" w-full object-cover rounded-xl shadow-md"
                src={singleS.universityImage}
              />
            </div>
            {/* text  */}
            <div className="ml-8 justify-center space-y-4 flex-1">
              <p className="text-[20px] font-bold mt-6 text-center md:text-left w-full ">
                <span className=" text-3xl md:text-4xl font-bold text-gray-800 text-nowrap ">
                  {" "}
                  {singleS.universityName}
                </span>
              </p>
              <div className="flex-row justify-between  items-center  text-xl">
                <p>
                  Scholarship Name:{" "}
                  <span className="font-bold">{singleS.scholarshipName}</span>
                </p>
              </div>
              <div className="flex-row md:flex justify-between items-center text-xl">
                <div>
                  <p>
                    Category :{" "}
                    <span className="font-semibold">
                      {singleS.subjectCategory}
                    </span>
                  </p>
                  <p className="">
                    Country:{" "}
                    <span className="font-semibold">
                      {singleS.universityCountry}
                    </span>
                  </p>

                  <p className=" font-semibold text-green-600">
                    {singleS.scholarshipCategory}
                  </p>
                </div>
                {/* ............flex ...... */}
                <div>
                  <p>
                    Degree :{" "}
                    <span className=" font-semibold">{singleS.degree}</span>
                  </p>
                  <p className="">
                    City:{" "}
                    <span className="font-semibold">
                      {singleS.universityCity}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-red-600">
                      Rank :{" "}
                      <span className="text-gray-400">
                        {singleS.universityWorldRank}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <p className="">
                  Tuition Fees:{" "}
                  <span className="font-semibold text-gray-500">
                    $ {singleS.tuitionFees}
                  </span>
                </p>
                <p className="">
                  Application Fees:{" "}
                  <span className="font-semibold text-gray-500">
                    $ {singleS.applicationFees}
                  </span>
                </p>
                <p className="">
                  Service Charges:{" "}
                  <span className="font-semibold text-gray-500">
                    $ {singleS.serviceCharge}
                  </span>
                </p>
              </div>
              <div className="text-gray-400 font-semibold flex-row md:flex justify-between items-center">
                <p>
                  Post Date:{" "}
                  <span className="text-black">
                    {singleS.scholarshipPostDate}
                  </span>
                </p>
                <p className="text-red-600">
                  Deadline:{" "}
                  <span className="text-black">
                    {singleS.applicationDeadline}
                  </span>
                </p>
              </div>
              <div>
                Email:{" "}
                <span className="text-gray-400">{singleS.postedUserEmail}</span>
              </div>
            </div>
          </div>
        </div>
        {/* apply button  */}
        <div>
          <Link to={`/payment/${singleS._id}`}>
            <button className="btn w-full rounded-full bg-blue-950 text-white hover:opacity-85">
              Apply for Scholarship
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
