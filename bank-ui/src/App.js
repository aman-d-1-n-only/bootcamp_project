
import React from 'react'
import { Login } from './components/login';
import { Customer } from './components/customer'
// import { SeeCustomers } from './components/viewCustomers';
import  CustomerList  from './pages/CustomerList';

import { CustomerDetails } from './components/customerDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAccount } from './components/addAccount';

function App() {
  return (
    <>
      <div className="App bg-gray-100">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/add-customer" element={<CustomerDetails />} />
            <Route path="/customer/view-customer" element={<CustomerList />} />
            <Route path="/customer/add-account" element={<AddAccount />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
