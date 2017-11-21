/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2017.
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
          className={(this.props.inactive ? "disabled " : "") + (this.props.registerActive ? "" : "active")}
          onClick={() => {
            if (!this.props.inactive) {
              this.props.loginClick();
            }
          }}
        >
          {this.props.loginLabel}
        </div>
        <div
          className={(this.props.inactive ? "disabled " : "") + (this.props.registerActive ? "active" : "")}
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