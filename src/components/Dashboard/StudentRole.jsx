import React from "react";
import { Link } from "react-router";

const StudentRole = () => {
  return (
    <div className="space-y-1">
      <div>
        <Link to="/dashboard/my-applications">
          <button className="btn w-full">My Applications</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/my-reviews">
          <button className="btn w-full">My Reviews</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentRole;
