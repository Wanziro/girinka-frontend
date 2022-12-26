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

function CowsList() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [cows, setCows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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

  return (
    <>
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
                        <CowItem
                          key={inde}
                          item={item}
                          index={inde}
                          setEditItem={setEditItem}
                          setShowEditModal={setShowEditModal}
                          deleteCow={deleteCow}
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
    </>
  );
}

export default CowsList;
