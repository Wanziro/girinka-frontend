import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "src/constants";

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <div className="container">
        <div className={classes.flexSpace}>
          <img
            className={classes.logo}
            src={require("../../../assets/logo.png")}
          />
          <div>
            <ul className={classes.menu}>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>
                <button onClick={() => navigate("/login")}>Login</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: APP_COLORS.darkBlue,
    padding: "0.7rem 0px",
    color: APP_COLORS.white,
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flexSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 60,
  },
  menu: {
    margin: 0,
    padding: 0,
    "& li": {
      listStyle: "none",
      paddingLeft: 15,
      display: "inline-block",
      "&:hover": {
        color: APP_COLORS.yellow,
        cursor: "pointer",
      },
      "& button": {
        background: APP_COLORS.yellow,
        border: "none",
        padding: "2px 1.5rem",
        borderRadius: 10,
        color: APP_COLORS.white,
        "&:hover": {
          opacity: 0.5,
        },
      },
    },
  },
}));
