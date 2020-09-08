import React from 'react';
import { useFormikContext } from 'formik';

import AppIconButton from '../UI/AppIconButton';

const IconSubmitButton = ({ title, ...otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return <AppIconButton onPress={handleSubmit} {...otherProps} />;
};

export default IconSubmitButton;
