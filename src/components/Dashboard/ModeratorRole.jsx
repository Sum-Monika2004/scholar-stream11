import React from "react";
import { Link } from "react-router";

const ModeratorRole = () => {
  return (
    <div className="space-y-1">
      <div>
        <Link to="/dashboard/manage-applications">
          <button className="btn w-full">Manage Applications</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/reviews">
          <button className="btn w-full">All Reviews</button>
        </Link>
      </div>
    </div>
  );
};

export default ModeratorRole;
