import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Customer } from './components/Dashboard'
import CustomerTable from './pages/CustomerTable';
// import CustomerList from './pages/CustomerList';
import TransactionTable from './pages/TransactionTable';
// import TransactionList from './pages/TransactionList';
import PrivateRoutes from './components/PrivateRoute';
import  CashWithdraw  from './pages/CashWithdraw';
import ChequeDeposit from './pages/chequeDeposit';
import FundTransfer from './pages/FundTransfer';
import 'react-toastify/dist/ReactToastify.css';
import EditPin from './pages/EditPin';
import CurrencyChange from './pages/CurrencyChange';
import Profile from './pages/Profile';
import { AddCustomer } from './pages/AddCustomer';

function App() {
  return (
    <>
      <div className=" bg-gray-100 min-h-screen w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/customer" element={<Customer />} />
              {/* <Route path="/customer/add-customer" element={<CustomerDetails />} /> */}
              <Route path="/customer/add-customer" element={<AddCustomer />} />
              
              {/* {/* <Route path="/customer/view-customer" element={<CustomerList />} /> */}
               <Route path="/customer/view-customer" element={<CustomerTable />} /> 
              
                {/* <Route path="/customer/view-customer" element={<ViewCustomer />} />
             */}
              <Route path="/customer/transactions" element={<TransactionTable />} />
              <Route path="/customer/cash-withdraw" element={<CashWithdraw />} />
              <Route path="/customer/customer-profile" element={<Profile />} />
              <Route path="/customer/changepin" element={<EditPin/>}/>
              <Route path="/customer/customer-profile" element={<Profile />} />
              <Route path = "/customer/fund-transfer" element={<FundTransfer/>}/>
              <Route path = "/customer/currency-change" element={<CurrencyChange/>}/>
              <Route path = "/customer/cheque-deposit" element={<ChequeDeposit/>}/>

            </Route>
            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </div>


    </>
  );
}

export default App;
