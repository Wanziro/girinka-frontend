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
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import CowItem from "./cow-item";
import { setShowFullPageLoader } from "src/actions/app";
import TransferCow from "./transfer-cow";

function CowsList() {
  const dispatch = useDispatch();
  const { token, roleId } = useSelector((state) => state.user);
  const [cows, setCows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [cowsToSend, setCowsToSend] = useState([]);
  const [showTransferModal, setShowTransferModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/sector/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCows(res.data.cows.filter((item) => item.isReceived));
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
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>Cows List ({cows.length})</strong>
                </div>
                <div></div>
              </div>
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
                        <th>Sector</th>
                        <th>Status</th>
                        <th>Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cows
                        .filter((item) => item.isReceived)
                        .map((item, inde) => (
                          <CowItem
                            key={inde}
                            item={item}
                            index={inde}
                            setShowEditModal={setShowEditModal}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <TransferCow
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={cowsToSend}
        fetchPcs={fetchData}
        token={token}
        roleId={roleId}
        setPcsToSend={setCowsToSend}
      />
    </>
  );
}

export default CowsList;
