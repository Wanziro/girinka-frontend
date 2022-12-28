import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const RegisterCow = lazy(() => import("../../views/district/register-cow"));
const CowsList = lazy(() => import("../../views/district/cowslist"));
const Candidates = lazy(() => import("src/views/district/candidates"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/registercow", name: "RegisterCow", element: RegisterCow },
  { path: "/cowslist", name: "CowsList", element: CowsList },
  { path: "/candidates", name: "Candidates", element: Candidates },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
