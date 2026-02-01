import React from "react";
import logoImg from "../../../assets/logo.png";

const Footer = () => {
  return (
    <div className=" bg-blue-950">
      <footer className="footer sm:footer-horizontal text-white p-8 w-11/12 mx-auto flex items-center justify-center">
        <nav className="font-semibold">
          <h6 className="text-lg text-gray-400">ScholarStream</h6>
          <img className="h-10 w-10 mx-auto" src={logoImg} alt="" />
        </nav>
        <nav className="footer sm:footer-horizontal text-white p-10 mx-auto justify-around">
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <a className="link link-hover">Instagram</a>
            <a className="link link-hover">Facebook</a>
            <a className="link link-hover">Pinterest</a>
          </nav>
        </nav>
      </footer>
      <footer className="footer sm:footer-horizontal footer-center bg-gray-300  p-4">
        <aside>
          <p>
            © {new Date().getFullYear()} - Scholar-Stream. All rights reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
