import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BACKEND_URL } from "src/constants";
import { errorHandler, toastMessage } from "src/helpers";
const initialState = {
  names: "",
  idNo: "",
  ubudeheCategory: "",
  phone: "",
  martialStatus: "",
};
function Approval({
  showModal,
  setShowModal,
  editItem,
  token,
  fetchData,
  status,
}) {
  const [description, setDescription] = useState("");
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);
    Axios.put(BACKEND_URL + "/cell/candidates/" + state._id, {
      description,
      status,
      token,
    })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setSubmitting(false);
          setShowModal(false);
          fetchData();
        }, 1000);
      })

      .catch((error) => {
        setSubmitting(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    if (showModal) {
      editItem && setState(editItem);
    }
  }, [showModal]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <textarea
                className="form-control"
                required={status === "Rejected"}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />}{" "}
              {status === "Rejected" ? "Reject Candidate" : "Approve Candidate"}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default Approval;
