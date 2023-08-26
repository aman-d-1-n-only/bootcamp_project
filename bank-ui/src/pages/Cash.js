import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
} from '@material-tailwind/react';
import axios from 'axios';
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CheckBalanceForm = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [accountData, setAccountData] = useState({
    accId: 0,
    balance: 0,
    cardNo: '',
    pin: '',
  });
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBalance = async (data) => {
    // ... Same logic for handleBalance
  };

  return (
    <TabPanel value="check balance" className="p-0">
      <form
        className="mt-8 flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleBalance)}
      >
        {/* ... Form fields */}
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" fullWidth className="mt-4">
          Check Balance
        </Button>
      </form>
      {visible && accountData.accId !== 0 && (
        <Card className="mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300">
          {/* ... Display account data */}
        </Card>
      )}
    </TabPanel>
  );
};

const WithdrawMoneyForm = () => {
  const { handleSubmit, control, formState: { errors }, reset } = useForm();
  const [errorMessage, setErrorMessage] = useState('');

  const handleWithdraw = async (data) => {
    // ... Same logic for handleWithdraw
  };

  return (
    <TabPanel value="money withdraw" className="p-0">
      <form
        className="mt-12 flex flex-col gap-4"
        onSubmit={handleSubmit(handleWithdraw)}
      >
        {/* ... Form fields */}
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" className="mt-4" fullWidth>
          Withdraw
        </Button>
      </form>
    </TabPanel>
  );
};

const CashWithdraw = () => {
  const jwtToken = sessionStorage.getItem('jwtToken');
  const { type, setType } = useState('check balance');

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
                  onClick={() => setType('check balance')}
                >
                  Check Balance
                </Tab>
                <Tab
                  value="money withdraw"
                  onClick={() => setType('money withdraw')}
                >
                  Withdraw Money
                </Tab>
              </TabsHeader>
              <TabsBody>
                <CheckBalanceForm />
                <WithdrawMoneyForm />
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>
        <ToastContainer />
      </div>
    </>
  );
};

export default CashWithdraw;
