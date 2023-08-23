import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditPin() {

    
    const pinInitialValues = {
        accNo: 0,
       existingPin:"",
       newPin:"",
       confirmNewPin:""
    };
    const visibilityInitialValues={  
        accNo: false,
        ExistingPin:false,
        NewPin:false};

    const [visibility,setVisibility]=useState(visibilityInitialValues)
    const [errorMsg,setErrorMsg]=useState({
        accNo: "",
       ExistingPin:"",
       NewPin:""

    })
    const [pinDetails,setPinDetails]=useState(pinInitialValues)
    const handleChange = (e) => {
      
        setPinDetails({ ...pinDetails, [e.target.name]: e.target.value });
    }
    const changePin=()=>{
        const jwtToken=sessionStorage.getItem("jwtToken")
        if(pinDetails.newPin !== pinDetails.confirmNewPin)
        { 
            toast.error("New pin and confirm new pin should be same")
        }
        else{
        // delete pinDetails["confirmNewPin"];
        setVisibility(visibilityInitialValues)
          
        console.log(visibility);
        axios.post(`http://localhost:5165/changePin`,pinDetails,{
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success(`Pin Changed successfully for Account Number : ${res.data.accId}`)
          window.location.reload();
        }
        )
        .catch((error)=>{
            // console.log(Object.keys(error.response.data.errors));
            // Object.keys(error.response.data.errors).map((item,index)=>{
            //     // console.log(error.response.data.errors[item]);
            //     setVisibility({ ...visibility, [item]: true })
            //     setErrorMsg({...errorMsg,[item]:error.response.data.errors[item]})
            //     console.log(item,visibility,errorMsg,index)
            // })
            // console.log(error.response.data.errors);
            console.log(error.response);
        }
        ).catch((error) => {
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
    };
    }
  return (
    <>
                               <div className="relative min-h-fit  h-full flex justify-center items-center pt-10"
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
                        Change Pin
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                            
                            <form className="mt-12 flex flex-col gap-4">
                            <Input onChange={handleChange} label="Enter Account Number" size="lg" 
                            type="number"
                            name="accNo"
                            pattern="[0-9]{1}"
                            required /> 
                              <span className={`${visibility.accNo? "block": "hidden"} `}>
                            {errorMsg.accNo}
                            </span>

                            <Input onChange={handleChange} label="Enter Old Pin" size="lg" 
                           name="existingPin"
                            type="number"
                            required />
                            <span className={`${visibility.ExistingPin? "block": "hidden"} `}>
                            {errorMsg.ExistingPin}
                            </span>

                        <Input onChange={handleChange} label="Enter New Pin" size="lg"
                        name= "newPin"
                            required />
                              <span className={`${visibility.NewPin? "block": "hidden"} `}>
                            {errorMsg.NewPin}
                            </span>

                        <Input onChange={handleChange} label="Confirm New Pin" size="lg" 
                           required 
                           name="confirmNewPin"/>

                         <Button
                     className="mt-4"
                     onClick={changePin}   
                      >
                            Change Pin
                        </Button>
                    </form>
                            
                            </CardBody>
               
            </Card>
            <ToastContainer/>
        </div>
                        </>
                  

  )
}
