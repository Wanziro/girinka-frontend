import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import Axios from "axios";
import { errorHandler, toastMessage } from "src/helpers";
import { BACKEND_URL } from "src/constants";
import { useDispatch, useSelector } from "react-redux";
import { setShowFullPageLoader } from "src/actions/app";
import PlaceHolder from "src/components/placeholder";
import CIcon from "@coreui/icons-react";
import { cilTrash } from "@coreui/icons";
import { Provinces, Districts, Sectors, Villages, Cells } from "rwanda";

const Users = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictsList] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [cellsList, setCellsList] = useState([]);
  const [villagesList, setVillagesList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      fullName.trim() === "" ||
      email.trim() === "" ||
      phone.trim() === "" ||
      userRole.trim() === "" ||
      province.trim() === ""
    ) {
      toastMessage("error", "All fields on the form are required");
    } else {
      dispatch(setShowFullPageLoader(true));
      let companyName = "";
      const roleId = `${province}-${district}${
        sector.trim() !== "" ? "-" + sector : ""
      }${cell.trim() !== "" ? "-" + cell : ""}${
        village.trim() !== "" ? "-" + village : ""
      }`;
      const rr = roleId.split("-");
      companyName = rr[rr.length - 1];
      Axios.post(BACKEND_URL + "/users/register/", {
        fullName,
        email,
        password: "12345",
        phone,
        role: userRole,
        roleId: roleId.trim(),
        companyName: companyName.trim(),
        token,
      })
        .then((res) => {
          dispatch(setShowFullPageLoader(false));
          setFullName("");
          setEmail("");
          setPhone("");
          setUserRole("");
          toastMessage("success", res.data.msg);
          setUsersList([...usersList, res.data.user]);
        })
        .catch((error) => {
          errorHandler(error);
          dispatch(setShowFullPageLoader(false));
        });
    }
  };

  useEffect(() => {
    fetchUsers();
    setProvincesList(Provinces());
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/users/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setUsersList(res.data.users);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          errorHandler(error);
        }, 1000);
      });
  };

  const handleDelete = (id) => {
    dispatch(setShowFullPageLoader(true));
    Axios.delete(BACKEND_URL + "/users/" + id + "/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          dispatch(setShowFullPageLoader(false));
          toastMessage("success", res.data.msg);
          fetchUsers();
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
    <>
      <CRow>
        <CCol md={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>System Users</strong>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <PlaceHolder />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Names</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.role}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(item._id)}
                            >
                              <CIcon icon={cilTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <form onSubmit={handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Register New User</strong>
              </CCardHeader>
              <CCardBody>
                <div className="mb-3">
                  <label>Full Names</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User's full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="User's Email address"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="07..........."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    required
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>User Role</label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setUserRole(e.target.value);
                      setProvince("");
                      setDistrict("");
                      setSector("");
                      setCell("");
                      setVillage("");
                    }}
                    value={userRole}
                    required
                  >
                    <option value="">Choose</option>
                    <option value="district">District</option>
                    <option value="sector">Sector</option>
                    <option value="cell">Cell</option>
                    <option value="village">Village</option>
                  </select>
                </div>
                {userRole === "district" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {userRole === "sector" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <select
                        className="form-control"
                        value={sector}
                        required
                        onChange={(e) => {
                          setSector(e.target.value);
                          setCellsList(
                            Cells(province, district, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {sectorsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {userRole === "cell" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <select
                        className="form-control"
                        value={sector}
                        required
                        onChange={(e) => {
                          setSector(e.target.value);
                          setCellsList(
                            Cells(province, district, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {sectorsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Cell</label>
                      <select
                        className="form-control"
                        value={cell}
                        required
                        onChange={(e) => {
                          setCell(e.target.value);
                          setVillagesList(
                            Villages(province, district, sector, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {cellsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {userRole === "village" && (
                  <>
                    <div className="mb-3">
                      <label>Province</label>
                      <select
                        className="form-control"
                        value={province}
                        onChange={(e) => {
                          setProvince(e.target.value);
                          setDistrictsList(Districts(e.target.value));
                        }}
                        required
                      >
                        <option value="">Choose</option>
                        {provincesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>District</label>
                      <select
                        className="form-control"
                        value={district}
                        required
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setSectorsList(Sectors(province, e.target.value));
                        }}
                      >
                        <option value="">Choose</option>
                        {districtsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Sector</label>
                      <select
                        className="form-control"
                        value={sector}
                        required
                        onChange={(e) => {
                          setSector(e.target.value);
                          setCellsList(
                            Cells(province, district, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {sectorsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Cell</label>
                      <select
                        className="form-control"
                        value={cell}
                        required
                        onChange={(e) => {
                          setCell(e.target.value);
                          setVillagesList(
                            Villages(province, district, sector, e.target.value)
                          );
                        }}
                      >
                        <option value="">Choose</option>
                        {cellsList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Village</label>
                      <select
                        className="form-control"
                        value={village}
                        required
                        onChange={(e) => {
                          setVillage(e.target.value);
                        }}
                      >
                        <option value="">Choose</option>
                        {villagesList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <small>
                  <i>
                    <b>
                      NB: Default password for each new user is 12345. New users
                      are advised to change their password immediately.
                    </b>
                  </i>
                </small>
              </CCardBody>
              <CCardFooter>
                <button type="submit" className="btn btn-primary">
                  Save user
                </button>
              </CCardFooter>
            </CCard>
          </form>
        </CCol>
      </CRow>
    </>
  );
};

export default Users;
