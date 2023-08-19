import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./../pages/Navbar";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';


import UserProfile from "../img/UserProfile.png";


import { useLocation } from "react-router-dom";
import DeleteCustomer from "../services/DeleteCustomer";
import LeftProfileCard from "./LeftProfileCard";
import { Modal,Box } from "@mui/material";
import AccntTable from "./AccntTable";
// import AddAccnt2 from "../services/AddAccnt";

export default function Profile() {

  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;
  const TABLE_HEAD = ["Account Number", "Card Number", "Balance", "Edit Pin","Delete","Withdraw Cash"];

  const [total, setTotal] = useState(0);


  const accountInitialValues = {
    accNo: 0,
    cardNo: 0,
    balance: 0,
    pin: 0,
  };
  const [accountData, setaccountData] = useState(accountInitialValues);
  const [accountDetails, setAccountDetails] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("Edit");
  const [updatedData, setUpdatedData] = useState(customerData);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };


  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    axios
      .get(`http://localhost:5165/api/customer/${custId}/account`, {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setAccountDetails(res.data);
        // customerData = res.data;
        // setcustomerData(res.data);
      });

    accountDetails.map((item) => {
      setTotal(total + item.balance)
    })
  });

  const handleAccountChange = (e) => {
    setaccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const SubmitAccount = (event) => {
    if (
      accountData.accNo === "" ||
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

  const handleClick = () => { };

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        

        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2 ">
           
            <LeftProfileCard/>

            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide text-lg text-gray-800">
                    About
                  </span>
                </div>

                <form className="mt-6 flex flex-col gap-y-4 ">
                  <div className="grid lg:grid-cols-2 text-base px-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="name"
                      >
                        Name
                      </div>
                      <Input className=""
                        disabled={disabled}
                        onChange={handleChange}
                        name="name"
                        label="Name"
                        value={updatedData.name}
                      />
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        type="email"
                        label=""
                        onChange={handleChange}
                        name="email"
                      >
                        Email
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        type="email"
                        label="Email Address"
                        onChange={handleChange}
                        name="email"
                        value={updatedData.email}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="address"
                      >
                        Address
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Address"
                        onChange={handleChange}
                        name="address"
                        value={updatedData.address}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 my-2 lg:ml-4">
                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="contact"
                      >
                        Contact No.
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Contact Number"
                        onChange={handleChange}
                        name="contact"
                        value={updatedData.contact}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        onChange={handleChange}
                        name="city"
                      >
                        City
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="City"
                        onChange={handleChange}
                        name="city"
                        value={updatedData.city}
                      />

                      <div
                        className="px-4 py-2 font-semibold"
                        disabled={disabled}
                        label="Pincode"
                        onChange={handleChange}
                        name="pincode"
                      >
                        Pincode
                      </div>
                      <Input className="w-fit"
                        disabled={disabled}
                        label="Pincode"
                        onChange={handleChange}
                        name="pincode"
                        value={updatedData.pincode}
                      />
                    </div>
                  </div>
                  <div className="justify-items-center mb-4">
                    <Button
                      onClick={() => {
                        // console.log(location.state.data1);
                        setDisabled(false);
                        setName("Done");
                        if (name === "Done") {
                          axios
                            .put(
                              `http://localhost:5165/api/Customer/${custId}`,
                              updatedData,
                              {
                                headers: {
                                  Authorization: "bearer " + jwtToken,
                                },
                              }
                            )
                            .then((res) => {
                              console.log(res.data);
                              setUpdatedData(res.data);
                              setDisabled(true);
                              setName("Edit");
                              alert("Customer Details Updated Successfully");
                              // delete customerData['custId'];
                              // customerData = res.data;
                              // setcustomerData(res.data);
                            });
                          // console.log(updatedData)
                        }
                      }}
                      // type="submit"
                      className="mt-4 mx-10 hover:scale-105 bg-blue-900 
                      text-gray-200 cursor-pointer"
                    >
                      {name}
                    </Button>
                    <DeleteCustomer />

                  </div>
                </form>
              </div>

              {/* <!-- End of about section --> */}
              <div className="my-4 "></div>

              {/* <!-- Start of Account section --> */}
              <div className="bg-white p-5 shadow-sm rounded-sm ">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide text-lg text-gray-800">
                      Account Details
                    </span>
                  </div>

                  <Button
                    className="mt-4 mx-10 z-0 "
                    type="button"
                    onClick={toggleModal}
                  >
                    Add Account
                  </Button>
                  {showModal ? (
                    <>
                               <Dialog
        size="xs"
        
        open={showModal} handler={toggleModal}
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

                            <form className="mt-8 flex flex-col gap-y-4 w-full ">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                Account Details
                              </Typography>

                              <Input 
                                onChange={handleAccountChange}
                                name="accNo"
                                label="Account Number"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="cardNo"
                                label="Card Number"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="balance"
                                label="Balance"
                                value={accountData.name}
                              />

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="pin"
                                label="Pin"
                                type="password"
                                value={accountData.name}
                              />
                              <div className="flex items-center justify-center">
                                <Button onClick={SubmitAccount } className="mt-4 mx-10 hover:scale-105">
                                  Add
                                </Button>
                                <Button
                                  className="mt-4 mx-10 bg-gray-400   shadow-lowshade hover:scale-105 hover:bg-gray-500 cursor-pointer 
              text-gray-900 "
              onClick={toggleModal} 
                                >
                                  Close
                                </Button>
                                </div>
                            </form>
                            </CardBody>
                            
                        </Card> 
                        </Dialog></>
                  ) : null}

{/* Start of account table */}

<AccntTable accountDetails={accountDetails} showModal={showModal}/>
                


                </div>
              </div>

              {/* <!-- End of profile tab --> */}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}