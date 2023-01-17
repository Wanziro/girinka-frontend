import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { errorHandler, toastMessage, uploadImage } from "src/helpers";
import axios from "axios";
import { BACKEND_URL } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";
import PlaceHolder from "src/components/placeholder";

const initialState = {
  title: "",
  location: "",
  attachment: "",
};
const Notifications = () => {
  const dispatch = useDispatch();
  const { token, fullName } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShowFullPageLoader(true));
    uploadImage(state.attachment)
      .then((res) => {
        const { fileName } = res.data;
        axios
          .post(BACKEND_URL + "/announcements/", {
            ...state,
            attachment: fileName,
            names: fullName,
            token,
          })
          .then((res) => {
            dispatch(setShowFullPageLoader(false));
            toastMessage("success", "Announcement posted!");
            setState(initialState);
            fetchData();
          })
          .catch((error) => {
            dispatch(setShowFullPageLoader(false));
            errorHandler(error);
          });
      })
      .catch((error) => {
        dispatch(setShowFullPageLoader(false));
        toastMessage("error", error.message);
      });
  };

  const fetchData = () => {
    axios
      .get(BACKEND_URL + "/announcements/?token=" + token)
      .then((res) => {
        setLoading(false);
        setData(res.data.announcements);
      })
      .catch((error) => {
        setLoading(false);
        errorHandler(error);
      });
  };

  const handleDelete = (id) => {
    dispatch(setShowFullPageLoader(true));
    axios
      .delete(BACKEND_URL + "/announcements/" + id + "/?token=" + token)
      .then((res) => {
        dispatch(setShowFullPageLoader(false));
        fetchData();
      })
      .catch((error) => {
        dispatch(setShowFullPageLoader(false));
        errorHandler(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CRow>
      <CCol xs={window.location.pathname === "/dashboard" ? 12 : 8}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Announcements</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <PlaceHolder />
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <th>Title</th>
                      <th>Location</th>
                      <th>Attachment</th>
                      <th>Date Posted</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr>
                          <td>{item.title}</td>
                          <td>{item.location}</td>
                          <td>
                            <a
                              href={
                                "https://lawyersofhope.org.rw/assets/images/controller/uploads/" +
                                item.attachment
                              }
                              target="_blank"
                            >
                              Attachment
                            </a>
                          </td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      {window.location.pathname !== "/dashboard" && (
        <CCol xs={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Create announcement</strong>
            </CCardHeader>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    required
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                    required
                    onChange={(e) =>
                      setState({ ...state, location: e.target.value })
                    }
                  />
                </div>
                <input
                  required
                  type="file"
                  className="form-control"
                  onChange={(t) =>
                    setState({ ...state, attachment: t.target.files[0] })
                  }
                />
                <br />
                <button className="btn btn-primary">Submit</button>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      )}
    </CRow>
  );
};

export default Notifications;
