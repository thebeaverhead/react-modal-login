import React from "react";

import Close from "../components/Close";
import CloseIcon from "../components/CloseIcon";


describe('Close component', () => {

  const shallowWrapper = shallow(
    <Close
      containerClass="RML-login-modal-close"
      click={() => {}}
    />
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(Close).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should include CloseIcon', () => {
    expect(shallowWrapper.find(CloseIcon).length).toBe(1);
  });

});