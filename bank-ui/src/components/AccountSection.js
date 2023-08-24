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
import AccntTable from "../components/AccntTable";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Info from "../components/Info";

function AccountSection({
  showModal,
  toggleModal,
  handleAccountChange,
  SubmitAccount,
  accountData,
  custId,
  accountDetails,
}) {

    const accntType=[
        "Current", "Savings"
      ]
      
  return (
    <div className="bg-white p-5 shadow-sm rounded-sm ">
      <div className="w-full">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
          <ClipboardDocumentListIcon className="h-7" />

          <span className="tracking-wide text-lg text-gray-800">
            Account Details
          </span>
        </div>

        <div
          className="flex 
               items-center gap-x-2"
        >
          <Button
            className="mt-4 ml-8 z-0 "
            type="button"
            variant="gradient"
            onClick={toggleModal}
          >
            Add Account
          </Button>
          <Info />
        </div>
        {showModal ? (
          <>
            <Dialog
              size="xs"
              open={showModal}
              handler={toggleModal}
              className="bg-transparent shadow-none "
            >
              <Card>
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

                  <form className="mt-4 flex flex-col gap-y-4 w-full ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      Account Details
                    </Typography>

                    {/* 
                  <Input 
                    onChange={handleAccountChange}
                    name="accType"
                    label="Account Type"
                    value={accountData.name}
                  /> */}

                    <select
                      name="accType"
                      label="Account Type"
                      onChange={handleAccountChange}
                      value={accountData.name}
                      required
                      className="p-2 border-2 border-blue-gray-100 rounded-lg w-full"
                    >
                      <option value="" selected hidden disabled>
                        Account Type
                      </option>
                      {accntType.map((item, index) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                    <Input
                      className="w-fit"
                      onChange={handleAccountChange}
                      name="cardNo"
                      label="Card Number"
                      value={accountData.name}
                    />

                    <Input
                      className="w-fit"
                      onChange={handleAccountChange}
                      name="balance"
                      label="Balance"
                      type="number"
                      value={accountData.name}
                    />

                    <Input
                      className="w-fit"
                      onChange={handleAccountChange}
                      name="pin"
                      label="Pin"
                      type="password"
                      value={accountData.name}
                    />
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={SubmitAccount}
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

        {/* Start of account table */}

        <AccntTable accountDetails={accountDetails} custId={custId} />
      </div>
    </div>
  );
}
export default AccountSection;
