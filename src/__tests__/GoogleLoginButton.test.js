import React from "react";

import GoogleLoginButton from "../components/GoogleLoginButton";

describe('GoogleLoginButton component', () => {

  const shallowWrapper = shallow(
    <GoogleLoginButton
      label="Continue with Google"
      btnClass="RML-google-login-button"
    />
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(GoogleLoginButton).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});