import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 
            'linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(200,216,228,1) 0%, rgba(43,103,119,1) 100%)'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
        backgroundImage: 
            'linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(200,216,228,1) 0%, rgba(43,103,119,1) 100%)'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(200,216,228,1) 0%, rgba(43,103,119,1) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(200,216,228,1) 0%, rgba(43,103,119,1) 100%)',
  }),
}));

function ColorlibStepIcon({
    active, completed, className, icon
}) {

  const icons = {
    1: <PermContactCalendarIcon />,
    2: <InfoIcon />,
    3: <DescriptionIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[icon]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Basic Info', 'About', 'Summary'];

export default function CustomizedSteppers({ activeStep }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4} className="stepper">
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}