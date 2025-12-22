import React from "react";

const Footer = () => {
  return (
    <div className=" bg-blue-950">
      <footer className="footer sm:footer-horizontal text-white p-10 w-11/12 mx-auto ">
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
