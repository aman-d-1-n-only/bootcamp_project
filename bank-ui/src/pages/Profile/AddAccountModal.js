import React from "react";
import { Card, CardHeader, CardBody, Input, Button, Typography, Dialog } from "@material-tailwind/react";
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';

function AddAccountModal({
    showModal,
    toggleModal,
    register,
    errors,
    handleSubmit,
    trigger,
    accntType,
    SubmitAccount
  }) {
    
  return (
    <Dialog size="xs" open={showModal} handler={toggleModal} className="bg-transparent shadow-none min-w-fit">
      <Card className="min-w-fit">
        <CardHeader className="grid place-items-center py-8 px-4 text-center bg-gray-900 ">
          <div className="text-white mb-4">
            <CurrencyRupeeIcon className="h-20 w-20" />
          </div>
          <Typography variant="h4" color="white">
            Add Account
          </Typography>
        </CardHeader>
        <CardBody className="px-20">
          <form
            className="mt-8 flex flex-col gap-y-4"
            onSubmit={handleSubmit(SubmitAccount)}
          >
            <div className="flex flex-col gap-y-4  -mx-8 ">
              <select
                name="accType"
                ref={register({ required: "Account type is required" })}
                className="p-2 border-2 border-blue-gray-100 rounded-lg w-full"
              >
                <option value="" hidden disabled>
                  Account Type
                </option>
                {accntType.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.accType && (
                <Typography
                  variant="small"
                  className="-mt-3 text-red-600"
                >
                  {errors.accType?.message}
                </Typography>
              )}

              <Input
                label="Card Number"
                name="cardNo"
                ref={register({
                  required: "Card number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Card number must contain only numbers",
                  },
                  validate: {
                    validLength: (value) =>
                      value.length === 8 || "Card number must be 8 digits",
                  },
                })}
                error={errors.cardNo?.message}
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
              
              <Input
                label="Balance"
                name="balance"
                ref={register({
                  required: "Balance is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Enter a valid balance",
                  },
                  min: {
                    value: 5000,
                    message: "Minimum Balance can be 5000",
                  },
                })}
                error={errors.balance?.message}
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

              <Input
                label="PIN"
                type="password"
                name="pin"
                ref={register({
                  required: "PIN is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "PIN must contain only numbers",
                  },
                  validate: {
                    validLength: (value) =>
                      value.length === 4 || "PIN must be 4 digits",
                    },
                })}
                error={errors.pin?.message}
                onKeyUp={() => {
                  trigger("pin");
                }}
              />
              {errors.pin && (
                <Typography
                  variant="small"
                  className="-mt-3 text-red-600"
                >
                  {errors.pin?.message}
                </Typography>
              )}

              <div className="flex items-center justify-center gap-x-20">
                <Button
                  type="submit"
                  className="mt-4 hover:scale-10 min-w-fit w-24
                    hover:scale-105 "
                >
                  Add
                </Button>
                <Button
                  className="mt-4 bg-gray-400  w-24 shadow-lowshade hover:scale-105 hover:bg-gray-500 
                    text-gray-900 min-w-fit"
                  onClick={toggleModal}
                >
                  Close
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </Dialog>
  );
}

export default AddAccountModal;
