import './App.css';
import React from 'react'
import { Login } from './components/login';
import { Customer } from './components/customer'
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
            <Route path="/customer/:id" element={<CustomerDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
