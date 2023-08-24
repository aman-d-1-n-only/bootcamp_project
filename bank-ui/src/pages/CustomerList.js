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
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";

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



export default function CustomerList() {

  const jwtToken = sessionStorage.getItem('jwtToken')
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [t, setT] = useState([]);

  const handleChange = (event) => {
   event.preventDefault();
   setSearchInput(event.target.value);
   if(event.target.value){
     filterList(event.target.value)   }

  }
  let transac;
  const filterList = (searchInput) => {
    transac = [...data]
    transac = transac.filter(function (row) {
      // console.log(typeof searchInput)
      return parseInt(row.custId) === parseInt(searchInput)
    })
    setT([...transac])
  }




  useEffect(() => {
    axios.get("http://localhost:5165/api/Customer",
      {
        headers: {
          'Authorization': 'bearer ' + jwtToken
        }
      }
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
    <div className='flex items-center justify-center
     my-4 w-full'>
       
        <TextField
          placeholder="Enter Customer ID"
          className='w-fit lg:w-1/3'
          value={searchInput}
          onChange={handleChange}
          InputProps={{

            endAdornment: (
              <InputAdornment>
                <IconButton
                 >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>

     
      <TableContainer component={Paper}>
        <Table style={{ width: '95%', borderRadius: '10px', margin: 30, borderBottom: "none" }} sx={{
          minWidth: 500,
          borderBottom: "none"
        }} aria-label="customized table" c className='p-6'>
          <TableHead>
            <TableRow>
            <StyledTableCell align = "right"> Customer Id</StyledTableCell>

              <StyledTableCell align = "right"> Name</StyledTableCell>
              {/* <StyledTableCell align="right">Last Name</StyledTableCell> */}
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">City</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Contact</StyledTableCell>
              {/* <StyledTableCell align="right">Card Number</StyledTableCell> */}
              <StyledTableCell align="right">Pin Code</StyledTableCell>
              <StyledTableCell align="right">Profile</StyledTableCell>
              {/* <StyledTableCell align="right">Balance</StyledTableCell> */}

            </TableRow>
          </TableHead>
          { (searchInput) ? <>  <TableBody>
            {t?.map((row) => (
              <React.Fragment key={row.custId}>
                <StyledTableRow key={row.custId}>
                <StyledTableCell align="right">{row.custId}</StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="right">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">{row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.contact}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => {
                      navigate('/customer/customer-profile', {
                        state: {
                          data1: row
                        }
                      })
                    }}>View</Button>
                  </StyledTableCell>

                  {/* <StyledTableCell align="right">{row.Balance}</StyledTableCell> */}
                </StyledTableRow>
              </React.Fragment>))}
          </TableBody></> : <>  <TableBody>
            {data?.map((row) => (
              <React.Fragment key={row.custId}>
                <StyledTableRow key={row.custId}>
                <StyledTableCell align="right">{row.custId}</StyledTableCell>

                  <StyledTableCell component="th" scope="row" align="right">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                  <StyledTableCell align="right">{row.city}</StyledTableCell>
                  <StyledTableCell align="right">{row.contact}</StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Button onClick={() => {
                      navigate('/customer/customer-profile', {
                        state: {
                          data1: row
                        }
                      })
                    }}>View</Button>
                  </StyledTableCell>

                  {/* <StyledTableCell align="right">{row.Balance}</StyledTableCell> */}
                </StyledTableRow>
              </React.Fragment>))}
          </TableBody></>  }
        </Table>
      </TableContainer>
    </>
  );
}