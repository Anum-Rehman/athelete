import React from 'react'
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';

function createData(id, name, gender, location) {
    return { id, name, gender, location };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const List = ({ profiles }) => {
    const router = useRouter();

    const handleView = (id) => {
        router.push(`/profile/${id}`)
    }

    return (
        <div>
            <Typography variant='h5' className="listHeading">List Of Athelete</Typography>
            <TableContainer component={Paper}>
                <Table className="listTable" size="large" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="left" >Name</StyledTableCell>
                            <StyledTableCell align="left" >Gender</StyledTableCell>
                            <StyledTableCell align="left" >Location</StyledTableCell>
                            <StyledTableCell align="left" >View</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profiles.map((profile) => (
                            <TableRow
                                key={profile._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                </TableCell>
                                <TableCell align="left">{profile.name}</TableCell>
                                <TableCell align="left">{profile.gender}</TableCell>
                                <TableCell align="left">{profile.location}</TableCell>
                                <TableCell align="left">
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleView(profile._id)}>
                                        <VisibilityOutlinedIcon />
                                    </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default List

export async function getServerSideProps() {
    const response = await fetch('http://localhost:3000/api/users');
    const profiles = await response.json();
    return {
        props: {
            profiles: profiles.data
        }
    }
}







