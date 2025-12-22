import React from "react";
import { Link } from "react-router";

const Scholarship = (s) => {
  const singleS = s.s;

  return (
    <div className="bg-white rounded-xl shadow-xl">
      <div className="p-8 flex-row">
        <img
          className="flex-1 w-full h-[200px] object-cover mx-auto bg-white"
          src={singleS.universityImage}
        />
        <p className="text-[20px] font-bold flex-1 text-center mt-2">
          <span className="font-semibold"> {singleS.universityName}</span>
        </p>
        <div className="flex-1 my-4 font-medium text-[16px]">
          <div className="flex-row justify-between  items-center   ">
            <p className="h-[48px]">
              Scholarship Name:{" "}
              <span className="font-bold">{singleS.scholarshipName}</span>
            </p>
            <p>
              Category :{" "}
              <span className="font-semibold">{singleS.subjectCategory}</span>
            </p>
            <p>
              Degree : <span className=" font-bold">{singleS.degree}</span>
            </p>

            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold text-green-600">
                  {singleS.scholarshipCategory}
                </span>
              </div>
              <div>
                <span className="font-semibold text-red-600">
                  Rank :{" "}
                  <span className="text-gray-400">
                    {singleS.universityWorldRank}
                  </span>
                </span>
              </div>
            </div>

            <div>
              <Link to={`/all-scholarships/${singleS._id}`}>
                <button className="btn text-nowrap bg-blue-800 hover:bg-blue-900  text-white font-semibold mt-2">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
