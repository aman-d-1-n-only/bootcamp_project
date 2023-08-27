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
  import {useForm , Controller} from "react-hook-form";

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

    const { handleSubmit, control, formState: { errors }, reset,trigger } = useForm();

    const [accNo, setAccNo] = useState("");
    const [amount, setAmount] = useState();
    const [allTransaction, setAllTransaction] = useState([]);
    const [chequeTransactions , setChequeTransactions] = useState([]);
   
    
  
    const handleAccNo = (event) => {
      setAccNo(event.target.value);
    }
    const handleAmount = (event) => {
      setAmount(event.target.value);
    }

    const handleDeposit = () => {
      const txnData = {
        "status": "Success",
        "amount": parseInt(amount),
        "debitedFrom": -1,
        "creditTo": accNo
      }
      axios.post('http://localhost:5165/api/txns' , txnData)
      .then((response) => {
        console.log(response.data);
        setAmount("");
        setAccNo("");
      }).catch((error) => {
        console.log(error)
      })

      const chequeData = {
        "accNo" : accNo,
        "amount" : parseInt(amount)
      }
      axios.post('http://localhost:5165/chequeDeposit' , chequeData)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

      reset({
        accNo : "",
        amount:0
      })
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
       
        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" 
           onSubmit = {handleSubmit(handleDeposit)}>
          <div className="mb-4 flex flex-col gap-6">
          <Controller
                      name="accNo"
                      control={control}
                      rules={{ required: 'Account number is required' }}
                      render={({ field }) => (
                        <>
                          <Input size="lg" label="Enter Account Number" id = "accNo" name = "accNo" value={accNo} onChange = {handleAccNo} error = {errors.accNo?.message} onKeyUp = {() =>{
              trigger("accNo");}
            }/>
                          {errors.accNo && <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm"
   > {errors.accNo?.message}</span>}
                        </>
                      )}
                    />
                    <Controller
                      name="amount"
                      control={control}
                      rules={{ required: 'Amount is required' }}
                      render={({ field }) => (
                        <>
                            <Input size="lg" label="Enter Amount" id = "amount" name = "amount"  value={amount} onChange={handleAmount} error = {errors.amount?.message} onKeyUp = {() => {
              trigger("amount");}}/>
                          {errors.amount && <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm"
   > {errors.amount?.message}</span>}
                        </>
                      )}
                    />
           
          
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