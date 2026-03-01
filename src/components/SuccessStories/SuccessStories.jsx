import React from "react";
import profileImg from "../../assets/profile.png";

const SuccessStories = () => {
  const stories = [
    {
      name: "Ayesha Rahman",
      university: "University of Toronto",
      message:
        "ScholarStream helped me find a fully funded scholarship that I never knew existed. The application process was smooth and transparent.",
    },
    {
      name: "Md. Arif Hossain",
      university: "University of Melbourne",
      message:
        "Thanks to ScholarStream, I successfully applied and got selected. The dashboard tracking system is amazing!",
    },
    {
      name: "Nusrat Jahan",
      university: "University of Tokyo",
      message:
        "Easy payment, clear feedback, and real scholarships. Highly recommended for students seeking higher education abroad.",
    },
  ];

  return (
    <section>
      <div className="w-11/12 mx-auto my-20 ">
        <h2 className="font-bold text-right text-5xl my-15">Success Stories</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:text-blue-950">
          {stories.map((story, index) => (
            <div key={index} className="card shadow-xl bg-white">
              <div className="card-body">
                <p className="text-md text-center text-gray-600 mb-4">
                  “{story.message}”
                </p>
                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      className="w-6 h-6 rounded-full bg-gray-200"
                      src={profileImg}
                      alt=""
                    />
                    <h3 className="font-semibold text-base">{story.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{story.university}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
