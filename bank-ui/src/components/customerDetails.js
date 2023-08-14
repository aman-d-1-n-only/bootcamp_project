import React, { useState } from 'react'
import axios from 'axios';

export const CustomerDetails = () => {


    const customerInitialValues = {
        fname: "",
        lname: "",
        address: "",
        email: "",
        contact: 0,
        card_no: 0,
        pin: 0,
        city: "",
        balance: 0
    };
    const [customerData, setcustomerData] = useState(customerInitialValues);
    const display = (event) => {
        if (customerData.fname === "" || customerData.lname === "" || customerData.address === "" || customerData.email === "" || customerData.contact === 0 || customerData.card_no === 0 || customerData.pin === 0 || customerData.city === "" || customerData.balance === "") {

        }
        else {
            event.preventDefault();
            try {
                axios.post('http://localhost:5292/api/Customer/create', customerData)
                    .then(res => {
                        console.log(res.data);

                        if (res.data) {
                            alert("Customer Details Added successfully");
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

    return (<>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                Add Customer Details
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" >
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="fname"
                                value={customerData.fname}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="lname"
                                value={customerData.lname}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Address
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="address"
                                value={customerData.address}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Email ID
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="email"
                                value={customerData.email}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Contact Number
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="contact"
                                value={customerData.contact}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Card Number
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="card_no"
                                value={customerData.card_no}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Pin Number
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="pin"
                                value={customerData.pin}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="city"
                                value={customerData.city}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Balance
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="balance"
                                value={customerData.balance}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button onClick={display}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Customer details
                        </button>
                    </div>
                </form>


            </div>
        </div>
    </>
    )
}
