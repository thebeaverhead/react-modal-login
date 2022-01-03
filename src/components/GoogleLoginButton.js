/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import GoogleIcon from "./GoogleIcon";
import PropTypes from "prop-types";

const GoogleLoginButton = (props) => {
  const GoogleLoginDialog = () => {
    props.onStartLoading();

    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      if (props.onSuccess) {
        props.onSuccess(
          "google",
          window.gapi.auth2
            .getAuthInstance()
            .currentUser.get()
            .getAuthResponse()
        );
      }
    } else {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(
          () => {
            if (props.onSuccess) {
              props.onSuccess(
                "google",
                window.gapi.auth2
                  .getAuthInstance()
                  .currentUser.get()
                  .getAuthResponse()
              );
            }
          },
          (error) => {
            props.onFail("google", error);
          }
        );
    }
  };

  return (
    <button
      className={props.btnClass}
      disabled={props.inactive}
      onClick={GoogleLoginDialog}
    >
      <GoogleIcon />
      <span>{props.label}</span>
    </button>
  );
};

GoogleLoginButton.propTypes = {
  onStartLoading: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  label: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  inactive: PropTypes.bool.isRequired,
};

export default GoogleLoginButton;
