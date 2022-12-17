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
import { setUserFullName, setUserEmail, setUserPhone } from "src/actions/user";

function RegisterCow() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {};

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
                  <label>Names</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    required
                    placeholder="Your names"
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
