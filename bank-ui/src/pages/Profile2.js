
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Dialog,
  Select,
  Option,
} from "@material-tailwind/react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";
import LeftProfileCard from "../components/LeftProfileCard";
import AccntTable from "../components/AccntTable";
import {
  ClipboardDocumentListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Info from "../components/Info";
import AboutSection from "../components/AboutSection";
import AccountSection from "../components/AccountSection";

export default function Profile() {
  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;
  const accntType=[
    "Current", "Savings"
  ]
  
  const accountInitialValues = {
    accType: "",
    cardNo: 0,
    balance: 0,
    pin: 0,
  };
  const [accountData, setaccountData] = useState(accountInitialValues);
  const [accountDetails, setAccountDetails] = useState([]);

  const [updatedData, setUpdatedData] = useState(customerData);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const jwtToken = sessionStorage.getItem("jwtToken");

  const onUpdate = (updatedData) => {
    axios
      .put(`http://localhost:5165/api/Customer/${custId}`, updatedData, {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((res) => {
        setAccountDetails(res.data);
      });
  };

  const [option, setOption] = useState();
  const handleAccountChange = (e) => {
    setOption(e);
    setaccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const SubmitAccount = (event) => {
    if (
      accountData.accType === "" ||
      accountData.cardNo === "" ||
      accountData.balance === "" ||
      accountData.pin === 0
    ) {
    } else {
      event.preventDefault();
      try {
        axios
          .post(
            `http://localhost:5165/api/customer/${custId}/account`,
            accountData,
            {
              headers: {
                Authorization: "bearer " + jwtToken,
              },
            }
          )
          .then((res) => {
            console.log(res.data);

            if (res.data) {
              alert(
                `Account Details Added successfully for ${customerData.name}`
              );
              toggleModal();
            }
          });
      } catch (error) {
        console.log(error);
        alert(error);
      }
      // console.log(accountData);
    }
  };

  return (
    <>
      {/* <Nav/> */}
      <div className="bg-gray-100">
        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2 ">

             {/* <!-- Left Side --> */}
            <LeftProfileCard custId={custId} />

            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">

               {/* <!-- About Section--> */}
              <AboutSection
                customerData={customerData}
                onUpdate={onUpdate}
                custId={custId}
                jwtToken={jwtToken}
              />

              <div className="my-4 "></div>

              {/* <!-- Account section --> */}

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
              {/* <AccountSection
                showModal={showModal}
                toggleModal={toggleModal}
                handleAccountChange={handleAccountChange}
                SubmitAccount={SubmitAccount}
                accountData={accountData}
                custId={custId}
                accountDetails={accountDetails}
              /> */}

              {/* <!-- End of profile tab --> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
