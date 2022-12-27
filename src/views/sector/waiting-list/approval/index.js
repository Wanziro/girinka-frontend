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
import PlaceHolder from "src/components/placeholder";
const initialState = {
  names: "",
  idNo: "",
  ubudeheCategory: "",
  phone: "",
  martialStatus: "",
};
function Approval({ showModal, setShowModal, editItem, token, fetchData }) {
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [cowsList, setCowsList] = useState([]);
  const [selecteCow, setSelectedCow] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selecteCow.trim() === "") {
      toastMessage("error", "No cow selected");
      return;
    }
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/sector/assign/", {
      cowId: selecteCow,
      cowUserId: state._id,
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
      setSelectedCow("");
      editItem && setState(editItem);
      fetchCows();
    }
  }, [showModal]);

  const fetchCows = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/sector/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setCowsList(
            res.data.cows.filter((item) => item.isReceived && !item.isGiven)
          );
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
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
            <CModalTitle>Confirmation</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {isloading ? (
              <PlaceHolder />
            ) : (
              <>
                <small>
                  You are going to Assign a cow to {editItem?.names}
                </small>
                <div className="mb-3">
                  <select
                    className="form-select"
                    onChange={(e) => setSelectedCow(e.target.value)}
                    required
                  >
                    <option value="">Choose Cow</option>
                    {cowsList.map((item, index) => (
                      <option value={item.cow._id} key={index}>
                        {item.cow.cowNumber} - {item.cow.cowType} -{" "}
                        {item.cow.registrationStatus}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
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

export default Approval;
