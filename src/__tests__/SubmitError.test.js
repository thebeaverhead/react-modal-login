import React from "react";

import SubmitError from "../components/SubmitError";


describe('SubmitError component', () => {


  const shallowWrapper = {
    register: shallow(
      <SubmitError
        currentTab="register"
        containerClass="RML-login-modal-error"
        label="Unable to register. Please try again later"
      />
    ),
    login: shallow(
      <SubmitError
        currentTab="login"
        containerClass="RML-login-modal-error"
        label="Unable to login. Please try again later"
      />
    ),
    recoverPassword: shallow(
      <SubmitError
        currentTab="recoverPassword"
        containerClass="RML-login-modal-error"
        label="Unable to recover password. Please try again later"
      />
    ),
  };

  it('should be defined', () => {
    expect(SubmitError).toBeDefined();
  });

  it('should render register tab', () => {
    expect(toJson(shallowWrapper.register)).toMatchSnapshot();
  });

  it('should render login tab', () => {
    expect(toJson(shallowWrapper.login)).toMatchSnapshot();
  });

  it('should render recoverPassword tab', () => {
    expect(toJson(shallowWrapper.recoverPassword)).toMatchSnapshot();
  });

});