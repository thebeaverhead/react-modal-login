/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

class SubmitError extends React.Component {

  /**
   *
   * @constructor
   */
  render() {
    return (
      <span
        className={this.props.containerClass}
        id={this.props.type + "Error"}
      >
        {this.props.label}
      </span>
    );
  }
}

export default SubmitError;
