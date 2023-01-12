import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { cilPen, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { errorHandler, toastMessage } from "src/helpers";
import { setShowFullPageLoader } from "src/actions/app";
import EditCandidate from "./edit-cow";
const Candidates = () => {
  const dispatch = useDispatch();
  const { token, roleId } = useSelector((state) => state.user);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/candidates/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCandidates(
            res.data.candidates.filter((item) => item.cowStatus === "Given")
          );
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/candidates/" + id + "/?token=" + token, {
      id,
      token,
    })
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        toastMessage("success", res.data.msg);
        setCandidates(candidates.filter((item) => item._id !== id));
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        }, 1000);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Girinka candidates {roleId} | Cow Reporting</strong>
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
                        <th>Names</th>
                        <th>ID Number</th>
                        <th>Cow</th>
                        <th>Assigned Cow Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.names}</td>
                          <td>{item.idNo}</td>
                          <td>
                            {item.cowStatus === "Waiting" ? (
                              "Waiting"
                            ) : (
                              <CTooltip
                                placement="left"
                                content={
                                  <div>
                                    <p className="border-bottom text-center">
                                      Cow Details
                                    </p>
                                    <div>
                                      <b>Cow Number: </b> {item.cow.cowNumber}
                                    </div>
                                    <div>
                                      <b>Type: </b> {item.cow.cowType}
                                    </div>
                                    <div>
                                      <b>Status: </b>{" "}
                                      {item.cow.registrationStatus}
                                    </div>
                                    <div>
                                      <b>Kg: </b> {item.cow.registrationKg}
                                    </div>
                                  </div>
                                }
                              >
                                <span
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {item.cowStatus}
                                </span>
                              </CTooltip>
                            )}
                          </td>
                          <td>{item.assignedCowStatus}</td>
                          <td>
                            <button
                              onClick={() => {
                                setEditItem(item);
                                setShowEditModal(true);
                              }}
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <EditCandidate
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editItem={editItem}
        fetchData={fetchData}
        token={token}
      />
    </>
  );
};

export default Candidates;
