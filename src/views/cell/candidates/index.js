import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import PlaceHolder from "src/components/placeholder";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler } from "src/helpers";
import { setShowFullPageLoader } from "src/actions/app";
import Approval from "./approval";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilDelete } from "@coreui/icons";
const Candidates = () => {
  const dispatch = useDispatch();
  const { token, roleId } = useSelector((state) => state.user);
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [approveStatus, setApproveStatus] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/candidates/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCandidates(res.data.candidates);
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

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Girinka candidates {roleId}</strong>
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
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Ubudehe</th>
                        <th>Cow</th>
                        <th>Cell Approval</th>
                        <th>Sector Approval</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {candidates.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.names}</td>
                          <td>{item.idNo}</td>
                          <td>{item.phone}</td>
                          <td>{item.martialStatus}</td>
                          <td>{item.ubudeheCategory}</td>
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
                          <td>
                            <CTooltip content={item.cellApprovalDescription}>
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {item.cellApproval}
                              </span>
                            </CTooltip>
                          </td>
                          <td>
                            <CTooltip content={item.sectorApprovalDescription}>
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {item.sectorApproval}
                              </span>
                            </CTooltip>
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                setEditItem(item);
                                setApproveStatus("Approved");
                                setShowEditModal(true);
                              }}
                              className="btn btn-primary"
                            >
                              <CIcon icon={cilCheck} />
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setEditItem(item);
                                setApproveStatus("Rejected");
                                setShowEditModal(true);
                              }}
                            >
                              <CIcon icon={cilDelete} />
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
      <Approval
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editItem={editItem}
        fetchData={fetchData}
        token={token}
        status={approveStatus}
      />
    </>
  );
};

export default Candidates;
