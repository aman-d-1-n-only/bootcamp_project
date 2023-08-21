import React, { useState } from "react";
import DeleteCustomer from "../services/DeleteCustomer";
import axios from "axios";
import DisplayInput from "./DisplayInput";
import { Button, Input } from "@material-tailwind/react";

export default function About(props) {

  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("Edit");

  const [updatedData, setUpdatedData] = useState(props.customerData);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };


  return (
    <>
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
          <span className="tracking-wide text-lg text-gray-800">About</span>
        </div>

        <form className="mt-6 flex flex-col gap-y-4 ">
          <div className="grid lg:grid-cols-2 text-base px-4">
            {/* <div className="grid grid-cols-2 gap-y-2">                      
                      <DisplayInput name="name" label="Name" disabled={true} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
                      <DisplayInput name="email" label="Email Address" type="email" disabled={true} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
                      <DisplayInput name="address" label="Address"disabled={true} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
                      <DisplayInput name="email" label="Email Address" type="email" disabled={true} updatedData={updatedData} setUpdatedData={setUpdatedData}/>
                </div> */}
            <div className="grid grid-cols-2 gap-y-2">
              <div
                className="px-4 py-2 font-semibold"
                disabled={disabled}
                onChange={handleChange}
                name="name"
              >
                Name
              </div>
              <Input
                className=""
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
              <Input
                className="w-fit"
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
              <Input
                className="w-fit"
                disabled={disabled}
                label="Address"
                onChange={handleChange}
                name="address"
                value={updatedData.address}
              />
            </div>

            {/* <div className="grid grid-cols-2 gap-y-2 my-2 lg:ml-4">
              <DisplayInput
                name="contact"
                label="Contact Number"
                disabled={true}
                updatedData={updatedData}
                setUpdatedData={setUpdatedData}
              />
              <DisplayInput
                name="city"
                label="City"
                updatedData={updatedData}
                disabled={true}
                setUpdatedData={setUpdatedData}
              />
              <DisplayInput
                name="pincode"
                label="Pincode"
                updatedData={updatedData}
                disabled={true}
                setUpdatedData={setUpdatedData}
              />
            </div> */}
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
                      `http://localhost:5165/api/Customer/${props.custId}`,
                      updatedData,
                      {
                        headers: {
                          Authorization: "bearer " + props.jwtToken,
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
    </>
  );
}
