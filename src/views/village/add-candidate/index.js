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
import { setShowFullPageLoader } from "src/actions/app";

const initialState = {
  names: "",
  idNo: "",
  ubudeheCategory: "",
  phone: "",
  martialStatus: "",
};
function AddCandidate() {
  const dispatch = useDispatch();
  const { token, roleId } = useSelector((state) => state.user);

  const [state, setState] = useState(initialState);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.idNo.length > 16 || state.idNo.length < 16) {
      toastMessage("error", "ID number must be 16 digits");
      return;
    }
    dispatch(setShowFullPageLoader(true));
    Axios.post(BACKEND_URL + "/candidates/", { ...state, token })
      .then((res) => {
        setTimeout(() => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", res.data.msg);
          setState(initialState);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        }, 1000);
      });
  };

  return (
    <CRow>
      <CCol md={12}>
        <form onSubmit={handleSubmit}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Register New Ubudehe Candidate In Your Village</strong>
            </CCardHeader>
            <CCardBody>
              <div className="row">
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
                  <label>Location</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    value={roleId}
                  />
                </div>
              </div>
            </CCardBody>
            <CCardFooter>
              <div className="text-end">
                <button type="submit" className="btn btn-primary">
                  Save Cow
                </button>
              </div>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
    </CRow>
  );
}

export default AddCandidate;
