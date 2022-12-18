import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler, toastMessage } from "src/helpers";
import { useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import CowItem from "./cow-item";

function CowsList() {
  const { token } = useSelector((state) => state.user);
  const [cows, setCows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/cows/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCows(res.data.cows);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cows List ({cows.length})</strong>
          </CCardHeader>
          <CCardBody>
            {isLoading ? (
              <PlaceHolder />
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Cow Number</th>
                      <th>Cow Type</th>
                      <th>Registration Status</th>
                      <th>KG</th>
                      <th>Supplier</th>
                      <th>District</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cows.map((item, inde) => (
                      <CowItem key={inde} item={item} index={inde} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default CowsList;
