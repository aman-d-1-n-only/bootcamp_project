import react, { useEffect, useState } from 'react'
import axios from 'axios'
export const SeeCustomers = () => {
    // let customerData;
    const [customerData, setcustomerData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5292/api/Customer')
            .then(res => {
                console.log(res.data);
                // customerData = res.data;
                setcustomerData(res.data);

            })
    }, [])

    return (
        <>
            View Customer Details
            <div>
                {console.log(customerData[0])}
                {customerData.map((item, index) => {
                    return (
                        <>
                            <div className='border border-sky-500 m-2 p-2'>
                                <li>  {item.fname}</li>
                                <li>{item.lname}</li>
                                <li>{item.email}</li>
                                <li>{item.contact}</li>
                                <li>{item.address}</li>
                                <li>{item.city}</li>
                            </div>
                        </>
                    )

                })}
            </div>
        </>
    )
}
