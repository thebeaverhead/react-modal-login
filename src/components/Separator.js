/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

class Separator extends React.Component {
  /**
   *
   * @constructor
   */
  render() {
    return <p className={this.props.containerClass}>{this.props.label}</p>;
  }
}

export default Separator;
