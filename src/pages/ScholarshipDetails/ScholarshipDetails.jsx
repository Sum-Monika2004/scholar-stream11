import React, { use, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../providers/AuthContext";

const ScholarshipDetails = () => {
  const [singleS, setSingleS] = useState({});
  const { user } = use(AuthContext);
  // const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/all-scholarships/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCrop(data.result);
      });
  }, []);

  return (
    <div className="max-w-11/12 mx-auto p-4 md:p-6 lg:p-8">
      {/* <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 ">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={scholarship.universityImage}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center  space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {scholarship.universityName}
            </h1>

            <div className=" gap-3">
              <div className="text-center font-medium border-2 border-yellow-800 px-1 py-1 rounded-xl w-[100px] mb-2">
                {scholarship.type}
              </div>

              <div className=" font-medium">{scholarship.location}</div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {scholarship.description}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">Price :</span>{" "}
                {scholarship.pricePerUnit} / {scholarship.unit}
              </div>
              <div>
                <span className="font-bold">Quantity :</span>{" "}
                {scholarship.quantity}
              </div>
            </div>

            <div className="flex gap-3 mt-6 "></div>
          </div>
        </div>
      </div> */}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
