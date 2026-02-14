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
import Profile from "../pages/Dashboard/Common/Profile";
import AddSch from "../pages/Dashboard/Admin/AddSch";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageSch from "../pages/Dashboard/Admin/ManageSch";
import Payment from "../components/Payment/Payment";
import PaymentSuccess from "../components/Payment/PaymentSuccess";
import PaymentFailed from "../components/Payment/PaymentFailed";
import Analytics from "../pages/Dashboard/Admin/Analytics";
import Reviews from "../pages/Dashboard/Moderator/Reviews";

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
        path: "/scholarshipsDetails/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      { path: "/payment-success", element: <PaymentSuccess></PaymentSuccess> },
      { path: "/payment-failure", element: <PaymentFailed></PaymentFailed> },
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
      {
        path: "/dashboard/add-scholarship",
        element: (
          <PrivateRoute>
            <AddSch></AddSch>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-scholarships",
        element: (
          <PrivateRoute>
            <ManageSch></ManageSch>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/analytics",
        element: (
          <PrivateRoute>
            <Analytics></Analytics>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: <Reviews></Reviews>,
      },
    ],
  },
]);
