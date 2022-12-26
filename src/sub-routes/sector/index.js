import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const CowsList = lazy(() => import("../../views/sector/cowslist"));
const PendingCows = lazy(() => import("src/views/sector/pending-cows"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/cowslist", name: "CowsList", element: CowsList },
  { path: "/pendingcows", name: "PendingCows", element: PendingCows },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
