import React, { use } from "react";
import { AuthContext } from "../../../providers/AuthContext";
import { Link, NavLink } from "react-router";
import logoImg from "../../../assets/logo.png";
import { RiseLoader } from "react-spinners";
import "./Navbar.css";

const Navbar = () => {
  const { user, signoutUserFunc, setUser, loading, setLoading } =
    use(AuthContext);
  console.log(loading);

  const handleSignOut = () => {
    signoutUserFunc()
      .then(() => {
        setLoading(false);
        toast.success("Sign out successful");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const links = (
    <>
      <nav className="flex">
        <NavLink to="/">
          <li className="m-2 text-[18px] font-semibold ">Home</li>
        </NavLink>

        <NavLink to="/all-scholarships">
          <li className="m-2 text-[18px] font-semibold">Scholarships</li>
        </NavLink>

        {user ? (
          <NavLink to="/profile">
            <li className="m-2 text-[18px] font-semibold">Profile</li>
          </NavLink>
        ) : (
          ""
        )}
      </nav>
    </>
  );
  return (
    <div className="shadow-md bg-blue-200">
      <div className="navbar mx-auto w-11/12">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <NavLink to="/">
            <div className="btn btn-ghost text-xl">
              <img className="h-10 w-10" src={logoImg} alt="" />
              <span className=" text-blue-900 text-2xl font-bold">
                ScholarStream
              </span>
            </div>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-5 font-semibold text-[18px]">
          {loading ? (
            <RiseLoader color="#4f754b" />
          ) : user ? (
            <div className="text-center space-y-3">
              <button
                popoverTarget="popover-1"
                style={{ anchorName: "--anchor-1" }}
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/88"}
                  className="h-[45px] w-[45px] object-cover rounded-full mx-auto mt-3"
                  alt=""
                />
              </button>

              <div
                className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm py-3 space-y-2"
                popover="auto"
                id="popover-1"
                style={{ positionAnchor: "--anchor-1" }}
              >
                <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                <p className="text-gray-400">{user?.email}</p>
                <button
                  onClick={handleSignOut}
                  className="bg-blue-700 text-white btn w-full"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-1">
              <button className="hover:text-blue-800 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
                <Link to={"/login"}>Sign in</Link>
              </button>
              <button className="hover:text-blue-800 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
                <Link to={"/signUp"}>Register</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
