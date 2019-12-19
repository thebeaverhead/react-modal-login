/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import PropTypes from 'prop-types';

class FormSubmitButton extends React.Component {

  static defaultProps = {
    click: null,
  };

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
        onClick={this.props.click}
        id={this.props.type + "Submit"}
      >
        {this.props.label}
      </button>
    );
  }
}


FormSubmitButton.propTypes = {
  buttonClass: PropTypes.string,
  inactive: PropTypes.bool,
  click: PropTypes.func,
  type: PropTypes.string,
  label: PropTypes.string.isRequired
};


export default FormSubmitButton;
