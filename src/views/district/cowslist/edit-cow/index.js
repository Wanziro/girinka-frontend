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
  cowNumber: "",
  cowType: "",
  registrationStatus: "",
  registrationKg: "",
  supplierName: "",
};
function EditCow({ showModal, setShowModal, editItem, token, fetchData }) {
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/cows/" + state._id, { ...state, token })
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
            <CModalTitle>Edit Computer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Cow Number</label>
              <input
                type="number"
                name="cowNumber"
                className="form-control"
                required
                placeholder="Unique cow number"
                value={state.cowNumber}
                disabled
              />
            </div>
            <div className="mb-3">
              <label>Cow Type</label>
              <select
                name="cowType"
                className="form-control"
                required
                value={state.cowType}
                onChange={(e) => changeHandler(e)}
              >
                <option value="">Choose</option>
                <option value="Frizone">Frizone</option>
                <option value="Jelsie">Jelsie</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                name="registrationStatus"
                className="form-control"
                required
                value={state.registrationStatus}
                onChange={(e) => changeHandler(e)}
              >
                <option value="">Choose</option>
                <option value="Imbyeyi">Imbyeyi</option>
                <option value="Ishashi">Ishashi</option>
                <option value="Ihaka">Ihaka</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Kilograms</label>
              <input
                type="number"
                name="registrationKg"
                className="form-control"
                required
                placeholder="Unique kilograms"
                value={state.registrationKg}
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div className="mb-3">
              <label>Supplier Names</label>
              <input
                type="text"
                name="supplierName"
                className="form-control"
                required
                placeholder="Enter supplier names"
                value={state.supplierName}
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

export default EditCow;
