import * as React from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import { useState , useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuHandler } from '@material-tailwind/react';
import { ClassNames } from '@emotion/react';
import axios from 'axios';

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

const TransactionList = () => {
   const [transactions, setTransactions] = useState([]);

  const [searchInput, setSearchInput] = useState();
  const [t, setT] = useState([])

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
    if (e.target.value) {
      filterList(e.target.value)
    }
  }
  let transac;
  const filterList = (searchInput) => {
    transac = [...transactions]
    transac = transac.filter(function (transaction) {
      console.log(typeof searchInput)
      return parseInt(transaction.debitedFrom) === parseInt(searchInput)
    })
    setT([...transac])
  }
  
  useEffect (() => {
      axios.get("http://localhost:5165/api/txns")
      .then((response) => {
            setTransactions(response.data)
            console.log("response")
            console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })

  }, [])
  
  return (
    <>
      <div className='flex items-center justify-center
     my-4 w-full'>
      
        <TextField
          placeholder="Enter Sender's Account Number"
          // className=' min-w-64'
          value={searchInput}
          className='w-fit lg:w-1/3'
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
      {/* { searchInput > 0 && */}

      <TableContainer component={Paper}>
        <Table style={{ width: '95%', borderRadius: '10px', margin: 30 }} sx={{ manWidth: 1000 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction Id</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell align="right">Debited From </StyledTableCell>
              <StyledTableCell align="right"> Credited To</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          {console.log(searchInput)}
          {(searchInput) ? (
            <><TableBody>
              {t?.slice(0,9).map((row)  => (
                <StyledTableRow key={row.custId}>
                  <StyledTableCell align="right">{row.txnId}</StyledTableCell>
                
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.debitedFrom}</StyledTableCell>
                  <StyledTableCell align="right">{row.creditTo}</StyledTableCell>

                  <StyledTableCell align="right">{row.date}</StyledTableCell>

                  {/* <StyledTableCell align="right">{row.Balance}</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
            </>) :
            (

              <>
              <TableBody>
              {transactions?.slice(0,9).map((row) => (
                <StyledTableRow key={row.txnId}>
                  <StyledTableCell align="right">{row.txnId}</StyledTableCell>
                  <StyledTableCell align="right">{row.status}</StyledTableCell>
                  <StyledTableCell align="right">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">{row.debitedFrom}</StyledTableCell>
                  <StyledTableCell align="right">{row.creditTo}</StyledTableCell>
                  <StyledTableCell align="right">{row.date}</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
            </>
            )}
        </Table>
      </TableContainer>
      {/* } */}
    </>
  )
}

export default TransactionList;

