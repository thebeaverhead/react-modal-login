/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import PropTypes from "prop-types";

const SubmitError = (props) => {
  return (
    <span className={props.containerClass} id={props.type + "Error"}>
      {props.label}
    </span>
  );
};

SubmitError.propTypes = {
  containerClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SubmitError;
