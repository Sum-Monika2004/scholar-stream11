import React, { Suspense } from "react";
import { motion } from "framer-motion";
import hero from "../../assets/hero.jpg";
import { Link, useLoaderData } from "react-router";
import Scholarship from "../../components/Scholarship/Scholarship";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="">
      {/* hero sec */}
      <section
        className="relative h-100 flex items-center justify-center bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Unlock Your Global Future
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore thousands of fully funded scholarships and take the first
            step toward your dream university.
          </p>
          <Link to="/all-scholarships">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg transform hover:scale-105 cursor-pointer">
              Search Scholarship
            </button>
          </Link>
        </motion.div>
      </section>

      {/* recommended  */}
      <div className="w-11/12 mx-auto my-20">
        <p className="font-bold text-5xl my-15">Recommended Scholarships</p>
        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={<span className="loading loading-dots loading-xl"></span>}
          >
            {data.map((s) => (
              <Scholarship key={s._id} s={s}></Scholarship>
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Home;
