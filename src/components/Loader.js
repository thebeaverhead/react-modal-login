/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import PropTypes from "prop-types";

const Loader = (props) => {
  return (
    <span className={props.containerClass}>
      <svg
        className="RML-login-modal-spinner"
        width={props.size + "px"}
        height={props.size + "px"}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        />
      </svg>
    </span>
  );
};

Loader.propTypes = {
  containerClass: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Loader;
