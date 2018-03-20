/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

export default class FormSubmitButton extends React.Component {

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
        id={this.props.type + "Submit"}
      >
        {this.props.label}
      </button>
    )
  }
};