/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2017.
 */

import React from "react";

export default class FormRegisterButton extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <button
        className={this.props.buttonClass}
        disabled={this.props.inactive}
        onClick={() => this.props.click()}
      >
        {this.props.label}
      </button>
    )
  }
};