import React from 'react'
import { Login } from './pages/Login';
import { Customer } from './components/Dashboard'
import CustomerList from './pages/CustomerList';
import { CustomerDetails } from './components/CustomerDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAccount } from './components/AddAccount';
import TransactionList from './pages/TransactionList';
import PrivateRoutes from './components/PrivateRoute';
import  CashWithdraw  from './pages/CashWithdraw';
import Profile from './components/Profile';
import FundTransfer from './pages/FundTransfer';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPin from './pages/EditPin';
import CurrencyChange from './pages/CurrencyChange';

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
              <Route path="/customer/add-account" element={<AddAccount />} />
              <Route path="/customer/transactions" element={<TransactionList />} />
              <Route path="/customer/cash-withdraw" element={<CashWithdraw />} />
              <Route path="/customer/customer-profile" element={<Profile />} />
              <Route path="/customer/changepin" element={<EditPin/>}/>
              <Route path="/customer/customer-profile" element={<Profile />} />
              <Route path = "/customer/fund-transfer" element={<FundTransfer/>}/>
              <Route path = "/customer/currency-change" element={<CurrencyChange/>}/>
              {/* <Route path="/customer/view-customer" element={<SeeCustomers />} /> */}
              {/* <Route path="/customer/customer-profile" element={<CustomerProfile />} /> */}
              {/* <Route path="/customer/customer-profile" element={<CustomerProfile />} /> */}
             
            </Route>


            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </div>


    </>
  );
}

export default App;
