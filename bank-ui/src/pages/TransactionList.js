
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    // const [traqnsactions, setTransactions] = useState([]);


    // useEffect (() => {
    //     fetch_data();

    // }, [])
    // const fetch_data = async () => {
    //  const response = await fetch ("");
    //  setTransactions(await response.json);
    // }
    return(
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell align="right">Account Number</StyledTableCell>
              <StyledTableCell align="right">Credit </StyledTableCell>
              <StyledTableCell align="right">Debit</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
        
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default TransactionList;




