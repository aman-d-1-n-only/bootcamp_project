import React from 'react'
import { Login } from './components/login';
import { Customer } from './components/customer'
import { SeeCustomers } from './components/viewCustomers';
import CustomerList from './pages/CustomerList';
import { CustomerDetails } from './components/customerDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAccount } from './components/addAccount';
import TransactionList from './pages/TransactionList';
import PrivateRoutes from './components/PrivateRoute';
import CustomerProfile from './components/CustomerProfile';
import  CashWithdraw  from './pages/CashWithdraw';
import Profile from './components/Profile2';
import FundTransfer from './pages/FundTransfer';

function App() {
  return (
    <>
      <div className="App bg-gray-100 min-h-screen">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/add-customer" element={<CustomerDetails />} />
              <Route path="/customer/view-customer" element={<CustomerList />} />
              {/* <Route path="/customer/view-customer" element={<SeeCustomers />} /> */}
              <Route path="/customer/add-account" element={<AddAccount />} />
              <Route path="/customer/transactions" element={<TransactionList />} />
              <Route path="/customer/cash-withdraw" element={<CashWithdraw />} />

              {/* <Route path="/customer/customer-profile" element={<CustomerProfile />} /> */}
              {/* <Route path="/customer/customer-profile" element={<CustomerProfile />} /> */}
              <Route path="/customer/customer-profile" element={<Profile />} />
              <Route path = "/customer/fund-transfer" element={<FundTransfer/>}/>
            </Route>


            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </div>


    </>
  );
}

export default App;
