import React from "react";

import FormSubmitButton from "../components/FormSubmitButton";

describe('FormSubmitButton component', () => {

  const shallowWrapper = shallow(
    <FormSubmitButton click={() => {}}/>
  );

  const tree = toJson(shallowWrapper);

  it('should be defined', () => {
    expect(FormSubmitButton).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

});