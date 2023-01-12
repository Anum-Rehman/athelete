import React, { useEffect, useState } from 'react';
import { TextField, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const FormDateInput = ({ className, value, onChange, label, error, readOnly }) => {
    const [screenWidth, setScreenWidth] = useState(0);
    const handleResize = () => setScreenWidth(window.innerWidth);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, [])

    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    var today = dayjs(new Date()).format('MM/DD/YYYY');

    return (
        <div className={className}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack>
                    {screenWidth > 850 ? <DesktopDatePicker
                        label={label}
                        defaultDate={today}
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={onChange}
                        readOnly={readOnly}
                        renderInput={(params) => <TextField {...params} variant="standard" />}
                    />
                        : <MobileDatePicker
                            label={label}
                            defaultDate={today}
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={onChange}
                            readOnly={readOnly}
                            renderInput={(params) => <TextField {...params} variant="standard" />}
                        />}
                </Stack>
            </LocalizationProvider>
            {error && <label className="text-input__label-error">{error}</label>}
        </div>
    )

}

export default FormDateInput;