import React, { useState } from 'react'
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import {
    BanknotesIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

export const CustomerDetails = () => {
    const customerInitialValues = {
        name: "",
        address: "",
        email: "",
        contact: "",
        pincode: "",
        city: ""
    };

  
    const jwtToken = sessionStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
      trigger
    } = useForm({
      // // Contact number validation rules
      // defaultValues: {
      //   contact: "", // Set the default value as an empty string
      // },
      // resolver: (data) => {
      //   return {
      //     values: data,
      //     errors: {
      //       contact:
      //         !/^[6-9]\d{9}$/.test(data.contact) &&
      //         "Contact number should be 10 digits starting from 6 to 9",
      //     },
      //   };
      // },
    });
    const [customerData, setcustomerData] = useState(customerInitialValues);
    const display = (event) => {
        if (customerData.name === "" || customerData.address === "" || customerData.email === "" || customerData.contact === "" || customerData.pincode === "" || customerData.city === "") {
            toast.error("One or more fields are empty! ")
        }
        else {
            event.preventDefault();
            try {
                axios.post('http://localhost:5165/api/Customer/', customerData, {
                    headers: {
                        'Authorization': 'bearer ' + jwtToken
                    }

                }).then(res => {
                    console.log(res.data);

                    if (res.data) {
                        alert("Customer Details Added successfully");
                        navigate('/customer/view-customer');
                    }
                }).catch((error) => {

                    if(error.response.status === 404){
                        toast.error(error.response.data)
                    }
                    else if(error.response.status === 400){
                        Object.keys(error.response.data.errors).map((key, index) => {
                                // setErrors(error.response.data.errors[key])
                             error.response.data.errors[key].map((val, i) => {
                                toast.error(val)
                             })  
                         })  
                    }
                })

            } catch (error) {
                console.log(error);
                alert(error);

            }
            console.log(customerData);
        }
    }

    const handleChange = (e) => {
        setcustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    // const { countries } = useCountries();
    const [type, setType] = useState("customer");

    return (<>
        <div className='h-full flex justify-center items-center pt-20'>
            <Card className="w-fit lg:w-fit
             ">
                <CardHeader
                    color="gray"
                    className=" py-6  grid h-fit place-items-center"
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-5 text-white">
                        <BanknotesIcon className="h-10 w-10" />
                    </div>
                    <Typography variant="h3" color="white">
                        Add Customer Details
                    </Typography>
                </CardHeader>
                <CardBody className='px-10'>
                                <form className=" flex flex-col gap-y-4 ">
                                    {/* <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Personal Details
                                    </Typography> */}
<div className="grid lg:grid-rows-3 gap-6">
                   

                                    <Input onChange={handleChange}
                                        name="name" label="Name"
                                        value={customerData.name}
                                        required />

                                     <Input
                                        label="Address"
                                        onChange={handleChange}
                                        name="address"
                                        value={customerData.address}
                                        required
                                    />

                                    <div className='grid md:grid-cols-2 gap-6'>
                                     

                                   
<Input type="email" label="Email Address" onChange={handleChange}
                                        name="email"
                                        value={customerData.email}
                                        required />
                                       
                                       <Input
                                        label="Contact Number"
                                        onChange={handleChange}
                                        name="contact"
                                        value={customerData.contact}
                                        required
                                    />
                                     </div>

                                   
                                  
<div className='grid md:grid-cols-2 gap-6'>
                                    <Input
                                        label="City"
                                        size="xs"
                                        onChange={handleChange}
                                        name="city"
                                        value={customerData.city}
                                        required
                                    />

                                    <Input
                                        label="Pincode"
                                        onChange={handleChange}
                                        name="pincode"
                                        value={customerData.pincode}
                                        required
                                    />
                                    </div>
                                    </div>

                                    <Button onClick={display}
                                        className="mt-4 mx-10"
                                    >
                                        Add Customer
                                    </Button>

                                </form>
                           
                </CardBody>
            </Card>
    <ToastContainer/>
        </div>
    </>
    )
}