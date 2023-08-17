import * as React from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "./Navbar";
import { MenuHandler } from '@material-tailwind/react';
import { ClassNames } from '@emotion/react';

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
  //  const [transactions, setTransactions] = useState([]);

  const [searchInput, setSearchInput] = useState();
  const [t, setT] = useState([])
  const trns = [
    {
      "custId": 1,
      "name": "abc",
      "accountNo": 574598762345,
      "credit": 120.00,
      "debit": 0.00,
      "time": "06/06/2012 09:10:19",
      "balance": 1200120.00
    },
    {
      "custId": 2,
      "name": "def",
      "accountNo": 574598762345,
      "credit": 100.00,
      "debit": 0.00,
      "time": "06/06/2012 09:10:19",
      "balance": 1200220.00

    },
    {
      "custId": 3,
      "name": "klm",
      "accountNo": 574598762345,
      "credit": 0.00,
      "debit": 100.00,
      "time": "06/06/2012 09:10:19",
      "balance": 1200120.00
    }
  ]

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
    if (e.target.value > 0) {
      filterList(e.target.value)
    }
  }
  let transac;
  const filterList = (searchInput) => {
    transac = [...trns]
    transac = transac.filter(function (transaction) {
      console.log(typeof searchInput)
      return parseInt(transaction.custId) === parseInt(searchInput)
    })
    setT([...transac])
  }
  //  if (searchInput > 0){
  //   transactions.filter((transaction) => {
  //       return (parseInt(transaction.custId) === parseInt(searchInput))
  //   })
  //  }
  // useEffect (() => {
  //     axios.get("")

  // }, [])
  // const fetch_data = async () => {
  //  const response = await fetch ("");
  //  setTransactions(await response.json);
  // 
  const inputStyle = { width: "300px", height: "100px" }
  const styles = theme => ({
    textField: {
      width: '90%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 0,
      marginTop: 0,
      fontWeight: 500
    },
    input: {
      color: 'white'
    }
  })
  console.log("t")
  console.log(t)

  return (
    <>
      <Navbar />
      <div style={inputStyle}>
        {/* <input 
            type = "number"
            placeholder = "Enter CustomerId here"
            onChange = {handleChange}
            value = {searchInput}/> */}
        <TextField
          // label="Enter customerId"
          placeholder="Enter customerId"
          style={{
            marginLeft: "130px",
            marginRight: "-400px",
            paddingRight: "-200px",
            paddingLeft: "180px",
            width: "800px",
            marginTop: "20px"
          }}
          value={searchInput}
          onChange={handleChange}
          InputProps={{

            endAdornment: (
              <InputAdornment>
                <IconButton
                  onclick={handleChange}>
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
              {(searchInput) ? (<StyledTableCell>Customer Id</StyledTableCell>) : (<></>)}
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Account Number</StyledTableCell>
              <StyledTableCell align="right">Credit </StyledTableCell>
              <StyledTableCell align="right">Debit</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          {console.log(searchInput)}
          {(searchInput) ? (
            <><TableBody>
              {t?.map((row) => (
                <StyledTableRow key={row.custId}>
                  <StyledTableCell align="right">{row.custId}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.accountNo}</StyledTableCell>
                  <StyledTableCell align="right">{row.credit}</StyledTableCell>
                  <StyledTableCell align="right">{row.debit}</StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>

                  <StyledTableCell align="right">{row.balance}</StyledTableCell>

                  {/* <StyledTableCell align="right">{row.Balance}</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
            </>) :
            (
              <><TableBody>
                <StyledTableRow key={1}>
                  <StyledTableCell component="th" scope="row">
                    ABC
                  </StyledTableCell>
                  <StyledTableCell align="right">675634523456</StyledTableCell>
                  <StyledTableCell align="right">100.00</StyledTableCell>
                  <StyledTableCell align="right">0.00</StyledTableCell>

                  <StyledTableCell align="right">01/04/2012 09:10:19</StyledTableCell>
                  <StyledTableCell align="right">120000.00</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={2}>
                  <StyledTableCell component="th" scope="row">
                    HYU
                  </StyledTableCell>
                  <StyledTableCell align="right">90674523456</StyledTableCell>
                  <StyledTableCell align="right">100.00</StyledTableCell>
                  <StyledTableCell align="right">0.00</StyledTableCell>

                  <StyledTableCell align="right">01/09/2012 09:10:19</StyledTableCell>
                  <StyledTableCell align="right">120000.00</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={3}>
                  <StyledTableCell component="th" scope="row">
                    GHY
                  </StyledTableCell>
                  <StyledTableCell align="right">675634523456</StyledTableCell>
                  <StyledTableCell align="right">0.00</StyledTableCell>
                  <StyledTableCell align="right">140.00</StyledTableCell>

                  <StyledTableCell align="right">06/06/2012 09:10:19</StyledTableCell>
                  <StyledTableCell align="right">120000.00</StyledTableCell>
                </StyledTableRow>
                <StyledTableRow key={4}>
                  <StyledTableCell component="th" scope="row">
                    DEF
                  </StyledTableCell>
                  <StyledTableCell align="right">789045523456</StyledTableCell>
                  <StyledTableCell align="right">140.00</StyledTableCell>
                  <StyledTableCell align="right">0.00</StyledTableCell>

                  <StyledTableCell align="right">01/04/2014 10:10:19</StyledTableCell>
                  <StyledTableCell align="right">120000.00</StyledTableCell>
                </StyledTableRow>

              </TableBody>\
              </>)}
        </Table>
      </TableContainer>
      {/* } */}
    </>
  )
}
export default TransactionList;

