// import React from "react";
// import axios from "axios";



import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Navbar from "./Navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(
//   name: "",
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function CustomerList() {
  // const jwttoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwidXNlcm5hbWUiOiJhZG1pbiIsIm5iZiI6MTY5MjEyODE1NiwiZXhwIjoxNjkyMTMxNzU2LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo1MTY1IiwiYXVkIjoiYmFua0FwaSJ9.fCH6ShvEre6k01AnInrJumbu6ox6LvrTmbSkWWDI6Fk'
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios("http://localhost:5165/api/customer",
      //  {
      //   headers: {
      //     'Authorization': 'bearer ' + jwttoken
      //   }
      // }
    )
      .then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        setError(error)
        console.log(error)
      })
  }, []);
  return (
    <>
    <Navbar/>
    <TableContainer component={Paper}>
      <Table style = {{width :'95%',borderRadius:'10px' , margin : 30 , borderBottom : "none"}} sx={{ minWidth: 500 ,  
      borderBottom: "none"
    }} aria-label="customized table"c className='p-6'>
        <TableHead>
          <TableRow>
            <StyledTableCell> Name</StyledTableCell>
            {/* <StyledTableCell align="right">Last Name</StyledTableCell> */}
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            {/* <StyledTableCell align="right">Card Number</StyledTableCell> */}
            <StyledTableCell align="right">Pin Code</StyledTableCell>
            {/* <StyledTableCell align="right">Balance</StyledTableCell> */}

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.CustId}>
              <StyledTableCell component="th" scope="row">
                {row.Name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Address}</StyledTableCell>
              <StyledTableCell align="right">{row.City}</StyledTableCell>
              <StyledTableCell align="right">{row.Contact}</StyledTableCell>
              <StyledTableCell align="right">{row.Email}</StyledTableCell>
              <StyledTableCell align="right">{row.Pincode}</StyledTableCell>
              {/* <StyledTableCell align="right">{row.Balance}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}