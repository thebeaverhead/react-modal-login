/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import CloseIcon from "./CloseIcon";

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

export default CloseBtn;
