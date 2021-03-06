import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { sendConfirmationEmail } from "../services/authService";
import toastify from "../utils/toastNotification";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 30,
    marginBottom: 10,
    color: "#9251B5",
  },
});

function NotVerified() {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleClick = () => {
    sendConfirmationEmail().then((res) => toastify(res.data, "success"));
  };

  // if user is not authenticated then redirect to login page
  if (!isAuthenticated) return <Redirect to="/login" />;

  // if user is authenticated and verified then redirect to user page
  if (isAuthenticated && user.isVerified) return <Redirect to="/user" />;

  return (
    <div className={classes.root}>
      <h1>Please verify your Email Address.</h1>
      <p className={classes.text}>Didn't get the email?</p>
      <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={handleClick}
      >
        Resend Confirmation Email
      </Button>
    </div>
  );
}

export default NotVerified;
