import React from "react";
import { NavLink } from "react-router";

import errorImg from "../../assets/error.png";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
const Error = () => {
  return (
    <div>
      <Navbar />
      <div className="p-18 flex-col justify-center items-center text-center space-y-4">
        <img className="mx-auto" src={errorImg} />
        <h1 className="text-5xl font-semibold ">Oops, page not found!</h1>
        <h2 className="text-xl text-gray-500">
          The page you are looking for is not available.
        </h2>
        <NavLink to="/">
          <button className="btn px-7 bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white font-semibold">
            Go Back!
          </button>
        </NavLink>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Error;
