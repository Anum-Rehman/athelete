import React from 'react';
import { Button } from '@mui/material';
import classNames from 'classnames';

const FormButton = ({ label, className, disabled, onClick, type }) => {
  return (
    <Button className={classNames("form-button", className)}
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </Button>
  );
}

export default FormButton;