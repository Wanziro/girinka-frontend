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
import ApproveCow from "./approve-cow";

function PendingCows() {
  const dispatch = useDispatch();
  const { token, companyName, fName } = useSelector((state) => state.user);
  const [cows, setCows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
          setCows(res.data.cows.filter((item) => item.isReceived === false));
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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCowsToSend(
        cows.filter(
          (item) => item.isTransfered == false && item.isReceived === false
        )
      );
    } else {
      setCowsToSend([]);
    }
  };

  const handleSelect = (e, item) => {
    if (e.target.checked) {
      setCowsToSend([...cowsToSend, item]);
    } else {
      setCowsToSend(cowsToSend.filter((i) => i._id !== item._id));
    }
  };

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>
                    Cows which are yet to be received ({cows.length})
                  </strong>
                </div>
                <div>
                  {cowsToSend.length > 0 && (
                    <button
                      className="btn btn-light"
                      onClick={() => setShowTransferModal(true)}
                    >
                      Approve ({cowsToSend.length})
                    </button>
                  )}
                </div>
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
                        <th>
                          <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e)}
                            className="form-check"
                          />
                        </th>
                        <th>#</th>
                        <th>Cow Number</th>
                        <th>Cow Type</th>
                        <th>Registration Status</th>
                        <th>KG</th>
                        <th>Supplier</th>
                        <th>District</th>
                        <th>Sector</th>
                        <th>Received</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cows
                        .filter((item) => item.isReceived === false)
                        .map((item, inde) => (
                          <CowItem
                            key={inde}
                            item={item}
                            index={inde}
                            handleSelect={handleSelect}
                            cowsToSend={cowsToSend}
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
      <ApproveCow
        showModal={showTransferModal}
        setShowModal={setShowTransferModal}
        pcsToSend={cowsToSend}
        fetchPcs={fetchData}
        token={token}
        fName={fName}
        companyName={companyName}
        setPcsToSend={setCowsToSend}
      />
    </>
  );
}

export default PendingCows;
