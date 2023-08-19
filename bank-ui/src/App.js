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
<<<<<<< HEAD
import  CashWithdraw  from './pages/CashWithdraw';
=======
import Profile from './components/Profile2';
>>>>>>> bc813dc14a2465caa1bb3f72faf4eda767d802e1

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
            </Route>


            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </div>


    </>
  );
}

export default App;
