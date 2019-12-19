/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {
    return (
      <span className={this.props.containerClass}>
        <svg
          className="RML-login-modal-spinner"
          width={this.props.size + "px"}
          height={this.props.size + "px"}
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="path"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
          />
        </svg>
      </span>
    );
  }
}

export default Loader;
