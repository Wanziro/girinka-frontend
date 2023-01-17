import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PlaceHolder from "src/components/placeholder";
import { APP_COLORS, BACKEND_URL } from "src/constants";
import Footer from "./footer";
import Header from "./header";

function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    axios
      .get(BACKEND_URL + "/announcements/all/")
      .then((res) => {
        setLoading(false);
        setData(res.data.announcements);
      })
      .catch((error) => {
        setLoading(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.welcomeContainer}>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="description">
                <h3 style={{ color: APP_COLORS.yellow }}>
                  Girinka Munyarwanda
                </h3>
                <p style={{ color: APP_COLORS.white }}>
                  Girinka Program was initiated in 2006 by His Excellency the
                  President of the Republic of Rwanda; Paul KAGAME. The
                  objectives of Girinka program include: reducing poverty
                  through dairy cattle farming; improving livelihoods through
                  increased milk consumption and income generation;
                  participation in decision making, environment protection,
                  improving agricultural productivity through the use of manure
                  as fertilizer and promoting unity and reconciliation among
                  Rwandans based on the cultural principle that if a cow is
                  given from one person to another, it establishes trust and
                  respect between the giver and the beneficiary.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src={require("../../assets/cow.png")}
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="text-center">
          <h2>LATEST ANNOUNCEMENTS | AMATANGAZO</h2>
        </div>
        <div className="mt-3">
          <div className="bg-light p-3" style={{ borderRadius: 10 }}>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Attachment</th>
                  <th>Date Posted</th>
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
                          <CIcon icon={cilCloudDownload} /> Attachment
                        </a>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      {loading ? (
                        <PlaceHolder />
                      ) : (
                        <>
                          {data.length > 0 ? (
                            <table className="table table-bordered">
                              <thead>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Attachment</th>
                                <th>Date Posted</th>
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
                                        <CIcon icon={cilCloudDownload} />{" "}
                                        Attachment
                                      </a>
                                    </td>
                                    <td>
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <>
                              <div className="text-center">
                                <p>No announcements found</p>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6">
            <div
              className={classes.flexCenter}
              style={{ flexDirection: "column" }}
            >
              <img
                className={classes.logo}
                src={require("../../assets/logo.png")}
              />
              <h3 className="text-center">
                Ping Us Anytime, <br /> We are here for you!
              </h3>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="text-white p-5"
              style={{ borderRadius: 10, background: APP_COLORS.darkBlue }}
            >
              <h4 style={{ fontSize: 18 }}>CONTACT US | TWANDIKIRE</h4>
              <form>
                <div className="mb-3">
                  <label>Names</label>
                  <input
                    type="text"
                    placeholder="Enter you name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="Your phone number ex: 078......."
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Enter your full address"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button
                  className="btn"
                  style={{
                    backgroundColor: APP_COLORS.yellow,
                    color: APP_COLORS.white,
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;

const useStyles = makeStyles((theme) => ({
  welcomeContainer: {
    height: "70vh",
    backgroundImage: "url('" + require("../../assets/bg.jpg") + "')",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    "& .description": {
      paddingTop: "7rem",
      // [theme.breakpoints.down("md")]: {
      //   paddingTop: "2rem",
      // },
    },
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
