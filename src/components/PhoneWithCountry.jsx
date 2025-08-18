import React from 'react';
import PhoneInput from 'react-phone-input-2';
import { ErrorMessage } from "formik";
import 'react-phone-input-2/lib/style.css';

const PhoneWithCountry = ({ phonevalue, setFieldValue }) => {
  const handlePhoneInput = (value, data) => {
    setFieldValue('phone', `${value}`);
    setFieldValue('dial_code', `${data?.dialCode}`);
  };

  return (
    <div className='phoneWithCode'>
      <PhoneInput
        country={'us'}
        value={phonevalue}
        onChange={handlePhoneInput}
      />
      <ErrorMessage name={"phone"} component="div" className="text-danger" />
    </div>
  );
};

export default PhoneWithCountry;
