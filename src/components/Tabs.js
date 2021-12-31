/**
 * Created by meller.olaf@gmail.com on 11/22/2017.
 */

import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Tabs = (props) => {
  /**
   *
   * @param callback
   * @returns {(function(): void)|*}
   */
  const onTabChange = (callback) => () => {
    if (!props.inactive) {
      callback();
    }
  };

  return (
    <div className={props.containerClass}>
      <div
        className={classnames({
          disabled: props.inactive,
          active: props.currentTab === "login",
        })}
        onClick={onTabChange(props.loginClick)}
      >
        {props.loginLabel}
      </div>
      <div
        className={classnames({
          disabled: props.inactive,
          active: props.currentTab === "register",
        })}
        onClick={onTabChange(props.registerClick)}
      >
        {props.registerLabel}
      </div>
    </div>
  );
};


Tabs.propTypes = {
  containerClass: PropTypes.string.isRequired,
  registerClick: PropTypes.func.isRequired,
  loginClick: PropTypes.func.isRequired,
  registerLabel: PropTypes.string.isRequired,
  loginLabel: PropTypes.string.isRequired,
  inactive: PropTypes.bool,
  currentTab: PropTypes.string,
};

export default Tabs;
