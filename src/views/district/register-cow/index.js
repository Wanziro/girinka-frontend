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
  cowNumber: "",
  cowType: "",
  registrationStatus: "",
  registrationKg: "",
  supplierName: "",
};
function RegisterCow() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const [state, setState] = useState(initialState);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    Axios.post(BACKEND_URL + "/cows/", { ...state, token })
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
              <strong>Register New Cow</strong>
            </CCardHeader>
            <CCardBody>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label>Cow Number</label>
                  <input
                    type="number"
                    name="cowNumber"
                    className="form-control"
                    required
                    placeholder="Unique cow number"
                    value={state.cowNumber}
                    onChange={(e) => changeHandler(e)}
                  />
                </div>
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
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

                <div className="col-md-4 mb-3">
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

export default RegisterCow;
