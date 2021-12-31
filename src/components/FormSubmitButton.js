/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import PropTypes from "prop-types";

const FormSubmitButton = (props) => {
  return (
    <button
      className={props.buttonClass}
      disabled={props.inactive}
      onClick={props.click}
      id={props.type + "Submit"}
    >
      {props.label}
    </button>
  );
};

FormSubmitButton.defaultProps = {
  click: null,
};

FormSubmitButton.propTypes = {
  buttonClass: PropTypes.string,
  inactive: PropTypes.bool,
  click: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default FormSubmitButton;
