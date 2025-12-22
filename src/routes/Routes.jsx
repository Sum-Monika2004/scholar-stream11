import { createBrowserRouter } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships/AllScholarships";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/recommended-sch"),
      },
      {
        path: "/all-scholarships",
        element: <AllScholarships></AllScholarships>,
        loader: () => fetch("http://localhost:3000/all-scholarships"),
      },
      {
        path: "/all-scholarships/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // {
      //   path: "add-scholarship",
      //   element: (
      //     <PrivateRoute>
      //       <AddScholarship />
      //     </PrivateRoute>
      //   ),
      // },
      //   path: "manage-users",
      //   element: (
      //     <PrivateRoute>
      //       <ManageUsers />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "profile",
      //   element: (
      //     <PrivateRoute>
      //       <Profile />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "my-orders",
      //   element: (
      //     <PrivateRoute>
      //       <MyOrders />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "manage-orders",
      //   element: <ManageOrders />,
      // },
    ],
  },
]);
