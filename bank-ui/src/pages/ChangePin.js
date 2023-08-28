import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const changePin = (data) => {
    const jwtToken = sessionStorage.getItem("jwtToken");

    if (data.newPin !== data.confirmNewPin) {
      setErrorMessage("New pin and confirm new pin should be same");
    } else if (data.existingPin === data.newPin) {
      setErrorMessage("Old pin and new pin cannot be the same");
    } else {
      axios
        .post(`http://localhost:5165/changePin`, data, {
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        })
        .then((res) => {
          toast.success(
            `Pin Changed successfully for Account Number : ${res.data.accId}`
          );
          setErrorMessage("");
          reset();
          // window.location.reload();
        })
        .catch((error) => {
          if (error.response.status === 404) {
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
    }
  };

  return (
    <>
      <div className="min-h-fit h-full flex justify-center items-center">
        <Card className="w-96">
          <CardHeader
            color="gray"
            className="py-6 mb-4 grid place-items-center"
          >
            <div className="text-white mb-4">
              <CurrencyRupeeIcon className="h-16 w-16" />
            </div>
            <Typography variant="h3" color="white">
              Change Pin
            </Typography>
          </CardHeader>
          <CardBody className="px-10">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(changePin)}
            >
              <Input
                {...register("accNo", {
                  required: "Account Number is required",pattern: {
                    
                    value: /^[1-9][0-9]*$/,
                    message: "Enter Valid Account Number"
                  },
                })}
                label="Enter Account Number"
                size="lg"
                // pattern="[0-9]{1}"
                onKeyUp={() => {
                  trigger("accNo");
                }}
                required
              />
              <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                {errors.accNo?.message}
              </span>

              <Input
                {...register("existingPin", {
                  required: "PIN is required",
                  validate: {
                    onlyNumbers: (value) =>
                      /^\d+$/.test(value) || "PIN must contain only numbers",
                    validLength: (value) =>
                      value.length === 4 || "PIN must be 4 digits",
                  },
                })}
                label="Enter Old Pin"
                size="lg"
                type="password"
                onKeyUp={() => {
                  trigger("existingPin");
                }}
                required
              />
              <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                {errors.existingPin?.message}
              </span>

              <Input
                {...register("newPin", {
                  required: "PIN is required",
                  validate: {
                    onlyNumbers: (value) =>
                      /^\d+$/.test(value) || "PIN must contain only numbers",
                    validLength: (value) =>
                      value.length === 4 || "PIN must be 4 digits",
                  },
                })}
                label="Enter New Pin"
                size="lg"
                type="password"
                onKeyUp={() => {
                  trigger("newPin");
                }}
                required
              />
              <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                {errors.newPin?.message}
              </span>

              <Input
                {...register("confirmNewPin", {
                  required: "PIN is required",
                  validate: {
                    onlyNumbers: (value) =>
                      /^\d+$/.test(value) || "PIN must contain only numbers",
                    validLength: (value) =>
                      value.length === 4 || "PIN must be 4 digits",
                  },
                })}
                label="Confirm New Pin"
                size="lg"
                type="password"
                onKeyUp={() => {
                  trigger("confirmNewPin");
                }}
                required
              />

              <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                {errors.confirmNewPin?.message}
              </span>
              {errorMessage && (
                <div className="text-red-600 text-sm">{errorMessage}</div>
              )}
              <Button type="submit">Change Pin</Button>
            </form>
            <div className="text-red-600 mt-2 text-sm">{errors.message}</div>
          </CardBody>
        </Card>
    <ToastContainer position="top-center"/>
      </div>
    </>
  );
}
