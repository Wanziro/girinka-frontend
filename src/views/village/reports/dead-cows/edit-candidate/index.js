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
  description: "",
  veterinaryName: "",
  veterinaryPhone: "",
  date: "",
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
    Axios.put(BACKEND_URL + "/reports/dead/", {
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
      editItem && setState({ ...state, ...editItem });
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
            <CModalTitle>Edit Information</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                required
                value={state.description}
                onChange={(e) => changeHandler(e)}
                placeholder="Describle the situation"
              />
            </div>
            {(state.status == "Sick" || state.status == "Dead") && (
              <div className="border p-3">
                <small>
                  <b>Veterinaire info</b>
                </small>
                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="veterinaryName"
                    placeholder="Enter full name"
                    className="form-control"
                    required={state.status == "Sick" || state.status == "Dead"}
                    value={state.veterinaryName}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Candidate's Phone number ex: 07..."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    name="veterinaryPhone"
                    className="form-control"
                    required={state.status == "Sick" || state.status == "Dead"}
                    value={state.veterinaryPhone}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
              </div>
            )}
            <div className="mb-3">
              <label>{state.status} Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                required
                value={state.date}
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
              {submitting && <CSpinner size="sm" />} Save changes
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default EditCandidate;
