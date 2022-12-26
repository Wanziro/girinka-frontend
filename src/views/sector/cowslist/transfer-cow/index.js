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
import { Sectors } from "rwanda";

function TransferCow({
  showModal,
  setShowModal,
  pcsToSend,
  fetchPcs,
  token,
  setPcsToSend,
  roleId,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sentPcs, setSentPcs] = useState(0);
  const [institution, setInstitution] = useState("");
  const [sectorsList, setSectorsList] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      for (let i = 0; i < pcsToSend.length; i++) {
        const res = await Axios.post(BACKEND_URL + "/sector/", {
          cowId: pcsToSend[i]._id,
          sector: institution,
          token,
        });
        setSentPcs(i + 1);
      }
      setTimeout(() => {
        toastMessage("success", "Cow(s) Transfered!");
        setSubmitting(false);
        setShowModal(false);
        fetchPcs();
        setPcsToSend([]);
      }, 1000);
    } catch (error) {
      setSubmitting(false);
      errorHandler(error);
    }
  };

  useEffect(() => {
    if (showModal) {
      setSentPcs(0);
      const dest = roleId.split("-");
      if (dest.length === 2) {
        setSectorsList(Sectors(dest[0], dest[1]));
      } else {
        setSectorsList([]);
        toastMessage(
          "error",
          "can't find destinations, please remove this user and startover"
        );
      }
    }
  }, [showModal]);

  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader closeButton={!submitting}>
            <CModalTitle>Confirm Cow(s) Transfer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <small>
              You are going to transfer {pcsToSend.length} cow(s), please choose
              destination
            </small>
            <div className="mb-3">
              <label>Destination</label>
              <select
                className="form-select"
                onChange={(e) => setInstitution(e.target.value)}
                required
              >
                <option value="">Choose</option>
                {sectorsList.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Transfer{" "}
              {submitting && `${sentPcs}/${pcsToSend.length}`}
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default TransferCow;
