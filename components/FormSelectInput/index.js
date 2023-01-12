import React from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import classNames from 'classnames';

const FormSelectInput = ({ options, className, value, label, error, onChange }) => {
    return (
        <div className={classNames(className, "inputSelect")}>
            <FormControl variant="standard" 
            sx={{
                width: "100%",
                maxWidth: '100%',
            }}
            >
                <InputLabel id={label}>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label={label}
                >
                    {options.map((item, index) => <MenuItem key={index} value={item.value}>{item.label}</MenuItem>)}
                </Select>
            </FormControl>
            {error && <label className='error'>{error}</label>}
        </div>
    );
};

export default FormSelectInput;