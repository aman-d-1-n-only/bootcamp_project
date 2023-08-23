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
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FundTransfer = () => {
    // toast.configure();
    const jwtToken = sessionStorage.getItem('jwtToken')
    const [errors, setErrors] = useState([])
    // const errorDiv = error 
    //     ? <div className="error">
    //         <i class="material-icons error-icon">error_outline</i>
    //         {error}
    //       </div> 
    //     : '';
   const [data , setData] = useState( {
        "accNo1": 0,
        "accNo2": 0,
        "amount": 0,
        "pin": ""
      })
      
    // const [accountNoOne , setAccountNoOne] = useState(0);
    // const [accountNoTwo , setAccountNoTwo] = useState(0);
    // const [amount, setAmount] = useState(0);
    // const [pin,setPin] = useState(0);

    const handleData = (event) =>{
        if(event.target.name === "pin"){
        setData({...data , [event.target.name]:event.target.value});
   
        }
        else{
        setData({...data , [event.target.name]:parseInt(event.target.value)});
        }
    }
    const handleTransfer = () => {
        console.log(data)
           axios.post(`http://localhost:5165/fundTransfer` , data 
           ).then((response) => {
            console.log("fund transfer response")
            console.log(response.data)
            alert("Fund Transfer is Successful")
           }).catch((error) => {
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
           const txnData = {
            "status": "Success",
            "amount": data.amount,
            "debitedFrom": data.accNo1,
            "creditTo": data.accNo2
          }
        axios.post(`http://localhost:5165/api/txns` , txnData)
        .then((response) => {
            console.log("txn post response")
            console.log(response.data)
        }).catch((error) =>{
            if(error.response){
            console.log(error.response.data.errors)
            }
        })
    }
    
     return (<>
        {/* <div className="relative min-h-screen min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", }}> */}
            <div className="relative min-h-fit  h-full flex justify-center items-center pt-20"
             >
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
                        <Input label="Enter Sender's Account Number" size="lg" 
                            id="accNo1"
                            name="accNo1"
                            type="number"
                            // value = {accountNoOne}
                            onChange = {handleData}
                            required
                            
                        />
                        <Input label="Enter Reciever's Account Number" size="lg" 
                            id="accNo2"
                            name="accNo2"
                            type="number"
                            // value = {accountNoTwo}
                            onChange = {handleData}
                            required />

                       <Input label="Enter Amount" size="lg" 
                            id="amount"
                            name="amount"
                            type="number"
                            // value = {amount}
                            onChange = {handleData}
                            required />
                        <Input label="Enter PIN" size="lg" 
                            id="pin"
                            name="pin"
                            type="text"
                            // value = {pin}
                            onChange = {handleData}
                            required />
                          
                     
                         <Button variant="gradient"
                        //  type="reset"
                         fullWidth 
                          onClick = {handleTransfer}
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
            <ToastContainer/>
        </div>
    </>)

}
export default FundTransfer;



