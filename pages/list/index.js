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

    const infoFields = ["", "Name", "Gender", "Location", "View"];

    return (
        <div style={{ maxWidth: "95%", margin: "0 auto" }} >
            <Typography variant='h5' className="listHeading">List Of Athelete</Typography>
            <TableContainer component={Paper}>
                <Table className="listTable" size="large" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            {
                                infoFields.map((field, index) => <StyledTableCell key={index} align={field ? "left" : ""}>{field}</StyledTableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {profiles.map((profile) => (
                            <TableRow
                                key={profile._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Avatar alt="Cindy Baker" src={profile.image || "/static/images/avatar/3.jpg"} />
                                </TableCell>
                                <TableCell align="left">{profile.name}</TableCell>
                                <TableCell align="left">{profile.gender}</TableCell>
                                <TableCell align="left">{profile.location}</TableCell>
                                <TableCell align="left">
                                    <IconButton edge="end" aria-label="delete" id={profile._id} onClick={() => handleView(profile._id)}>
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
    console.log(`${ process.env.ROOT_DIR }/api/users`)
    const response = await fetch(`${process.env.ROOT_DIR}/api/users`);
    const profiles = await response.json();
    return {
        props: {
            profiles: profiles.data
        }
    }
}







