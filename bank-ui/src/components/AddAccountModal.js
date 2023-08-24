import React from 'react'
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
  
import { useForm, Controller } from "react-hook-form";

export default function ModalAccount({showModal, toggleModal,handleAccountChange,accountData,SubmitAccount}) {
    const accntType=[
        "Current", "Savings"
      ]

      const onSubmit = (data) => {
        // Handle form submission with valid data
        console.log(data);
      };

      
      const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        trigger
      } = useForm({});

      return (
    <>
     {showModal ? (
                    <>
                               <Dialog
        size="xs"
        open={showModal} handler={toggleModal}
        className="bg-transparent shadow-none "
      >
        <Card className='overflow-scroll'>
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

                          
                           {/* <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-medium"
                              >
                                Account Details
                              </Typography> */}
                              <form className="mt-8 flex flex-col gap-y-4 w-full " onSubmit={handleSubmit(SubmitAccount)}>

{/* 
                              <Input 
                                onChange={handleAccountChange}
                                name="accType"
                                label="Account Type"
                                placeholder="Current or Savings"
                                value={accountData.name}
                              /> */}
<Controller
  name="accType"
  control={control}
  rules={{ required: "Account type is required" }}
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
    <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.accType?.message}</Typography>
  {errors.accType && (
          <p className="text-red-500">{errors.accType.message}</p>
        )}

</>
  )}
  />
                      
     
                      <Controller
  name="cardNo"
  control={control}
  rules={{ required: "Account type is required" }}
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
    <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.cardNo?.message}</Typography>
  {errors.cardNo && (
          <p className="text-red-500">{errors.cardNo.message}</p>
        )}

</>
  )}
  />
                              

                              <Input className="w-fit"
                                onChange={handleAccountChange}
                                name="balance"
                                label="Balance"
                                type="number"
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
                                <Button 
                                type="submit" className="mt-4 mx-10 hover:scale-10 min-w-fit">
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

                            <form className=" " onSubmit={handleSubmit(onSubmit)}>
              {/* <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Personal Details
                                    </Typography> */}
              {/* <div className="flex flex-wrap items-center  gap-y-6"> */}
              <Controller
  control={control}
  name="name"
  render={({ field }) => (
   <> <Input
      label="Name"
      {...field}
      error={errors.name?.message}
      required
    />
    <Typography
        variant="small"
        color="gray"
        className="my-2 flex items-center gap-1 font-normal text-red-600"
      >{errors.name?.message}</Typography>
    
    </>
  )}
  rules={{ required: 'Name is required' }}
  
/>

<Controller
  control={control}
  name="address"
  render={({ field }) => (
    <>
    <Input
      label="Address"
      {...field}
      error={errors.address?.message}
      required
    />
    <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.address?.message}</Typography>

</>
  )}
  rules={{ required: 'Address is required' }}
/>


<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <>
    <Input
    label="Email Address"
      {...field}
      error={errors.email?.message}
      required
      onKeyUp={() => {
        trigger("email");
      }}
    />
    <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.email?.message}</Typography>

</>
  )}
  rules={{ required: 'Email is required',
  pattern: {
    value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    ,   message: 'Invalid email format ',
  },
}}/>

<Controller
  control={control}
  name="contact"
  render={({ field }) => (
    <>
    <Input
    label="Contact Number"
    type="number"
      {...field}
      error={errors.contact?.message}
      required
      onKeyUp={() => {
        trigger("contact");
      }}
    />
   
   <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.contact?.message}</Typography>
{/* 
{errors.contact && (
        <div className="my-1 flex items-center gap-1 font-normal text-red-600">
          <ExclamationCircleIcon className="h-4 w-4" />
          <Typography
    variant="small"
    color="gray"
    className="flex items-center gap-1 font-normal text-red-600"
  >{errors.contact?.message}</Typography>
        </div>
      )} */}

</>
  )}
  rules={{ required: 'Contact Number is required',
    validate: {
        startsWith6To9: (value) =>
          /^[6-9]/.test(value) ||
          "Contact number should start with a digit from 6 to 9",
        validLength: (value) =>
          value.length === 10 || "Contact number should be exactly 10 digits",
      },
     }}
/>


<Controller
  control={control}
  name="city"
  render={({ field }) => (
    <>
    <Input
    label="City"
    type="text"
      {...field}
      error={errors.city?.message}
      required
      onKeyUp={() => {
        trigger("city")
       
      }}
    />
     <Typography
        variant="small"
        color="gray"
        className="my-2 flex items-center gap-1 font-normal text-red-600"
      >{errors.city?.message}</Typography>
    
    </>
  )}
  rules={{ required: 'City is required',  pattern: {
    value: /^[A-Za-z]+$/
    ,   message: 'City name can not be numbers',
  }, }}
/>
<Controller
  control={control}
  name="pincode"
  render={({ field }) => (
    <>
    <Input
    label="Pincode"
    type="number"
      {...field}
      error={errors.pincode?.message}
      required
      onKeyUp={() => {
        trigger("pincode");
      }}
    />
    <Typography
    variant="small"
    color="gray"
    className="my-2 flex items-center gap-1 font-normal text-red-600"
  >{errors.pincode?.message}</Typography>

</>
  )}
  rules={{ required: 'Pincode is required',
  pattern: {
    value: /^\d{6}$/
    ,   message: 'Pincode should be exactly 6 digits long',
  }, }}
/>

{/* </div> */}

              <Button type="submit" className="w-full mt-4  items-center" 

              >
                Add Customer
              </Button>
            </form>
                            </CardBody>
                            
                        </Card> 
                        </Dialog></>
                  ) : null}
</>
  )
}
