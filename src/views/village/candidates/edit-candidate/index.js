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
    if (state.idNo.length > 16 || state.idNo.length < 16) {
      toastMessage("error", "ID number must be 16 digits");
      return;
    }
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/candidates/" + state._id, { ...state, token })
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
              <label>Names</label>
              <input
                type="text"
                name="names"
                className="form-control"
                required
                placeholder="Candidate's names"
                value={state.names}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className="mb-3">
              <label>ID Number</label>
              <input
                type="number"
                name="idNo"
                className="form-control"
                maxLength={16}
                minLength={16}
                required
                placeholder="Candidate's Unique ID number"
                value={state.idNo}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className="mb-3">
              <label>Ubudehe Category</label>
              <select
                type="text"
                name="ubudeheCategory"
                className="form-select"
                required
                value={state.ubudeheCategory}
                onChange={(e) => changeHandler(e)}
              >
                <option value="">Choose</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Phone Number (optional)</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Candidate's Phone number ex: 07..."
                pattern="07[8,2,3,9]{1}[0-9]{7}"
                title="Invalid Phone (MTN or Airtel-tigo phone number)"
                value={state.phone}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div className="mb-3">
              <label>Martial Status</label>
              <select
                type="text"
                name="martialStatus"
                className="form-select"
                required
                value={state.martialStatus}
                onChange={(e) => changeHandler(e)}
              >
                <option value="">Choose</option>
                <option value="Single">Single</option>
                <option value="Maried">Maried</option>
                <option value="Widow">Widow</option>
                <option value="Divorced">Divorced</option>
              </select>
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
