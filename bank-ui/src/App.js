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

function App() {
  return (
    <>
      <div className="App bg-gray-100">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/add-customer" element={<CustomerDetails />} />
              <Route path="/customer/view-customer" element={<CustomerList />} />
              {/* <Route path="/customer/view-customer" element={<SeeCustomers />} /> */}
              <Route path="/customer/add-account" element={<AddAccount />} />
              <Route path="/customer/transactions" element={<TransactionList />} />
              <Route path="/customer/customer-profile" element={<CustomerProfile />} />
            </Route>

            <Route path="/" element={<Login />} />

          </Routes>
        </BrowserRouter>
      </div>


    </>
  );
}

export default App;
