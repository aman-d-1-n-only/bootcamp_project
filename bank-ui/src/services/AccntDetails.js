import React, { useState } from 'react'
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import AccntTable from '../components/AccntTable';
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';

export default function AccntDetails(props) {

      const [open, setOpen] = useState(false);
 
      const [accountData, setaccountData] = useState(props.accountInitialValues);
      const handleOpen = () => setOpen(!open);

      const handleAccountChange = (e) => {
        setaccountData({ ...accountData, [e.target.name]: e.target.value });
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
                `http://localhost:5165/api/customer/${props.custId}/account`,
                accountData,
                {
                  headers: {
                    Authorization: "bearer " + props.jwtToken,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
    
                if (res.data) {
                  alert(
                    `Account Details Added successfully for ${props.customerData.name}`
                  );
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
    <div className="bg-white shadow-sm rounded-sm w-full p-6">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 ">
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
                        onClick={handleOpen} 
                  >
                    Add Account
                  </Button>
                  {open ? (
                    <>
                    
                        
                    <Dialog open={open} handler={handleOpen}>
                    <div className="">
                          <DialogHeader
                            className=" grid place-items-center rounded-b-none py-8 px-4 text-center bg-gray-900 rounded-t-lg"
                          >
                            
<div className=" text-white mb-4">
<CurrencyRupeeIcon className="h-20 w-20" />
                        {/* <CurrencyRupeeIcon className="h-20 w-20" /> */}
                        
                    </div>
                            <Typography variant="h4" color="white">
                              Add Account
                            </Typography>
                          </DialogHeader>
                          <DialogBody className="px-20">
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
                              <DialogFooter className="flex items-center justify-center">
                                <Button onClick={SubmitAccount && handleOpen} className="mt-4 mx-10 hover:scale-105">
                                  Add
                                </Button>
                                <Button
                                  className="mt-4 mx-10 bg-gray-400   shadow-lowshade hover:scale-105 hover:bg-gray-500 cursor-pointer 
              text-gray-900 "
              onClick={handleOpen} 
                                >
                                  Close
                                </Button>
                                </DialogFooter>
                            </form>
                            </DialogBody>
                            </div>
                        </Dialog>
                         </>
                  ) : null}

                  
                   
                  <AccntTable accountDetails={props.accountDetails} showModal={open}/>

                </div>
              </div>
    </>
  )
}
