import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { makeStyles } from "@mui/styles";
import React from "react";
import { APP_COLORS } from "src/constants";
import Footer from "./footer";
import Header from "./header";

function Home() {
  const classes = useStyles();
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
            <h4 style={{ fontSize: 18 }}>
              Amakuru agendanye no gutanga inka mukarere ka Ruhango
            </h4>
            <p>
              Itangazo rigenewe abaturage bo mukarere ka Ruhango kunama izaba
              hagati yabayobozi naba turage hagamijwe gusobanura amakuru
              yerekeye girinka munyarwanda{" "}
            </p>
            <b>BY: Byiringiro Patrick - Ruhango district</b> <br /> Date:
            7/01/2023 <br />
            <a href="">
              <CIcon icon={cilCloudDownload} /> Download full anouncement (PDF)
            </a>
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
