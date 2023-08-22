import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography
} from "@material-tailwind/react";
import {
  BanknotesIcon
} from "@heroicons/react/24/solid";
import { useLocation } from 'react-router';
import axios from 'axios';
import Navbar from '../pages/Navbar';

export default function CustomerProfile() {
  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;

  const accountInitialValues = {
    accNo: 0,
    cardNo: 0,
    balance: 0,
    pin: 0
  };
  const [accountData, setaccountData] = useState(accountInitialValues);
  const [accountDetails,setAccountDetails]=useState([]);
  const [disabled, setDisabled] = useState(true)
  const [name, setName] = useState("Edit")
  const [updatedData, setUpdatedData] = useState(customerData)

  const jwtToken = sessionStorage.getItem('jwtToken');
  useEffect(() => {
    axios.get(`http://localhost:5165/api/customer/${custId}/account`, {
        headers: {
            'Authorization': 'bearer ' + jwtToken
        }
    }).then(res => {
        console.log( res.data);
        setAccountDetails(res.data)
        // customerData = res.data;
        // setcustomerData(res.data);

    })
})
  const handleAccountChange = (e) => {
    setaccountData({ ...accountData, [e.target.name]: e.target.value });
  }

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });

  }
  const SubmitAccount = (event) => {
    if (accountData.accNo === "" || accountData.cardNo === "" || accountData.balance === "" || accountData.pin === 0) {

    }
    else {
      event.preventDefault();
      try {
        axios.post(`http://localhost:5165/api/customer/${custId}/account`, accountData,{headers: {
          'Authorization': 'bearer ' + jwtToken}
      })
          .then(res => {
            console.log(res.data);

            if (res.data) {
              alert(`Account Details Added successfully for ${customerData.name}`);
            }
          })

      } catch (error) {
        console.log(error);
        alert(error);

      }
      // console.log(accountData);
    }
  }
  const handleClick = () => {

  }
  return (
    <>
    <Navbar/>
    <div className='h-screen flex flex-row  justify-center items-center'>
      <Card className="m-2 p-2 lg:max-w-[35rem]  sm:w-1/2 ">
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
            Customer Details
          </Typography>
        </CardHeader>
        <CardBody className='px-20'>

          {/* Add Customer */}

          <form className="mt-8 flex flex-col gap-y-4 ">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Personal Details
            </Typography>


            <Input disabled={disabled} onChange={handleChange}
              name="name" label="Name"
              value={updatedData.name}
            />
            <Input disabled={disabled} type="email" label="Email Address" onChange={handleChange}
              name="email"
              value={updatedData.email}
            />

            <Input disabled={disabled}
              label="Address"
              onChange={handleChange}
              name="address"
              value={updatedData.address}

            />

            <Input disabled={disabled}
              label="Contact Number"
              onChange={handleChange}
              name="contact"
              value={updatedData.contact}

            />


            <Input disabled={disabled}
              label="City"
              onChange={handleChange}
              name="city"
              value={updatedData.city}

            />
            {/* <Select label="Country" menuProps={{ className: "h-48" }}>
            {countries.map(({ name }: any) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select> */}
            {/* <Input disabled={disabled}
            label="Postal Code"
            containerProps={{ className: "mt-4" }}
          /> */}

            <Input disabled={disabled}
              label="Pincode"
              onChange={handleChange}
              name="pincode"
              value={updatedData.pincode}

            />
            <div className='justify-items-center'>
              <Button onClick={() => {
                // console.log(location.state.data1);
                setDisabled(false)
                setName("Done")
                if (name === "Done") {
                  axios.put(`http://localhost:5165/api/Customer/${custId}`, updatedData, {
                    headers: {
                      'Authorization': 'bearer ' + jwtToken
                    }
                  }).then(res => {
                    console.log(res.data);
                    setUpdatedData(res.data)
                    alert("Customer Details Updated Successfully")
                    // delete customerData['custId'];
                    // customerData = res.data;
                    // setcustomerData(res.data);

                  })
                  // console.log(updatedData)
                }
              }}
                // type="submit"
                className="mt-4 mx-10"
              >
                {name}
              </Button>
              <Button
                type="submit"
                className="mt-4 mx-10"
              >
                Delete
              </Button>
            </div>

          </form>

        </CardBody>
      </Card>
              {accountDetails.length>0?(<>
                {console.log(accountDetails)}
                {accountDetails.map((item)=>{
                    return(
                      <div className='flex flex-col'>
                      <Card>
                        <CardBody>
                        <div className="font-bold">Account Details</div>
                        <Typography> Account Number: {item.accNo}</Typography>
                        <Typography>  Card Number:{item.cardNo}</Typography>
                        <Typography>  Balance: {item.balance}</Typography>
                        </CardBody>
                      </Card>
                      </div>
                    )
                })}
              </>)
              :(<></>)}
                <Card className="m-2 p-2 lg:max-w-[35rem]  sm:w-1/2 ">
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
            Account Details
          </Typography>
        </CardHeader>
        <CardBody className='px-20'>

          {/* Add Account */}

          <form className="mt-8 flex flex-col gap-y-4 ">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              Account Details
            </Typography>


            <Input onChange={handleAccountChange}
              name="accNo" label="Account Number"
              value={accountData.name} />

            <Input onChange={handleAccountChange}
              name="cardNo" label="Card Number"
              value={accountData.name} />

            <Input onChange={handleAccountChange}
              name="balance" label="Balance"
              value={accountData.name} />

            <Input onChange={handleAccountChange}
              name="pin" label="Pin" type="password"
              value={accountData.name} />


            <Button
              onClick={SubmitAccount}
              className="mt-4 mx-10"
            >
              Add Account
            </Button>

          </form>

        </CardBody>
      </Card>
      
    </div>
    </>
  )
}



          //   <Input disabled={disabled} type="email" label="Email Address" onChange={handleChange}
          //     name="email"
          //     value={updatedData.email}
          //   />

          //   <Input disabled={disabled}
          //     label="Address"
          //     onChange={handleChange}
          //     name="address"
          //     value={updatedData.address}

          //   />

          //   <Input disabled={disabled}
          //     label="Contact Number"
          //     onChange={handleChange}
          //     name="contact"
          //     value={updatedData.contact}

          //   />


          //   <Input disabled={disabled}
          //     label="City"
          //     onChange={handleChange}
          //     name="city"
          //     value={updatedData.city}

          //   />
          //   <Select label="Country" menuProps={{ className: "h-48" }}>
          //   {countries.map(({ name }: any) => (
          //     <Option key={name} value={name}>
          //       {name}
          //     </Option>
          //   ))}
          // </Select> 
          //   <Input disabled={disabled}
          //     label="Postal Code"
          //     containerProps={{ className: "mt-4" }}
          //   />

          //   <Input disabled={disabled}
          //     label="Pincode"
          //     onChange={handleChange}
          //     name="pincode"
          //     value={updatedData.pincode}

          //   />