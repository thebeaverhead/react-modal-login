/**
 * Created by piotr.pozniak@thebeaverhead.com on 10/07/2017.
 */

import React from "react";
import CloseIcon from "./CloseIcon";

export default class CloseBtn extends React.Component {

  constructor(props) {
    super(props);
  }

  /**
   *
   * @constructor
   */
  render() {

    return (
      <div
        className={this.props.containerClass}
        onClick={() => this.props.click()}
      >
        <CloseIcon />
      </div>
    )
  }
};