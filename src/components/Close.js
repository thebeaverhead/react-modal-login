/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import CloseIcon from "./CloseIcon";
import PropTypes from "prop-types";

const CloseBtn = (props) => {
  return (
    <div className={props.containerClass} onClick={props.click}>
      <CloseIcon />
    </div>
  );
};

CloseBtn.propTypes = {
  containerClass: PropTypes.string,
  click: PropTypes.func.isRequired,
};

export default CloseBtn;
