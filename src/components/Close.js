/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import CloseIcon from "./CloseIcon";
import PropTypes from 'prop-types';

class CloseBtn extends React.Component {
  /**
   *
   * @constructor
   */
  render() {
    return (
      <div className={this.props.containerClass} onClick={this.props.click}>
        <CloseIcon />
      </div>
    );
  }
}

CloseBtn.propTypes = {
  containerClass: PropTypes.string,
  click: PropTypes.func.isRequired
}

export default CloseBtn;
