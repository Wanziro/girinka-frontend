import React from "react";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import WidgetsDropdown from "../widgets/WidgetsDropdown";
import Notifications from "../notifications";

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <Notifications />
    </>
  );
};

export default Dashboard;
