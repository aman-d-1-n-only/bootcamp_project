import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PinInput from "./PinInput";

export default function CheckBalanceForm(props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [accountData, setAccountData] = useState();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBalance = async (data) => {
    console.log("this is data", data);
    const { accNo, pin } = data;
    props.setSelectedAccount(accNo);
    let postData = {
      accNo: accNo,
      pin: pin,
    };
    try {
      const response = await axios.post(
        `http://localhost:5165/checkBalance`,
        postData,
        {
          headers: {
            Authorization: "bearer " + props.jwtToken,
          },
        }
      );
      setAccountData(response.data);
      console.log("here", response.data);
      setVisible(true);
      reset({
        accNo: "",
        pin: "",
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
    <>
      <ToastContainer position="top-center" />
      <TabPanel value="check balance" className="p-0">
        <form
          className="mt-8 mb-4 flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleBalance)}
        >
          <Controller
            name="accNo"
            control={control}
            rules={{ required: "Account Number is required" }}
            render={({ field }) => (
              <>
                <Input
                  label="Enter Account Number"
                  size="lg"
                  id="accNo"
                  {...field}
                  type="number"
                  error={errors.accNo?.message}
                  required
                  onKeyUp={() => {
                    trigger("accNo");
                  }}
                />
                {errors.accNo && (
                  <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                    {" "}
                    {errors.accNo?.message}
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
          <Button type="submit" fullWidth className="mt-4">
            Check Balance
          </Button>
        </form>
        {visible && (
          <Card className="mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300">
            <CardBody>
              <Typography>Account Number: {props.selectedAccount}</Typography>
              <Typography>Balance: {accountData}</Typography>
            </CardBody>
          </Card>
        )}
      </TabPanel>
    </>
  );
}
