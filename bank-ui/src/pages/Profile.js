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
} from "@material-tailwind/react";
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';
import { useLocation } from "react-router-dom";
import DeleteCustomer from "../services/DeleteCustomer";
import LeftProfileCard from "../components/LeftProfileCard";
import AccntTable from "../components/AccntTable";
import {ClipboardDocumentListIcon, UserIcon } from "@heroicons/react/24/outline";
import Info from "../components/Info";
import { Nav } from "../components/Nav";
import ModalAccount from "../components/ModalAddAccnt";
// import AddAccnt2 from "../services/AddAccnt";

import { useForm, Controller } from "react-hook-form";

export default function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({});

  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;

  const [total, setTotal] = useState(0);
  const accntType=[
    "Current", "Savings"
  ]

  // const accountInitialValues = {
  //   accType: "",
  //   cardNo: 0,
  //   balance: 0,
  //   pin: 0,
  // };
  // const [accountData, setaccountData] = useState(accountInitialValues);
  const [accountDetails, setAccountDetails] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("Edit");
  const [updatedData, setUpdatedData] = useState(customerData);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    reset();
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
        // console.log(accountDetails)
        // customerData = res.data;
        // setcustomerData(res.data);
      });
  });

  // const [option,setOption]=useState();
  // const handleAccountChange = (e) => {
  //   setOption(e);
  //   setaccountData({ ...accountData, [e.target.name]: e.target.value });
  //     };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const SubmitAccount = async (data) => {
    try {
      const response = await  axios.post(`http://localhost:5165/api/customer/${custId}/account`,
            data,
            {
              headers: {
                'Authorization': "bearer " + jwtToken,
              },
            }
          )
          // .then((response) => {
          //   console.log(res.data);

            if (response.data) {
              alert(
                `Account Details Added successfully for ${customerData.name}`);
                
              toggleModal();
             

            }
          
      } catch (error) {
        console.log(error);
        alert(error);
      
      // console.log(accountData);
    }}
  

  return (
    <>
    {/* <Nav/> */}
      <div className="bg-gray-100 min-h-screen ">
        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2 ">
           
            <LeftProfileCard custId={custId}/>

            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* <!-- Profile tab --> */}
              {/* <!-- About Section --> */}

              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <UserIcon className="h-7"/>
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
                    <DeleteCustomer customerId={custId}/>

                  </div>
                </form>
              </div>

              {/* <!-- End of about section --> */}
              <div className="my-4 "></div>

              {/* <!-- Start of Account section --> */}
              <div className="bg-white p-5 shadow-sm rounded-sm ">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    
                    <ClipboardDocumentListIcon className="h-7"/>
                   

                    <span className="tracking-wide text-lg text-gray-800">
                      Account Details
                    </span>
                  </div>

                  <div className="flex 
                           items-center gap-x-2">  
                  <Button
                    className="mt-4 ml-8 z-0 "
                    type="button"
                    variant="gradient"
                    onClick={toggleModal}
                  >
                    Add Account
                  </Button>
                  <Info/>
                  </div>

                  {/* <ModalAccount showModal={showModal} toggleModal={toggleModal} handleAccountChange={handleAccountChange} accountData={accountData} SubmitAccount={SubmitAccount} /> */}
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
                  onSubmit={handleSubmit(SubmitAccount)}
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
          value.length === 8 || "Card number must be 8 digits"
      }}
                    }
        
                    render={({ field }) => (
                      <>
                        <Input
                          label="Card Number"
                          {...field}
                          error={errors.cardNo?.message}
                          // required
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
                          // required
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
                          // required
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

{/* Start of account table */}

<AccntTable accountDetails={accountDetails} 
custId={custId} setAccountDetails={setAccountDetails}
/>
                


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