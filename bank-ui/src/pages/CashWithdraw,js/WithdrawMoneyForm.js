import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, TabPanel } from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PinInput from "./PinInput";

export default function WithdrawMoneyForm(props) {
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

    axios
      .post("http://localhost:5165/api/txns", {
        status: "Success",
        amount: parseInt(amount),
        debitedFrom: parseInt(accountId),
        creditedTo: "",
      })
      .then((res) => {
        console.log(res.data);
      });
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
    <>
      <ToastContainer position="top-center" />
      <TabPanel value="money withdraw" className="p-0">
        <form
          className="mt-8 mb-4 flex flex-col gap-4"
          onSubmit={handleSubmit(handleWithdraw)}
        >
          <Controller
            name="accountId"
            control={control}
            defaultValue={props.selectedAccount}
            rules={{
              required: "Account ID is required",

              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Enter a valid Account ID",
              },
            }}
            render={({ field }) => (
              <>
                <Input
                  label="Enter Account Number"
                  size="lg"
                  id="accountId"
                  {...field}
                  type="number"
                  defaultValue={props.selectedAccount}
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
    </>
  );
}
