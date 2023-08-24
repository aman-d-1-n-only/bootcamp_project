import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

import { useForm, Controller } from "react-hook-form";

export default function ModalAccount({
  showModal,
  toggleModal,
  handleAccountChange,
  accountData,
  SubmitAccount,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({});

  const accntType = ["Current", "Savings"];

    const onSubmit = async (data) => {
      console.log(data);
          alert("Account added successfully");
          reset(); 
          SubmitAccount(data); 
          toggleModal();
       
    };
    
  

 
  return (
    <>
      {showModal ? (
        <>
          <Dialog
            size="xs"
            open={showModal}
            handler={toggleModal}
            className="bg-transparent shadow-none "
          >
            <Card className="">
              <CardHeader
                className=" grid place-items-center  py-8 px-4 text-center bg-gray-900 
                            "
              >
                <div className=" text-white mb-4">
                  <CurrencyRupeeIcon className="h-20 w-20" />
                  {/* <CurrencyRupeeIcon className="h-20 w-20" /> */}
                </div>

                <Typography variant="h4" color="white">
                  Add Account
                </Typography>
              </CardHeader>
              <CardBody className="px-20">
                {/* Add Account */}

                <form
                  className="mt-8 flex flex-col gap-y-4 w-full "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="accType"
                    control={control}
                    rules={{ required: "Account type is required" }}
                    onKeyUp={() => {
                      trigger("accType");
                    }}
                    render={({ field }) => (
                      <>
                        <select
                          {...field}
                          className="p-2 border-2 border-blue-gray-100 rounded-lg w-full"
                          error={errors.name?.message}
                        >
                          <option value="" selected hidden disabled>
                            Account Type
                          </option>
                          {accntType.map((item, index) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </select>
                        {errors.accType && (
                        <Typography
                          variant="small"
                          className="-mt-3 text-red-600"
                        >
                          
                          {errors.accType?.message}
                        </Typography>
                        
                        )}
                      </>
                    )}
                  />

                  <Controller
                    name="cardNo"
                    control={control}
                    
                    rules={{
                      required: "Card number is required",
                      
                    validate: {
                      onlyNumbers: value => /^\d+$/.test(value) || "Card number must contain only numbers",
                      validLength: (value) =>
          value.length === 10 || "Card number must be 10 digits"
      }}
                    }
        
                    render={({ field }) => (
                      <>
                        <Input
                          label="Card Number"
                          {...field}
                          error={errors.cardNo?.message}
                          required
                          onKeyUp={() => {
                            trigger("cardNo");
                          }}
                        />
                         {errors.cardNo && (
                        <Typography
                          variant="small"
                          className="-mt-3 text-red-600"
                        >
                          
                          {errors.cardNo?.message}
                        </Typography>
                        
                        )}
                      </>
                    )}
                  />
<Controller
                    name="balance"
                    control={control}
                    rules={{
                      required: "Balance is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Balance must be a positive number"
                        } , // },
                      min: {
                        value: 5000,
                        message: "Minimum Balance can be 5000"
                      }
                     }}
                   
                    
                    render={({ field }) => (
                      <>
                        <Input
                          label="Balance"
                          {...field}
                          error={errors.balance?.message}
                          required
                    onKeyUp={() => {
                      trigger("balance");
                          }}
                        />
                         {errors.balance && (
                        <Typography
                          variant="small"
                          className="-mt-3 text-red-600"
                        >
                          
                          {errors.balance?.message}
                        </Typography>
                        )}
                      </>
                    )}
                  />

                  <Controller
                    name="pin"
                    control={control}
                    rules={{
                      required: "PIN is required",
                      validate: {
                        onlyNumbers: value => /^\d+$/.test(value) || "PIN must contain only numbers",
                        validLength: (value) =>
            value.length === 4 || "PIN must be 4 digits"
        }
                    }}
                   
                    render={({ field }) => (
                      <>
                        <Input
                          label="PIN"
                          type="password"
                          {...field}
                          error={errors.pin?.message}
                          onKeyUp={() => {
                            trigger("pin");
                          }}
                          required
                        />

{errors.pin && (
                        <Typography
                          variant="small"
                          className="-mt-3 text-red-600"
                        >
                          
                          {errors.pin?.message}
                        </Typography>
                        )}
                      </>
                    )}
                  />

                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      className="mt-4 mx-10 hover:scale-10 min-w-fit"
                    >
                      Add
                    </Button>
                    <Button
                      className="mt-4 mx-10 bg-gray-400   shadow-lowshade hover:scale-105 hover:bg-gray-500 cursor-pointer 
              text-gray-900 min-w-fit"
                      onClick={toggleModal}
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Dialog>
        </>
      ) : null}
    </>
  );
}
