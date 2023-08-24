import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { BanknotesIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";

export const AddCustomer = () => {

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger
  } = useForm({
  });

  const jwtToken = sessionStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
  
    try {
      const response = await axios.post('http://localhost:5165/api/Customer/', data, {
        headers: {
          'Authorization': 'bearer ' + jwtToken
        }
      });
  
      if (response.data) {
        alert("Customer Details Added successfully");
        navigate('/customer/view-customer');
        reset(); // Reset the form
      }
    } catch (error) {
      // Handle errors
    }
  };


 
  return (
    <>
      <div className="h-full flex justify-center items-center pt-10">
        <Card
          className="
             "
        >
          <CardHeader
            color="gray"
            className=" px-6 py-4  grid h-fit place-items-center  "
          >
            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-5 text-white">
              <BanknotesIcon className="h-10 w-10" />
            </div>
            <Typography variant="h3" color="white">
              Add Customer Details
            </Typography>
          </CardHeader>
          <CardBody className="px-10">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
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
      {...field}
      error={errors.contact?.message}
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
      {...field}
      error={errors.city?.message}
      onKeyUp={() => {
        trigger("city");
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
      {...field}
      error={errors.pincode?.message}
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
      </div>
    </>
  );
};