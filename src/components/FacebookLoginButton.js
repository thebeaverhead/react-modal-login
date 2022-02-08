/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import FacebookIcon from "./FacebookIcon";
import PropTypes from "prop-types";

const FacebookLoginButton = (props) => {
  /**
   *
   * @constructor
   */
  const FBLoginDialog = () => {
    props.onStartLoading();

    window.FB.login(
      (response) => {
        if (response.status == "connected" && props.onSuccess) {
          props.onSuccess("facebook", response);
        } else if (response.status != "connected" && props.onFail) {
          props.onFail("facebook", response);
        }
      },
      { scope: props.scope, return_scopes: props.return_scopes || false }
    );
  };

  return (
    <button
      className={props.btnClass}
      disabled={props.inactive}
      onClick={FBLoginDialog}
    >
      <FacebookIcon />
      <span>{props.label}</span>
    </button>
  );
};

FacebookLoginButton.propTypes = {
  onStartLoading: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  label: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  inactive: PropTypes.bool.isRequired,
};

export default FacebookLoginButton;
