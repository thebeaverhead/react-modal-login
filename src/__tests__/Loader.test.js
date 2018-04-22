import React from "react";

import Loader from "../components/Loader";


describe('Loader component', () => {

  const shallowWrapper = shallow(
    <Loader
      containerClass="RML-login-modal-indicator"
      size={24}
    />
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(Loader).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});