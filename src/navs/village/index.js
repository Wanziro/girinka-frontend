import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilGraph,
  cilNewspaper,
  cilPencil,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Announcements",
    to: "/notifications",
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Candidates",
    to: "/candidates",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Candidates",
        to: "/candidates",
      },
      {
        component: CNavItem,
        name: "Add Candidates",
        to: "/addcandidate",
      },
    ],
  },
  {
    component: CNavGroup,
    name: "Reports",
    to: "/reports",
    icon: <CIcon icon={cilGraph} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Add Report",
        to: "/reports",
      },
      {
        component: CNavItem,
        name: "Stolen Cows",
        to: "/stolencows",
      },
    ],
  },
];

export default _nav;
