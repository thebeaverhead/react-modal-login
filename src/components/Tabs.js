/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import classnames from "classnames";

class Tabs extends React.Component {
  /**
   *
   * @param callback
   * @returns {function(...[*]=)}
   */
  onTabChange = callback => () => {
    if (!this.props.inactive) {
      callback();
    }
  };

  /**
   *
   * @constructor
   */
  render() {
    return (
      <div className={this.props.containerClass}>
        <div
          className={classnames({
            disabled: this.props.inactive,
            active: this.props.currentTab === "login"
          })}
          onClick={this.onTabChange(this.props.loginClick)}
        >
          {this.props.loginLabel}
        </div>
        <div
          className={classnames({
            disabled: this.props.inactive,
            active: this.props.currentTab === "register"
          })}
          onClick={this.onTabChange(this.props.registerClick)}
        >
          {this.props.registerLabel}
        </div>
      </div>
    );
  }
}

export default Tabs;
