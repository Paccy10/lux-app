import React, { Fragment, useState } from 'react';
import { Platform } from 'react-native';
import { useFormikContext } from 'formik';

import AppDatePicker from '../UI/AppDatePicker';
import ErrorMessage from './ErrorMessage';

const AppFormDatePicker = ({ name, placeholder }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <AppDatePicker
        onChange={(event, selectedDate) => {
          setShow(Platform.OS === 'ios');
          setFieldValue(name, selectedDate);
        }}
        value={values[name]}
        placeholder={placeholder}
        show={show}
        setShow={setShow}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppFormDatePicker;
