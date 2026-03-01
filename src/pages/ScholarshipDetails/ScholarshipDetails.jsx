import React, { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../../providers/AuthContext";
import ReviewsSection from "./ReviewsSection";

const ScholarshipDetails = () => {
  const [singleS, setSingleS] = useState({});
  const [reviews, setReviews] = useState([]);

  const { user } = use(AuthContext);
  const { id } = useParams();

  const addNewReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  useEffect(() => {
    fetch(
      `https://scholar-stream-server-gules.vercel.app/all-scholarships/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setSingleS(data.result);
      });
  }, [id, user]);

  useEffect(() => {
    fetch(`https://scholar-stream-server-gules.vercel.app/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  return (
    <div className="max-w-11/12 mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl dark:border-gray-600 border border-gray-200 rounded-2xl overflow-hidden p-5 ">
        <div className="flex flex-col md:flex-row gap-8 p-6  ">
          {/* image and text  */}
          <div className="p-8 flex-row md:flex gap-4 items-center w-full">
            {/* image  */}
            <div className="shrink-0 w-full flex-1 ">
              <img
                className=" w-full object-cover rounded-xl shadow-md"
                src={singleS.universityImage}
              />
            </div>
            {/* text  */}
            <div className="ml-8 justify-center space-y-4 flex-1 ">
              <p className="text-[20px] font-bold mt-6 text-center md:text-left w-full text-gray-800 dark:text-white">
                <span className=" text-3xl md:text-4xl font-bold  text-nowrap ">
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
                <p>
                  Tuition Fees:{" "}
                  <span className="font-semibold text-gray-500 dark:text-white">
                    $ {singleS.tuitionFees}
                  </span>
                </p>
                <p>
                  Application Fees:{" "}
                  <span className="font-semibold text-gray-500 dark:text-white">
                    $ {singleS.applicationFees}
                  </span>
                </p>
                <p>
                  Service Charges:{" "}
                  <span className="font-semibold text-gray-500 dark:text-white">
                    $ {singleS.serviceCharge}
                  </span>
                </p>
              </div>
              <div className=" font-semibold flex-row md:flex justify-between items-center">
                <p>
                  <span className="text-gray-400">Post Date: </span>
                  {singleS.scholarshipPostDate}
                </p>
                <p>
                  <span className="text-red-600">Deadline: </span>
                  {singleS.applicationDeadline}
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
            <button className="btn w-full rounded-full dark:bg-blue-500 bg-blue-950 text-white hover:opacity-85">
              Apply for Scholarship
            </button>
          </Link>
        </div>
      </div>
      {/* Reviews Section */}
      <div>
        <ReviewsSection
          reviews={reviews}
          singleS={singleS}
          scholarshipId={singleS._id}
          onAddReview={addNewReview}
        />
      </div>
    </div>
  );
};

export default ScholarshipDetails;
