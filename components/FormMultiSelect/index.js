import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { Checkbox } from '@mui/material';
import { options } from "../../utils/MenuProps";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ label, className, value, onChange, readOnly }) {

  return (
    <div className={className}>
      <FormControl sx={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={value}
          onChange={onChange}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          variant="standard"
          readOnly={readOnly}
        >
          {options.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={value.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
