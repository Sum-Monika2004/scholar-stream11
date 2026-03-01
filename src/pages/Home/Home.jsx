import React, { Suspense } from "react";
import { motion } from "framer-motion";
import hero from "../../assets/hero.jpg";
import { Link, useLoaderData } from "react-router";
import Scholarship from "../../components/Scholarship/Scholarship";
import SuccessStories from "../../components/SuccessStories/SuccessStories";
import { FaArrowRightLong } from "react-icons/fa6";

const Home = () => {
  const data = useLoaderData();

  return (
    <div>
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
            <button className="bg-red-600  text-white px-8 py-4 rounded-sm font-semibold transition-all shadow-md transform hover:scale-105 cursor-pointer flex gap-2 items-center mx-auto">
              <span>Search Scholarship</span>

              <span className="mt-0.5">
                <FaArrowRightLong />
              </span>
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

      {/* success stories  */}
      <SuccessStories></SuccessStories>

      {/* FAQ  */}
      <section className="w-11/12 mx-auto my-20 ">
        <h2 className="font-bold text-5xl my-15">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto px-4 dark:text-blue-950">
          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <div className="collapse collapse-arrow bg-white shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                What is ScholarStream?
              </div>
              <div className="collapse-content">
                <p>
                  ScholarStream is a scholarship management platform where
                  students can explore, apply, and track scholarships offered by
                  universities and organizations worldwide.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="collapse collapse-arrow bg-white shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Is it free to browse scholarships?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. Browsing and viewing scholarship details is completely
                  free. Some scholarships may require an application or service
                  fee.
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="collapse collapse-arrow bg-white shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                How do I apply for a scholarship?
              </div>
              <div className="collapse-content">
                <p>
                  After logging in, select a scholarship and click the “Apply”
                  button. You will be redirected to the payment and checkout
                  page to complete your application.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="collapse collapse-arrow bg-white shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Can I track my application status?
              </div>
              <div className="collapse-content">
                <p>
                  Yes. You can track application status such as Pending,
                  Processing, or Completed from your dashboard.
                </p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className="collapse collapse-arrow bg-white shadow-sm">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">
                Is my payment secure?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely. ScholarStream uses Stripe for secure and encrypted
                  payment processing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
