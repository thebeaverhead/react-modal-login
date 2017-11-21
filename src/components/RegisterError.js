/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2017.
 */

import React from "react";


export default class RegisterError extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <span className={this.props.containerClass} id="registerError">
        {this.props.label}
      </span>
    )
  }
};