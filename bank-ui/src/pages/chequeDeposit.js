import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import * as React from 'react';
  import { useState , useEffect } from 'react';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell, { tableCellClasses } from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';
  import axios from 'axios';
  import { styled } from '@mui/material/styles';

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
  export default function ChequeDeposit() {

    const [chequeDetails, setChequeDetails] = useState({
      accNo : "",
      amount: ""
    })
    // const transac = [
    //   {
    //     chequeNo : "101",
    //     accNo : "1",
    //     amount : 500
    //   },

    // ]
    const [allTransaction, setAllTransaction] = useState([]);
    const [chequeTransactions , setChequeTransactions] = useState([]);
   
    const handleChange = (event) => {
      setChequeDetails({...chequeDetails , [event.target.name]:event.target.value});
    }

    const handleDeposit = () => {
      // const withdrawData = {

      // }
      console.log("chequeDetails")
      console.log(typeof chequeDetails.accNo, typeof chequeDetails.amount);
      // const txnData = {
      //   "status": "Success",
      //   "amount": parseInt(chequeDetails.amount),
      //   "debitedFrom": -1,
      //   "creditTo": chequeDetails.accNo
      // }
      // axios.post('http://localhost:5165/api/txns' , txnData)
      // .then((response) => {
      //   console.log(response.data);
        chequeDetails.accNo="";
        chequeDetails.amount="";
     
      // }).catch((error) => {
      //   console.log(error)
      // })
      
    }
    const handleHistory = () => {
        axios.get('http://localhost:5165/api/txns')
        .then((response) => {
           setAllTransaction(response.data)
           filterList(response.data)
           console.log(response.data);
        }).catch((error) => {
          console.log(error)
        })
    }
    const filterList = (txns) => {
      let transac = [...txns]
      transac = transac.filter(function (transaction) {
      
        return parseInt(transaction.debitedFrom) === parseInt(-1)
      })
      setChequeTransactions([...transac])
    }

    return (
      <>
      <Card color="transparent" shadow={false} className="w-full flex justify-center items-center my-4">
        <Typography variant="h4" color="blue-gray">
          Cheque Status
        </Typography>
       
        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Enter Account Number" name = "accNo" value={chequeDetails.accNo} onChange = {handleChange}/>
            <Input size="lg" label="Enter Amount" name = "amount"  value={chequeDetails.amount} onChange={handleChange} />
          </div>
          
            <div className="flex flex-row space-x-2 items-center justify-center">
          <Button className="w-1/2" onClick = {handleDeposit} >
            Deposit Cheque
          </Button>
          <Button className = "w-1/2 whitespace-nowrap" onClick = {handleHistory} >
            View Cheque History
            </Button>
            </div>
        </form>
      </Card>
            <TableContainer component={Paper}>
            <Table style={{ width: '95%', borderRadius: '10px', margin: 30 }} sx={{ manWidth: 1000 }} aria-label="customized table">
              <TableHead >
                <TableRow >
                  <StyledTableCell style={{height: '2px'}}>Cheque Number</StyledTableCell>
                  <StyledTableCell>Account Number</StyledTableCell>
                  <StyledTableCell align="right">Amount</StyledTableCell>
                  <StyledTableCell align="right">Date</StyledTableCell>
           </TableRow>
              </TableHead>
              <TableBody>
                  {chequeTransactions?.slice(0,9).map((row) => (
                    <StyledTableRow key={row.txnId}>
                      <StyledTableCell align="right">{row.txnId}</StyledTableCell>
                      <StyledTableCell align="right">{row.creditTo}</StyledTableCell>
                      <StyledTableCell align="right">{row.amount}</StyledTableCell>
                      <StyledTableCell align="right">{row.date}</StyledTableCell>

    
                    </StyledTableRow>
                  ))}
                </TableBody>
                
            </Table>
          </TableContainer>
          </>
    );
  }