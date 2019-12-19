/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import GoogleIcon from "./GoogleIcon";

class GoogleLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  GoogleLoginDialog = () => {
    this.props.onStartLoading();

    if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
      if (this.props.onSuccess) {
        this.props.onSuccess(
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
            if (this.props.onSuccess) {
              this.props.onSuccess(
                "google",
                window.gapi.auth2
                  .getAuthInstance()
                  .currentUser.get()
                  .getAuthResponse()
              );
            }
          },
          error => {
            this.props.onFail("google", error);
          }
        );
    }
  };

  /**
   *
   * @returns {XML}
   */
  render() {
    return (
      <button
        className={this.props.btnClass}
        disabled={this.props.inactive}
        onClick={this.GoogleLoginDialog}
      >
        <GoogleIcon />
        <span>{this.props.label}</span>
      </button>
    );
  }
}

export default GoogleLoginButton;
