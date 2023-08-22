import react, { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddAccount = () => {
    const accountInitialValues = {
        accNo: 0,
        cardNo: 0,
        balance: 0,
        pin: 0
    };
    const [accountData, setaccountData] = useState(accountInitialValues);
    const location = useLocation();
    const handleChange = (e) => {
        setaccountData({ ...accountData, [e.target.name]: e.target.value });
    }

    const display = (event, custId) => {
        if (accountData.accNo === "" || accountData.cardNo === "" || accountData.balance === "" || accountData.pin === 0) {

        }
        else {
            event.preventDefault();
            try {
                axios.post(`http://localhost:5165/api/customer/${location.state.data2}/account`, accountData)
                    .then(res => {
                        console.log(res.data);

                        if (res.data) {
                            alert(`Account Details Added successfully for ${location.state.data1}`);
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
            // console.log(accountData);
        }
    }




    return (<>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                Adding Account details for {location.state.data2}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" >
                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Account Number
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="accNo"
                                value={accountData.name}
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
                                name="cardNo"
                                value={accountData.cardNo}
                                required
                                className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Pin
                        </label>
                        <div className="mt-2">
                            <input onChange={handleChange}
                                name="pin"
                                type="password"
                                value={accountData.pin}
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
                                value={accountData.balance}
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
                            Add Account details
                        </button>
                    </div>
                </form>


            </div>
        </div>
    </>
    )
}
