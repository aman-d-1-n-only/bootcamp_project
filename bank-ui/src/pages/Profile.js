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
import ModalAccount from "../components/AddAccountModal";
// import AddAccnt2 from "../services/AddAccnt";

export default function Profile() {

  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;

  const [total, setTotal] = useState(0);
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
        // console.log(accountDetails)
        // customerData = res.data;
        // setcustomerData(res.data);
      });
  });

  const [option,setOption]=useState();
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
      <div className="bg-gray-100 h-screen">
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

                  <ModalAccount showModal={showModal} toggleModal={toggleModal} handleAccountChange={handleAccountChange} accountData={accountData} SubmitAccount={SubmitAccount} />

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