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



const FundTransfer = () => {
    const [accountNoOne , setAccountNoOne] = useState(0);
    const [accountNoTwo , setAccountNoTwo] = useState(0);
    const [amount, setAmount] = useState(0);
    const [pin,setPin] = useState(0);

    const handleAccOne = (event) =>{
        setAccountNoOne(event.target.value);
    }
    const handleAccTwo = (event) =>{
         setAccountNoTwo(event.target.value)
    } 
    const handleAmount = (event) =>{
        setAmount(event.target.value);
    }
    const handlePin = (event) =>{
        setPin(event.target.value);
    }
     return (<>
        
        <div className="relative min-h-screen min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", }}>
            <Card className="w-96 ">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className=" mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Fund Transfer
                    </Typography>
                </CardHeader>
                <form>
                    <CardBody className="flex flex-col gap-4">
                        <Input label="Enter Sender's Account Number" size="lg" id="customerId"
                            required
                            name="customerId"
                            type="number"
                            value = {accountNoOne}
                            onChange = {handleAccOne}
                            
                        />
                        <Input label="Enter Reciever's Account Number" size="lg" 
                            id="accountId"
                            name="accountId"
                            type="number"
                            value = {accountNoTwo}
                            onChange = {handleAccTwo}
                            required />

                       <Input label="Enter Amount" size="lg" 
                            id="accountId"
                            name="accountId"
                            type="number"
                            value = {amount}
                            onChange = {handleAmount}
                            required />
                        <Input label="Enter PIN" size="lg" 
                            id="accountId"
                            name="accountId"
                            type="password"
                            value = {pin}
                            onChange = {handlePin}
                            required />
                         <Button variant="gradient"
                        // type="submit"
                         fullWidth 
                        //  onClick = {handleBalance}
                        >
                            Click To Transfer
                        </Button>
                        {/* {(accountData) ? 
                        (<Card>
                            <CardBody>
                                Account Number : {accountData.accNo}
                                <br/>
                                Balance : {accountData.balance}
                            </CardBody>
                        </Card>)
                        :(<></>) } */}
                        
                    </CardBody>
                    <CardFooter className="pt-0">
                    </CardFooter>
                </form>
            </Card>
        </div>
    </>)

}
export default FundTransfer;
