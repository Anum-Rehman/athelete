import React from 'react'
import { Typography } from '@mui/material'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Profile = ({ profile }) => {
  const router = useRouter();
  const editProfile = () => {
    router.push(`/?id=${profile._id}`, "/")
  }

  return (
    <div className='profile'>
      <div className='profile-icon'><BorderColorIcon onClick={editProfile} /></div>
      <Typography className='profile_heading'>Profile</Typography>
      <Typography className='profile_subheading'>Hello! This is {profile.name}</Typography>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid xs={4} sm={8} md={4} >
            <Item className='profile_image'>
              <div>
            <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1BwYl1Svb2h_YRhj9tcnZk0yAuIHh3oBM03dzDa8f&s" className='profile_image__avatar'/>
            </div>
              <h3 className='profile_image__heading'>Hello I&apos;m {profile.name}</h3>
            <p className='profile_image__summary'>
              {profile.description}
            </p>
            </Item>
          </Grid>
          <Grid xs={4} sm={8} md={4} >
            <Item className='profile_details'>
              <Typography variant='h5' className='profile_details__heading'>Details</Typography>
              <p className='profile_details__heading'>Name:</p>
              <p>{profile.name}</p>
              <p className='profile_details__heading'>Date Of Birth:</p>
              <p>{dayjs(new Date(profile.dob)).format('MM/DD/YYYY')}</p>
              <p className='profile_details__heading'>Location:</p>
              <p>{profile.location}</p>
            </Item>
          </Grid>
          <Grid xs={4} sm={8} md={4} >
            <Item className='profile_description'>
            <Typography variant='h5' className='profile_description__heading'>About me</Typography>
            <p>
              I love {profile.interest}. Sports is in my passion and actively takes part in 
              {profile.sports.map((sport, index) => index === profile.sports.length -1 ? ` and ${sport}` : ` ${sport},`)} etc. 
              I am a part of {profile.team}.
            </p>
            </Item>
          </Grid>
        
        {/* ))} */}
      </Grid>
    </Box>
    </div>
  )
}

export default Profile

export async function getServerSideProps({res,req,params}) {
  const response = await fetch(`http://localhost:3000/api/${params.slug[0]}`);
  const profile = await response.json();

  return {
    props: {
      profile: profile.data
    }, // will be passed to the page component as props
  }
}