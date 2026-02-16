import React from "react";
import { Link } from "react-router";

const AdminRole = () => {
  return (
    <div className="space-y-1">
      <div>
        <Link to="/dashboard/add-scholarship">
          <button className="btn w-full">Add Scholarship</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/manage-scholarships">
          <button className="btn w-full">Manage Scholarship</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/manage-users">
          <button className="btn w-full">Manage Users</button>
        </Link>
      </div>
      <div>
        <Link to="/dashboard/analytics">
          <button className="btn w-full">Analytics</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminRole;
