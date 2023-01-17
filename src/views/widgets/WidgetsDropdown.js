import React, { useEffect, useState } from "react";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import { errorHandler } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import axios from "axios";
import { useSelector } from "react-redux";

const WidgetsDropdown = () => {
  const { token } = useSelector((state) => state.user);
  const [stolenCows, setStolen] = useState([]);
  const [deadCows, setDead] = useState([]);
  const [cows, setCows] = useState([]);

  const fetchStolen = () => {
    axios
      .get(BACKEND_URL + "/reports/stolen/?token=" + token)
      .then((res) => {
        setStolen(
          res.data.cows.filter(
            (item) =>
              item.cellApproval === "Approved" &&
              item.sectorApproval === "Approved"
          )
        );
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const fetchDead = () => {
    axios
      .get(BACKEND_URL + "/reports/dead/?token=" + token)
      .then((res) => {
        setDead(
          res.data.cows.filter(
            (item) =>
              item.cellApproval === "Approved" &&
              item.sectorApproval === "Approved"
          )
        );
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  const fetchCows = () => {
    axios
      .get(BACKEND_URL + "/cows/?token=" + token)
      .then((res) => {
        setCows(res.data.cows);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  useEffect(() => {
    fetchStolen();
    fetchDead();
    fetchCows();
  }, []);

  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="primary"
          value={<>{cows.length}</>}
          title="Total Cows"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="info"
          value={<>{cows.filter((item) => item.isGiven).length}</>}
          title="Given Cows"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="warning"
          value={<>{stolenCows.length}</>}
          title="Stolen Cows"
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4 pb-4"
          color="danger"
          value={<>{deadCows.length}</>}
          title="Dead Cows"
        />
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
