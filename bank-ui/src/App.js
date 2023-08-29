import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import TransactionTable from "./pages/TransactionTable";
import PrivateRoutes, { NormalRoutes } from "./components/PrivateRoute";
import CashWithdraw from "./pages/CashWithdraw,js/CashWithdraw";
import ChequeDeposit from "./pages/ChequeDepositTable";
import FundTransfer from "./pages/FundTransfer";
import "react-toastify/dist/ReactToastify.css";
import CurrencyChange from "./pages/CurrencyChange";
import { AddCustomer } from "./pages/AddCustomer";
import ViewCustomer from "./pages/ViewCustomer";
import ChangePin from "./pages/ChangePin";
import Profile from "./pages/Profile/Profile";
import { Customer } from "./components/HomePage";
import MiniStatement from "./pages/MiniStatement";

function App() {
  return (
    <>
      <div className=" bg-gray-100 min-h-screen w-full h-full">
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/customer" element={<Customer />} />
              <Route path="/customer/add-customer" element={<AddCustomer />} />
              <Route
                path="/customer/view-customer"
                element={<ViewCustomer />}
              />
              <Route
                path="/customer/transactions"
                element={<TransactionTable />}
              />
              <Route path="/customer/customer-profile" element={<Profile />} />
            </Route>
            <Route element={<NormalRoutes />}>
              <Route path="/customer/changepin" element={<ChangePin />} />
              <Route
                path="/customer/fund-transfer"
                element={<FundTransfer />}
              />
              <Route
                path="/customer/cheque-deposit"
                element={<ChequeDeposit />}
              />
              <Route
                path="/customer/cash-withdraw"
                element={<CashWithdraw />}
              />
              <Route
                path="/customer/currency-change"
                element={<CurrencyChange />}
              />
              <Route
                path="/customer/mini-statement"
                element={<MiniStatement />}
              />

              <Route path="/" element={<Customer />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
