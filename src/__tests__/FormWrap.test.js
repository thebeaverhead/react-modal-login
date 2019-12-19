import React from "react";

import FormWrap from "../components/FormWrap";

const formData = {
  recoverPasswordAnchor: {
    label: "Forgot your password?",
  },
  loginBtn: {
    label: "Sign in"
  },
  registerBtn: {
    label: "Sign up"
  },
  recoverPasswordBtn: {
    label: "Send new password"
  },
  loginInputs: [
    {
      containerClass: 'RML-form-group',
      label: 'Email',
      type: 'email',
      inputClass: 'RML-form-control',
      id: 'email',
      name: 'email',
      placeholder: 'Email',
    },
    {
      containerClass: 'RML-form-group',
      label: 'Password',
      type: 'password',
      inputClass: 'RML-form-control',
      id: 'password',
      name: 'password',
      placeholder: 'Password',
    }
  ],
    registerInputs: [
    {
      containerClass: 'RML-form-group',
      label: 'Nickname',
      type: 'text',
      inputClass: 'RML-form-control',
      id: 'login',
      name: 'login',
      placeholder: 'Nickname',
    },
    {
      containerClass: 'RML-form-group',
      label: 'Email',
      type: 'email',
      inputClass: 'RML-form-control',
      id: 'email',
      name: 'email',
      placeholder: 'Email',
    },
    {
      containerClass: 'RML-form-group',
      label: 'Password',
      type: 'password',
      inputClass: 'RML-form-control',
      id: 'password',
      name: 'password',
      placeholder: 'Password',
    }
  ],
    recoverPasswordInputs: [
    {
      containerClass: 'RML-form-group',
      label: 'Email',
      type: 'email',
      inputClass: 'RML-form-control',
      id: 'email',
      name: 'email',
      placeholder: 'Email',
    },
  ],
};

describe('FormWrap component', () => {

  const shallowWrapper = {
    register: shallow(
      <FormWrap
        currentTab="register"
        form={formData}
      />
    ),
    login: shallow(
      <FormWrap
        currentTab="login"
        form={formData}
        recoverPasswordAnchorClick={() => {}}
      />
    ),
    recoverPassword: shallow(
      <FormWrap
        currentTab="recoverPassword"
        form={formData}
      />
    ),
  };

  it('should be defined', () => {
    expect(FormWrap).toBeDefined();
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