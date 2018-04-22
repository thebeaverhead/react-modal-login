import React from "react";

import FacebookLoginButton from "../components/FacebookLoginButton";

describe('FacebookLoginButton component', () => {

  const shallowWrapper = shallow(
    <FacebookLoginButton
      label="Continue with Facebook"
      btnClass="RML-facebook-login-button"
    />
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(FacebookLoginButton).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});