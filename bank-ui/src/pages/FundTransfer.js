import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';

const FundTransfer = () => {
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();
  
  const [errorMessage, setErrorMessage] = useState("");
  // const navigate = useNavigate();
  const jwtToken = sessionStorage.getItem('jwtToken');

  const handleTransfer = (data) => {
    axios.post(`http://localhost:5165/fundTransfer`, data, {
      headers: {
        'Authorization': "bearer " + jwtToken,
      },
    })
    .then((response) => {
      console.log("fund transfer response");
      console.log(response.data);
      toast.success("Fund Transfer is Successful");
      setErrorMessage("");
          
      // Reset the form after successful transfer
      reset();
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        // toast.error(error.response.data);
        setErrorMessage(error.response.data);
      } else if (error.response.status === 400) {
        Object.keys(error.response.data.errors).forEach((key) => {
          error.response.data.errors[key].forEach((val) => {
            // toast.error(val);
            setErrorMessage(val);
          });
        });
      }
    });

    const txnData = {
      "status": "Success",
      "amount": data.amount,
      "debitedFrom": data.accNo1,
      "creditTo": data.accNo2
    };

    axios.post(`http://localhost:5165/api/txns`, txnData)
    .then((response) => {
      console.log("txn post response");
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data.errors);
      }
    });
  };

  return (
    <div className="min-h-fit h-full flex justify-center items-center">
      <Card className="w-96">
        <CardHeader color="gray" className="py-6 mb-4 grid place-items-center">
          <div className="text-white mb-4">
            <CurrencyRupeeIcon className="h-16 w-16" />
          </div>
          <Typography variant="h3" color="white">
            Fund Transfer
          </Typography>
        </CardHeader>
        <CardBody className="px-10">
          <form className="flex flex-col gap-4 my-4" onSubmit={handleSubmit(handleTransfer)}>
            <Input
              {...register("accNo1", { required: "Sender's Account Number is required",
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Enter Valid Account Number"
              },
            })}
              label="Enter Sender's Account Number"
              size="lg"
              type="number"
              onKeyUp={() => {
                trigger("accNo1");
              }}
              required
            />
            {errors.accNo1 && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">{errors.accNo1.message}</span>
            )}

            <Input
              {...register("accNo2", { required: "Receiver's Account Number is required",pattern: {
             
                value: /^[1-9][0-9]*$/,
                message: "Enter Valid Account Number"
              },
            })}
              label="Enter Receiver's Account Number"
              size="lg"
              type="number"
              onKeyUp={() => {
                trigger("accNo2");
              }}
              required
            />
            {errors.accNo2 && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">{errors.accNo2.message}</span>
            )}

            <Input
              {...register("amount", { required: "Amount is required",
              pattern: {
                value: /^[1-9][0-9]*$/,
                message: "Enter a valid amount"
                } , 
             })}
             onKeyUp={() => {
                trigger("amount");
              }}
              required
              label="Enter Amount"
              size="lg"
              type="number"
            />
            {errors.amount && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">{errors.amount.message}</span>
            )}

            <Input
              {...register("pin", { required: "PIN is required",validate: {
                onlyNumbers: (value) =>
                  /^\d+$/.test(value) || "PIN must contain only numbers",
                validLength: (value) =>
                  value.length === 4 || "PIN must be 4 digits",
              },
            })}
              label="Enter PIN"
              size="lg"
              type="password"
              onKeyUp={() => {
                trigger("pin");
              }}
              required
            />
            {errors.pin && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">{errors.pin.message}</span>
            )}
{errorMessage && (
                <div className="text-red-600 text-sm">{errorMessage}</div>
              )}
            <Button variant="gradient" className="mt-2" fullWidth type="submit">
              Click To Transfer
            </Button>
          </form>
        </CardBody>
      </Card>
    <ToastContainer position="top-center"/>
    </div>
  );
};

export default FundTransfer;
