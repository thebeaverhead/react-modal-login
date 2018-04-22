import React from "react";

import Separator from "../components/Separator";


describe('Separator component', () => {

  const shallowWrapper = shallow(
    <Separator
      containerClass="RML-social-methods-separator"
      label="Or"
    />
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(Separator).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});