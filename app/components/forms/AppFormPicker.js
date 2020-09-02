import React, { Fragment } from 'react';
import { useFormikContext } from 'formik';

import AppPicker from '../UI/AppPicker';
import ErrorMessage from '../forms/ErrorMessage';

const AppFormPicker = ({ name, icon, items, placeholder }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <Fragment>
      <AppPicker
        icon={icon}
        items={items}
        placeholder={placeholder}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
};

export default AppFormPicker;
