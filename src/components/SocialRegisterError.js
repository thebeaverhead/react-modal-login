/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";


export default class SocialRegisterError extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <span className={this.props.containerClass} id="socialRegisterError">
        {this.props.label}
      </span>
    )
  }
};