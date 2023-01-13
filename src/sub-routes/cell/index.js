import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Candidates = lazy(() => import("src/views/cell/candidates"));
const StolenCows = lazy(() => import("src/views/cell/reports/stolen-cows"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/candidates", name: "Candidates", element: Candidates },
  { path: "/stolencows", name: "Candidates", element: StolenCows },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
