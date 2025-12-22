import React, { Suspense, useState } from "react";
import { useLoaderData } from "react-router";
import Scholarship from "../../components/Scholarship/Scholarship";

const AllScholarships = () => {
  const data = useLoaderData();
  console.log(data);

  const [loading, setLoading] = useState(true);
  const [scholarships, setScholarships] = useState(data);
  console.log();

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;

    setLoading(true);

    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      });
  };
  return (
    <div>
      <h1 className="font-bold text-5xl text-center my-15">All Scholarships</h1>

      <form
        onSubmit={handleSearch}
        className=" mt-5 mb-10 flex gap-2 justify-center"
      >
        <label className="input rounded-full ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn bg-blue-800 hover:bg-blue-700 text-white rounded-full">
          {loading ? "Searching...." : "Search"}
        </button>
      </form>

      <div className="w-11/12 mx-auto my-20">
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            {scholarships.map((s) => (
              <Scholarship key={s._id} s={s}></Scholarship>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AllScholarships;
