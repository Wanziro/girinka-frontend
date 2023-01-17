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
  status: "",
  ddescription: "",
};
function EditCandidate({
  showModal,
  setShowModal,
  editItem,
  token,
  fetchData,
}) {
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/reports/sick/approve/", {
      ...state,
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
      editItem && setState({ ...editItem, ...state });
    } else {
      setState(initialState);
    }
  }, [showModal]);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Approve/Disapprove</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Status</label>
              <select
                type="text"
                name="status"
                className="form-select"
                required
                value={state.status}
                onChange={(e) => changeHandler(e)}
              >
                <option value="">Choose</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                required={state.status === "Rejected"}
                placeholder="Enter a comment"
                value={state.ddescription}
                name="ddescription"
                onChange={(e) => changeHandler(e)}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Submit
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default EditCandidate;
