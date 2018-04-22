import React from "react";

import CloseIcon from "../components/CloseIcon";

describe('CloseIcon component', () => {

  const shallowWrapper = shallow(
    <CloseIcon/>
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(CloseIcon).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  
});