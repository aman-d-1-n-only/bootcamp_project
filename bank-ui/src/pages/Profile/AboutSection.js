import React, { useState } from "react";
import DeleteCustomer from "./DeleteCustomer";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AboutSection(props) {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("Edit");
  const [updatedData, setUpdatedData] = useState(props.customerData);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const renderInput = (label, name, value) => (
    <>
      <div className="px-4 py-2 font-semibold">{label}</div>
      <Input
        className="w-fit"
        disabled={disabled}
        label={label}
        onChange={handleChange}
        name={name}
        value={value}
      />
    </>
  );

  const handleUpdate = ()=>{
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
              toast.success("Customer Details Updated Successfully");
            });    
      }
  };
  
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="bg-white p-3 shadow-sm rounded-sm">
        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
          <UserIcon className="h-7" />
          <span className="tracking-wide text-lg text-gray-800">About</span>
        </div>

        <form className="mt-6 flex flex-col gap-y-4 ">
          <div className="grid lg:grid-cols-2 text-base px-4 gap-x-14">
          <div className="grid grid-cols-2 gap-y-2">
            {renderInput("Name", "name", updatedData.name)}
            {renderInput("Email", "email", updatedData.email)}
            {renderInput("Address", "address", updatedData.address)}
            </div>
          <div className="grid grid-cols-2 gap-y-2 my-2">
            {renderInput("Contact No.", "contact", updatedData.contact)}
            {renderInput("City", "city", updatedData.city)}
            {renderInput("Pincode", "pincode", updatedData.pincode)}
          </div>
          </div>
          <div className="flex items-center justify-stretch mb-4">
            <Button
              className="mt-4 mx-10 hover:scale-105 bg-blue-900 
              text-gray-200 cursor-pointer"
              onClick={handleUpdate}
            >
              {name}
            </Button>
            <DeleteCustomer custId={props.custId}/>
          </div>
        </form>
      </div>
    </>
  );
}

export default AboutSection;
