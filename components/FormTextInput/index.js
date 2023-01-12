import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import classNames from 'classnames';

const FormTextInput = (props) => {
    const {
        name,
        type,
        placeholder,
        value,
        onChange,
        label,
        className,
        error,
        multiline,
        readOnly
    } = props;
    const alphaRegex = /^[A-Z a-z]+$/;

    return (
        <Box
            className={className}
        >
            <TextField 
                fullWidth 
                label={label}
                value={value}
                name={name}
                multiline={multiline}
                onChange={onChange}
                readOnly={readOnly}
                type={type}
                onKeyDown={e => type === "alpha" && !e.key.match(alphaRegex) && e.preventDefault()}
                placeholder={placeholder}
                variant="standard"
            />
            {error && <label className="error">{error}</label>}
        </Box>
    );
}

export default FormTextInput;

FormTextInput.defaultProps = {
    type: 'text',
    disabled: false
};

FormTextInput.propTypes = {
    isBorderless: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.string
};