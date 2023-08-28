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
import PinInput from "../components/PinInput";

const CheckBalanceForm = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const accountInitalValues = {
    accId: 0,
    balance: 0,
    cardNo: "",
    pin: "",
  };
  const [accountData, setAccountData] = useState({
    accountInitalValues,
  });
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBalance = async (data) => {
    console.log("this is data", data);
    // console.log(errors)
    const { customerId, accountId } = data;
    try {
      const response = await axios.get(
        `http://localhost:5165/api/customer/${customerId}/account/${accountId}`,
        {
          headers: {
            Authorization: "bearer " + props.jwtToken,
          },
        }
      );
      setAccountData(response.data);
      setVisible(true);
      reset({
        customerId: "",
        accountId: "",
      });

      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error(error.response.data);
        setErrorMessage(error.response.data);
        setVisible(false);
        console.log(error.response.data);
      } else if (error.response && error.response.status === 400) {
        Object.keys(error.response.data.errors).forEach((key) => {
          console.log(error.response.data.errors);
          error.response.data.errors[key].forEach((val) => {
            setVisible(false);
            toast.error(val);
            setErrorMessage(val);
          });
        });
      }
    }
  };
  return (
    <TabPanel value="check balance" className="p-0">
      <form
        className="mt-8 mb-4 flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleBalance)}
      >
        <Controller
          name="customerId"
          control={control}
          rules={{ required: "Customer ID is required" }}
          render={({ field }) => (
            <>
              <Input
                label="Enter CustomerId"
                size="lg"
                id="customerId"
                {...field}
                type="number"
                error={errors.customerId?.message}
                required
                onKeyUp={() => {
                  trigger("customerId");
                }}
              />
              {errors.customerId && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                  {" "}
                  {errors.customerId?.message}
                </span>
              )}
            </>
          )}
        />

        <Controller
          name="accountId"
          control={control}
          rules={{ required: "Account ID is required",
          pattern: {
            
            value: /^[1-9][0-9]*$/,
            message: "Enter a valid account number",
          }, }}
          render={({ field }) => (
            <>
              <Input
                label="Enter Account Number"
                size="lg"
                id="accountId"
                {...field}
                type="number"
                error={errors.accountId?.message}
                required
                onKeyUp={() => {
                  trigger("accountId");
                }}
              />
              {errors.accountId && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                  {errors.accountId?.message}
                </span>
              )}
            </>
          )}
        />
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" fullWidth className="mt-4">
          Check Balance
        </Button>
      </form>
      {visible && (
        <Card className="mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300">
          <CardBody>
            <Typography>Account Number: {accountData.accId}</Typography>
            <Typography>Balance: {accountData.balance}</Typography>
          </CardBody>
        </Card>
      )}
    </TabPanel>
  );
};

const WithdrawMoneyForm = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const handleWithdraw = async (data) => {
    const { accountId, amount, pin } = data;

    const withData = {
      accNo: parseInt(accountId),
      amount: parseInt(amount),
      pin: pin,
    };

    console.log("withData");
    try {
      const response = await axios.post(
        "http://localhost:5165/cashWithdrawal",
        withData,
        {
          headers: {
            Authorization: "bearer " + props.jwtToken,
          },
        }
      );
      console.log("response");
      toast.success(
        <>
          Withdrawal Successful.
          <br />
          Updated balance: {response.data.balance}
        </>
      );

      setErrorMessage("");
      reset({
        accountId: "",
        amount: "",
        pin: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error(error.response.data);
        setErrorMessage(error.response.data);
      } else if (error.response && error.response.status === 400) {
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((val) => {
            // toast.error(val);
            setErrorMessage(val);
          });
        });
      }
    }
  };

  return (
    <TabPanel value="money withdraw" className="p-0">
      <form
        className="mt-8 mb-4 flex flex-col gap-4"
        onSubmit={handleSubmit(handleWithdraw)}
      >
        <Controller
          name="accountId"
          control={control}
          rules={{ required: "Account ID is required",
          pattern: {
           
            value: /^[1-9][0-9]*$/,
            message: "Enter a valid Account ID",
          }, }}
          render={({ field }) => (
            <>
              <Input
                label="Enter Account Number"
                size="lg"
                id="accountId"
                {...field}
                type="number"
                error={errors.accountId?.message}
                required
                onKeyUp={() => {
                  trigger("accountId");
                }}
              />
              {errors.accountId && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                  {errors.accountId?.message}
                </span>
              )}
            </>
          )}
        />

        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Balance is required",
            pattern: {
             
              value: /^[1-9][0-9]*$/,
              message: "Enter a valid amount",
            },
          }}
          render={({ field }) => (
            <>
              <Input
                label="Enter Amount to withdraw"
                size="lg"
                id="amount"
                type="number"
                min="1"
                {...field}
                error={errors.amount?.message}
                required
                onKeyUp={() => {
                  trigger("amount");
                }}
              />
              {errors.amount && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                  {errors.amount?.message}
                </span>
              )}
            </>
          )}
        />

        <PinInput
          control={control}
          trigger={trigger}
          errors={errors}
          name="pin"
          label="Enter PIN"
        />
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
  const jwtToken = sessionStorage.getItem("jwtToken");
  const [type, setType] = useState("check balance");

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
                <CheckBalanceForm jwtToken={jwtToken} />
                <WithdrawMoneyForm jwtToken={jwtToken} />
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
