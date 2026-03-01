import React from "react";
import { Link } from "react-router";

const Scholarship = (s) => {
  const singleS = s.s;

  return (
    <div className="bg-white dark:bg-[#29334b] shadow-xl card">
      <div className="p-6 flex-row">
        <img
          className="flex-1 w-full h-[200px] rounded-sm object-cover mx-auto bg-white"
          src={singleS.universityImage}
        />
        <p className="text-[20px] font-bold flex-1 text-center my-2">
          <span className="font-semibold"> {singleS.universityName}</span>
        </p>
        <div className="flex-1 my- font-medium text-[16px] ">
          <div className="flex-row justify-between text-gray-600 dark:text-white items-center font-normal  text-md">
            <p>
              Scholarship Name:{" "}
              <span className="font-semibold">{singleS.scholarshipName}</span>
            </p>
            <p>
              Category : <span>{singleS.subjectCategory}</span>
            </p>
            <p>
              Location :{" "}
              <span>
                {singleS.universityCity}, {singleS.universityCountry}
              </span>
            </p>

            <div className="flex justify-between items-center  ">
              <div>
                <span className="font-semibold text-green-600">
                  {singleS.scholarshipCategory}
                </span>
              </div>
              <div>
                <span className="font-semibold text-red-600">
                  Rank :{" "}
                  <span className="text-gray-400 dark:text-gray-200">
                    {singleS.universityWorldRank}
                  </span>
                </span>
              </div>
              <div className="">
                <Link to={`/scholarshipsDetails/${singleS._id}`}>
                  <button className="btn text-nowrap  bg-blue-900 dark:bg-blue-400 hover:opacity-85  text-white font-semibold  w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scholarship;
