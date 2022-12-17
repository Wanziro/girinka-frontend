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

function Profile() {
  const dispatch = useDispatch();
  const { token, email, fullName, phone } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [state, setState] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    Axios.post(BACKEND_URL + "/users/updatePassword/", {
      newPwd: newPassword,
      currentPwd: password,
      token,
    })
      .then((res) => {
        setPassword("");
        setNewPassword("");
        dispatch(setShowFullPageLoader(false));
        toastMessage("success", "Password updated successfull!");
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  const handleBasicInfoUpdate = (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    Axios.post(BACKEND_URL + "/users/updateInfo/", { ...state, token })
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        dispatch(setUserFullName(state.fullName));
        dispatch(setUserPhone(state.phone));
        toastMessage("success", "User Info updated successfull!");
      })
      .catch((error) => {
        errorHandler(error);
        dispatch(setShowFullPageLoader(false));
      });
  };

  useEffect(() => {
    setState({ fullName, email, phone });
  }, []);
  return (
    <CRow>
      <CCol md={6}>
        <form onSubmit={handleBasicInfoUpdate}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Basic Info</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <label>Names</label>
                <input
                  type="text"
                  name="fullName"
                  value={state.fullName}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  required
                  placeholder="Your names"
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={state.email}
                  className="form-control"
                  required
                  disabled
                  placeholder="Your email address"
                />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={state.phone}
                  onChange={(e) => changeHandler(e)}
                  className="form-control"
                  pattern="07[8,2,3,9]{1}[0-9]{7}"
                  title="Invalid Phone (MTN or Airtel-tigo phone number)"
                  required
                  placeholder="Your phone number ex 07"
                />
              </div>
            </CCardBody>
            <CCardFooter>
              <button type="submit" className="btn btn-primary">
                Update info
              </button>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
      <CCol md={6}>
        <form onSubmit={handleChangePassword}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Change Password</strong>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <label>Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
              </div>
              <div className="mb-3">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                />
              </div>
            </CCardBody>
            <CCardFooter>
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </CCardFooter>
          </CCard>
        </form>
      </CCol>
    </CRow>
  );
}

export default Profile;
