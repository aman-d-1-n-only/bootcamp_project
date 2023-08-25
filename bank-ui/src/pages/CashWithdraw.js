import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import axios from 'axios';
import { BanknotesIcon, CurrencyRupeeIcon } from '@heroicons/react/24/solid';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CashWithdraw = () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState(0);
    const [accountId, setAccountId] = useState(0);
    const [amount, setAmount] = useState();
    const [pin, setPin] = useState("");
    
  const [visible, setVisible] = useState(false);
    
    const [type, setType] = useState("check balance");

    const [accountData , setAccountData] = useState({
        "accId": 0,
        "accType": "",
        "balance": 0,
        "cardNo": "",
        "pin": ""
    });
    // const [updatedAccount, setUpdatedAccount] = useState({
        
    //         "accNo": 0,
    //         "balance": 0,
    //         "cardNo": 0,
    //         "pin": 0
          
    // })
    
    // const handleChange = (e) => {
    //     setloginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    // };
    const handleBalance = (e) => {
        if (customerId === 0 || accountId === 0) {

        }
        else {
            e.preventDefault();
            
             axios.get(`http://localhost:5165/api/customer/${customerId}/account/${accountId}` , {
                headers: {
                    'Authorization': 'bearer ' + jwtToken
                }
            }).then(res => {
                console.log(res.data);
                setAccountData(res.data);
            })
            .catch(function(error) {
                console.log(error)
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


           
            //     }
            // }).catch(function (error) {
            //     if (error.response) {
            //         if (error.response.status) {
            //             alert("Invalid Credentials. Please Try again");
            //         }
            //     }
            // })
        }
    
        setVisible(!visible);
    }
        const handleAccId = (e) => {
            setAccountId(e.target.value)
        }
        const handleCusId = (e) =>{
             setCustomerId(e.target.value)
        }
        const handleAmt = (e) => {
            setAmount(e.target.value)
        }
        const handlePin = (e) => {
            setPin(e.target.value)
        }

    const handleWithdraw = () => {
        // setUpdatedAccount({...accountData , [balance]:(accountData.balance - amount)})
        // console.log("amount:" + amount)
        // if(amount > accountData.balance){
        //     alert("Insufficient Balance")
        // }
        // let temp =;
        // accountData.balance=accountData.balance - amount;
    
    // setAccountData({[e.target.name]:accountData.balance-amount})

    //    setAccountData (accountData => ({
    //     ...accountData,
    //     ...temp

    //    }))
    // accountData[balance] = (accountData[balance] - amount)
    // delete accountData['accId']
    // console.log(accountData);
    const withData = {
        accNo: parseInt(accountId),
        amount: parseInt(amount),
        pin: pin
    }

        console.log("withData")
         console.log(typeof withData.accNo)
        axios.post(`http://localhost:5165/cashWithdrawal`, withData , {
            headers: {
                'Authorization': 'bearer ' + jwtToken
            }
        }).then((response) => {
            console.log("response")
            console.log(response.data);
            alert(`Withdrawal Successful Updated balance = ${response.data.balance}`)
            if(response.data){
                window.location.reload();
            }
        }).catch((error) => {
            console.log(error)
            if(error.response.status === 404){
                toast.error(error.response.data)
            }
            else if(error.response.status === 400){
                Object.keys(error.response.data.errors).map((key, index) => {
                     error.response.data.errors[key].map((val, i) => {
                        console.log(val)
                        toast.error(val)
                     })  
                 })  
            }
        })
    }

    // }
    // })
    return (<>
             <div className="relative min-h-fit  h-full flex justify-center items-center pt-20"
             >
            <Card className="w-96 ">
                <CardHeader
                    color="gray"
                    className="py-6 mb-4 grid place-items-center"
                >
                    <div className="text-white mb-4">
                        {/* <BanknotesIcon className="h-14 w-14" /> */}
                        <CurrencyRupeeIcon className="h-16 w-16" />
                    </div>
                    <Typography variant="h3" color="white">
                        Withdraw Money
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                <Tabs value={type} className="overflow-visible">
                    
                <TabsHeader className="relative z-0 ">
                            <Tab value="check balance" onClick={() => setType("check balance")}>
                            Check Balance
                            </Tab>
                            <Tab value="money withdraw" onClick={() => setType("money withdraw")}>
                           Withdraw Money 
                            </Tab>
                        </TabsHeader>
                        <TabsBody>
                            <TabPanel value="check balance" className="p-0">
                                <form className="mt-8 flex flex-col gap-y-4 ">

                        <Input label="Enter CustomerId" size="lg" id="customerId"
                            required
                            name="customerId"
                            // type="number"
                            value = {customerId}
                            onChange = {handleCusId}
                            
                        />
                        <Input label="Enter Account Number" size="lg" 
                            id="accountId"
                            name="accountId"
                            // type="number"
                            value = {accountId}
                            onChange = {handleAccId}
                            required />
                       
                       <Button 
                        // type="submit"
                         fullWidth 
                         onClick = {handleBalance} className="mt-4 ">
                            Check Balance
                        </Button>
                        </form>
                        {(visible && accountData.accId!==0) ? 
                        (<Card className='mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300'>
                            <CardBody>
                                <Typography>
                                Account Number : {accountData.accId}
                                    </Typography>
                                    <Typography> Balance : {accountData.balance}
                                    </Typography>
                               
                            </CardBody>
                        </Card>)
                        :(<></>) }
                         </TabPanel>

                            <TabPanel value="money withdraw" className="p-0">
                            <form className="mt-12 flex flex-col gap-4">
                        <Input label="Enter Account Number" size="lg" 
                            id="amount"
                            name="balance"
                            // type="number"
                            value = {accountId}
                            onChange = {handleAccId}
                            required
                         />
                         
                          <Input label="Enter Amount to withdraw" size="lg" 
                            id="amount"
                            name="balance"
                            type="number"
                            value = {amount}
                            onChange = {handleAmt}
                            required />
                            

                         <Input label="Enter Pin" size="lg" 
                            id="amount"
                            name="balance"
                            // type="number"
                            value = {pin}
                            onChange = {handlePin}
                            required />
                          <Button 
                     
                     className="mt-4 "
                    //  type="submit"
                     fullWidth
                     onClick = {handleWithdraw}
                      >
                            Withdraw
                        </Button>
                    </form>
                            </TabPanel>
                    </TabsBody>
                            </Tabs>
                            </CardBody>
               
            </Card>
            <ToastContainer/>
        </div>
        
    </>)

}
export default CashWithdraw;