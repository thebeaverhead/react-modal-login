import React from "react";

import Tabs from "../components/Tabs";


describe('Tabs component', () => {

  const shallowWrapper = {
    register: shallow(
      <Tabs
        containerClass="RML-login-modal-mode"
        loginLabel="Sign in"
        registerLabel="Sign up"
        initialTab="register"
      />
    ),
    login: shallow(
      <Tabs
        containerClass="RML-login-modal-mode"
        loginLabel="Sign in"
        registerLabel="Sign up"
        initialTab="login"
      />
    ),
    recoverPassword: shallow(
      <Tabs
        containerClass="RML-login-modal-mode"
        loginLabel="Sign in"
        registerLabel="Sign up"
        initialTab="recoverPassword"
      />
    ),
  };

  it('should be defined', () => {
    expect(Tabs).toBeDefined();
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