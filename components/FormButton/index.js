import React from 'react';
import { Button } from '@mui/material';
import classNames from 'classnames';

const FormButton = ({ label, className, disabled, onClick, type, testId }) => {
  return (
    <Button className={classNames("form-button", className)}
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      type={type}
      id={testId}
    >
      {label}
    </Button>
  );
}

export default FormButton;