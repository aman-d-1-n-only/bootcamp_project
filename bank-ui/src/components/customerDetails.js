import React, { useState } from 'react'
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    BanknotesIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router';
import Navbar from '../pages/Navbar';


export const CustomerDetails = () => {


    const customerInitialValues = {
        name: "",
        address: "",
        email: "",
        contact: 0,
        pincode: 0,
        city: ""
    };

    const [customerData, setcustomerData] = useState(customerInitialValues);
    const jwtToken = sessionStorage.getItem('jwtToken');
    const navigate = useNavigate();
    const display = (event) => {
        if (customerData.name === "" || customerData.address === "" || customerData.email === "" || customerData.contact === 0 || customerData.pincode === 0 || customerData.city === "") {

        }
        else {
            // event.preventDefault();
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
    const [type, setType] = React.useState("customer");

    return (<>
    <Navbar/>
        <div className='h-full flex justify-center items-center my-8'>
            <Card className="lg:max-w-[35rem]  sm:w-1/2 
             ">
                <CardHeader
                    color="gray"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
                        <BanknotesIcon className="h-10 w-10" />
                    </div>
                    <Typography variant="h4" color="white">
                        Add Customer Details
                    </Typography>
                </CardHeader>
                <CardBody className='px-20'>
                    <Tabs value={type} className="overflow-visible">
                        <TabsHeader className="relative z-0 ">
                            <Tab value="customer" onClick={() => setType("card")}>
                                Add Customer
                            </Tab>
                            <Tab value="account" onClick={() => setType("paypal")}>
                                Add Account
                            </Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value="customer" className="p-0">
                                <form className="mt-8 flex flex-col gap-y-4 ">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-medium"
                                    >
                                        Personal Details
                                    </Typography>


                                    <Input onChange={handleChange}
                                        name="name" label="Name"
                                        value={customerData.name}
                                        className=''
                                        required

                                    />
                                    <Input type="email" label="Email Address" onChange={handleChange}
                                        name="email"
                                        value={customerData.email}
                                        required />

                                    <Input
                                        label="Address"
                                        onChange={handleChange}
                                        name="address"
                                        value={customerData.address}
                                        required
                                    />

                                    <Input
                                        label="Contact Number"
                                        onChange={handleChange}
                                        name="contact"
                                        value={customerData.contact}
                                        required
                                    />


                                    <Input
                                        label="City"
                                        onChange={handleChange}
                                        name="city"
                                        value={customerData.city}
                                        required
                                    />
                                    {/* <Select label="Country" menuProps={{ className: "h-48" }}>
                    {countries.map(({ name }: any) => (
                      <Option key={name} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select> */}
                                    {/* <Input
                    label="Postal Code"
                    containerProps={{ className: "mt-4" }}
                  /> */}

                                    <Input
                                        label="Pincode"
                                        onChange={handleChange}
                                        name="pincode"
                                        value={customerData.pincode}
                                        required
                                    />

                                    <Button onClick={display}
                                        type="submit"
                                        className="mt-4 mx-10"
                                    >
                                        Add Customer
                                    </Button>

                                </form>
                            </TabPanel>
                            <TabPanel value="account" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="mb-4 font-medium"
                                        >
                                            Account Details
                                        </Typography>
                                        <Input type="email" label="Email Address" />
                                    </div>
                                    <Button onClick={() => { navigate('/customer/add-account') }}
                                        type="submit"
                                        className="mt-4 mx-10"
                                    >
                                        Add Account
                                    </Button>
                                </form>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>

        </div>
    </>
    )
}

