import React from "react";

import GoogleIcon from "../components/GoogleIcon";

describe('GoogleIcon component', () => {

  const shallowWrapper = shallow(
    <GoogleIcon/>
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(GoogleIcon).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});