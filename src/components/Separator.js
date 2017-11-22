/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

export default class Separator extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <p className={this.props.containerClass}>
        {this.props.label}
      </p>
    )
  }
};