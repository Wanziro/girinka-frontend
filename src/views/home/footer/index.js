import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "src/constants";

function Footer() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <div className="container">
        <div className={classes.flexCenter} style={{ flexDirection: "column" }}>
          <img
            className={classes.logo}
            src={require("../../../assets/logo.png")}
          />
          All Rights Reserved. Designed by Stiven,Clarise and Chirac
        </div>
      </div>
    </div>
  );
}

export default Footer;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: APP_COLORS.darkBlue,
    padding: "3rem",
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
