import './App.css';
import React from 'react'
import { Login } from './components/login';
import { Customer } from './components/customer'
import { SeeCustomers } from './components/viewCustomers';
import { CustomerDetails } from './components/customerDetails'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/add-customer" element={<CustomerDetails />} />
            <Route path="/customer/view-customer" element={<SeeCustomers />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
