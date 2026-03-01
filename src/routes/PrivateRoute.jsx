import React, { use } from "react";

import { Navigate, useLocation } from "react-router";
import { DotLoader } from "react-spinners";
import { AuthContext } from "../providers/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-[97vh] flex items-center justify-center">
        <DotLoader className="w-1 h-4" color="#1E2C85" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={location.pathname} />;
  }

  return children;
};

export default PrivateRoute;
