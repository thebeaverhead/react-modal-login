/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";


export default class Tabs extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <div className={this.props.containerClass}>
        <div
          className={
            (this.props.inactive ? "disabled" : "") +
            (this.props.currentTab === "login" ? " active" : "")
          }
          onClick={() => {
            if (!this.props.inactive) {
              this.props.loginClick();
            }
          }}
        >
          {this.props.loginLabel}
        </div>
        <div
          className={
            (this.props.inactive ? "disabled" : "") +
            (this.props.currentTab === "register" ? " active" : "")
          }
          onClick={() => {
            if (!this.props.inactive) {
              this.props.registerClick();
            }
          }}
        >
          {this.props.registerLabel}
        </div>
      </div>
    )
  }
};