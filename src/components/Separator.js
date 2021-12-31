/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import PropTypes from "prop-types";

const Separator = props => {


    return <p className={props.containerClass}>{props.label}</p>;

}

Separator.propTypes = {
  containerClass: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Separator;
