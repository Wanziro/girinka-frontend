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
import EditCow from "./edit-cow";
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

  const deleteCow = (id) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/cows/" + id + "?token=" + token)
      .then((res) => {
        setTimeout(() => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", res.data.msg);
          fetchData();
        }, 1000);
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCowsToSend(cows.filter((item) => item.isTransfered == false));
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
                  <strong>Cows List ({cows.length})</strong>
                </div>
                <div>
                  {cowsToSend.length > 0 && (
                    <button
                      className="btn btn-light"
                      onClick={() => setShowTransferModal(true)}
                    >
                      Transfer ({cowsToSend.length})
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
                        <th>Status</th>
                        <th>Delivered</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cows.map((item, inde) => (
                        <CowItem
                          key={inde}
                          item={item}
                          index={inde}
                          setEditItem={setEditItem}
                          setShowEditModal={setShowEditModal}
                          deleteCow={deleteCow}
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
      <EditCow
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editItem={editItem}
        fetchData={fetchData}
        token={token}
      />
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
