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
} from "@material-tailwind/react";
import axios from 'axios';



const CashWithdraw = () => {
    const jwtToken = sessionStorage.getItem('jwtToken')
    const navigate = useNavigate();
    const [customerId, setCustomerId] = useState(0);
    const [accountId, setAccountId] = useState(0);
    const [amount, setAmount] = useState();
    const [accountData , setAccountData] = useState({
        
        "accNo": 0,
        "balance": 0,
        "cardNo":0 ,
        "pin": 0
    });
    const [updatedAccount, setUpdatedAccount] = useState({
        
            "accNo": 0,
            "balance": 0,
            "cardNo": 0,
            "pin": 0
          
    })
    
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
            })


           
            //     }
            // }).catch(function (error) {
            //     if (error.response) {
            //         if (error.response.status) {
            //             alert("Invalid Credentials. Please Try again");
            //         }
            //     }
            // })
        }}
        const handleAccId = (e) => {
            setAccountId(e.target.value)
        }
        const handleCusId = (e) =>{
             setCustomerId(e.target.value)
        }
        const handleAmt = (e) => {
            setAmount(e.target.value)
        }

    const handleWithdraw = () => {
        // setUpdatedAccount({...accountData , [balance]:(accountData.balance - amount)})
        console.log("amount:" + amount)
        if(amount > accountData.balance){
            alert("Insufficient Balance")
        }
        // let temp =;
        accountData.balance=accountData.balance - amount;
    
    // setAccountData({[e.target.name]:accountData.balance-amount})

    //    setAccountData (accountData => ({
    //     ...accountData,
    //     ...temp

    //    }))
    // accountData[balance] = (accountData[balance] - amount)
    delete accountData['accId']
    console.log(accountData);

        axios.put(`http://localhost:5165/api/customer/${customerId}/account/${accountId}`, accountData , {
            headers: {
                'Authorization': 'bearer ' + jwtToken
            }
        }).then((response) => {
            console.log("response")
            console.log(response.data);
            alert("Account updated Successfully")
        }).catch((error) => {
            console.log(error)
        })
    }

    // }
    // })
    return (<>
        {/* <div className="h-screen flex justify-center items-center"> */}
        <div className="relative min-h-screen min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", }}>
            <Card className="w-96 ">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className=" mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Withdraw Money
                    </Typography>
                </CardHeader>
                <form>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Enter CustomerId" size="lg" id="customerId"
                            required
                            name="customerId"
                            type="number"
                            value = {customerId}
                            onChange = {handleCusId}
                            
                        />
                        <Input label="Enter Account Number" size="lg" 
                            id="accountId"
                            name="accountId"
                            type="number"
                            value = {accountId}
                            onChange = {handleAccId}
                            required />
                       
                       <Button variant="gradient"
                        // type="submit"
                         fullWidth 
                         onClick = {handleBalance}>
                            Check Balance
                        </Button>
                        {(accountData) ? 
                        (<Card>
                            <CardBody>
                                Account Number : {accountData.accNo}
                                <br/>
                                Balance : {accountData.balance}
                            </CardBody>
                        </Card>)
                        :(<></>) }
                        <Input label="Enter Amount to withdraw" size="lg" 
                            id="amount"
                            name="balance"
                            type="number"
                            value = {amount}
                            onChange = {handleAmt}
                            required />
                        
                    </CardBody>
                    <CardFooter className="pt-0">
                       
                       
                    <Button 
                     variant="gradient" 
                    //  type="submit"
                     fullWidth
                     onClick = {handleWithdraw}
                      >
                            Click to withdraw
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    </>)

}
export default CashWithdraw;
