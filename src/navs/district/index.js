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
    name: "Cows",
    to: "/cows",
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Cow list",
        to: "/cowslist",
      },
      {
        component: CNavItem,
        name: "Register New",
        to: "/registercow",
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
        name: "Cow Report",
        to: "/bbbb",
      },
    ],
  },
];

export default _nav;
