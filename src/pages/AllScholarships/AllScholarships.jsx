import React, { Suspense, useState } from "react";
import { useLoaderData } from "react-router";
import Scholarship from "../../components/Scholarship/Scholarship";

const AllScholarships = () => {
  const data = useLoaderData();

  const [loading, setLoading] = useState(false);
  const [scholarships, setScholarships] = useState(data);
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;

    setLoading(true);

    fetch(
      `https://scholar-stream-server-gules.vercel.app/all-scholarships?search=${search_text}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
        setLoading(false);
      });
  };

  const applyFilter = () => {
    fetch(
      `https://scholar-stream-server-gules.vercel.app/filter?country=${country}&category=${category}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
      });
  };

  const handleSort = (order) => {
    fetch(`https://scholar-stream-server-gules.vercel.app/sort?sort=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setScholarships(data);
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
        <button className="btn bg-blue-900 hover:bg-blue-800 text-white rounded-full">
          {loading ? "Searching...." : "Search"}
        </button>
      </form>

      {/* Filter & Sort Section */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {/* Country Filter */}
        <select
          className="select select-bordered"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>

        {/* Category Filter */}
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Science</option>
          <option>Engineering</option>
          <option>Business</option>
        </select>

        {/*Filter*/}
        <button onClick={applyFilter} className="btn btn-outline">
          Apply Filter
        </button>

        {/* Sort */}
        <select
          className="select select-bordered"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">Sort by Fees</option>
          <option value="asc">Lowest</option>
          <option value="desc">Highest</option>
        </select>
      </div>

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

        {/* pagination */}
        {/* <div className="flex justify-center gap-2 mt-10">
          {[...Array(Math.ceil(total / 6)).keys()].map((num) => (
            <button
              key={num}
              className={`btn ${page === num + 1 ? "btn-primary" : ""}`}
              // onClick={() => setPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default AllScholarships;
