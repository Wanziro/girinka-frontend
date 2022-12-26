import React, { lazy } from "react";

const Dashboard = lazy(() => import("../../views/dashboard"));

// Notifications
const Notifications = lazy(() => import("../../views/notifications"));
const Profile = lazy(() => import("../../views/profile"));
const Candidates = lazy(() => import("src/views/village/candidates"));
const AddCandidate = lazy(() => import("src/views/village/add-candidate"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "Profile", element: Profile },
  { path: "/candidates", name: "Candidates", element: Candidates },
  { path: "/addcandidate", name: "Add Candidates", element: AddCandidate },
  {
    path: "/notifications",
    name: "Notifications",
    element: Notifications,
    exact: true,
  },
];

export default routes;
