import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PinInput from "./PinInput";
import CheckBalanceForm from "./CheckBalanceForm";
import WithdrawMoneyForm from "./WithdrawMoneyForm";

const CashWithdraw = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const [type, setType] = useState("check balance");
  const [selectedAccount, setSelectedAccount] = useState("");
  return (
    <>
      <div className="bg-gray-100t h-full flex justify-center items-center ">
        <Card className="w-96">
          <CardHeader
            color="gray"
            className="py-6 mb-4 grid place-items-center"
          >
            <div className="text-white mb-4">
              <CurrencyRupeeIcon className="h-16 w-16" />
            </div>
            <Typography variant="h3" color="white">
              Withdraw Money
            </Typography>
          </CardHeader>
          <CardBody className="px-10">
            <Tabs value={type} className="overflow-visible">
              <TabsHeader className="relative z-0 ">
                <Tab
                  value="check balance"
                  onClick={() => setType("check balance")}
                >
                  Check Balance
                </Tab>
                <Tab
                  value="money withdraw"
                  onClick={() => setType("money withdraw")}
                >
                  Withdraw Money
                </Tab>
              </TabsHeader>
              <TabsBody>
                <CheckBalanceForm
                  jwtToken={jwtToken}
                  selectedAccount={selectedAccount}
                  setSelectedAccount={setSelectedAccount}
                />
                <WithdrawMoneyForm
                  jwtToken={jwtToken}
                  selectedAccount={selectedAccount}
                />
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
};

export default CashWithdraw;
