import React from "react";

import FacebookIcon from "../components/FacebookIcon";

describe('FacebookIcon component', () => {

  const shallowWrapper = shallow(
    <FacebookIcon/>
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(FacebookIcon).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});