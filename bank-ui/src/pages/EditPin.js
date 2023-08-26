import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'
import { set } from 'react-hook-form';
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
    const [pinDetails,setPinDetails]=useState(pinInitialValues);
    
  const [errorMessage, setErrorMessage] = useState("");
    const handleChange = (e) => {
        if ((e.target.name=== "existingPin")|| (e.target.name=== "newPin")||(e.target.name=== "confirmNewPin")) {
            if (e.target.value.length > 4) {
              setErrorMessage("Pin length should less than 4");
            }
        
        else
        setErrorMessage("");   }
            
        setPinDetails({ ...pinDetails, [e.target.name]: e.target.value });
    }
    const changePin=()=>{
        const jwtToken=sessionStorage.getItem("jwtToken")
        if(pinDetails.newPin !== pinDetails.confirmNewPin)
        { 
            // toast.error("New pin and confirm new pin should be same")
            setErrorMessage("New pin and confirm new pin should be same");
        }
        else{
        // delete pinDetails["confirmNewPin"];
        setVisibility(visibilityInitialValues)
        if (visibility.accNo === "" || visibility.ExistingPin  === "" || visibility.NewPin ==="") {
            setErrorMessage("All the quatities are required ");
          } 
          
        console.log(visibility);
        axios.post(`http://localhost:5165/changePin`,pinDetails,{
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        })
        .then((res) => {
          console.log(res.data);
        //   toast.success(`Pin Changed successfully for Account Number : ${res.data.accId}`)
        alert(`Pin Changed successfully for Account Number : ${res.data.accId}`)
          window.location.reload();
        }
        ).catch((error) => {
            if(error.response.status === 404){
                // toast.error(error.response.data);
                setErrorMessage(error.response.data);

            }
            else if(error.response.status === 400){
                Object.keys(error.response.data.errors).map((key, index) => {
                        // setErrors(error.response.data.errors[key])
                     error.response.data.errors[key].map((val, i) => {
                        // toast.error(val)
                        setErrorMessage(val);
                     })  
                 })  
            }
        })
    };
    }
  return (
    <>
                               <div className=" min-h-fit  h-full flex justify-center items-center "
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
                            
                            <form className=" flex flex-col gap-4">
                            <Input onChange={handleChange} label="Enter Account Number" size="lg" 
                           
                            name="accNo"
                            pattern="[0-9]{1}"
                            required /> 
                              <span className={`${visibility.accNo? "block": "hidden"} `}>
                            {errorMsg.accNo}
                            </span>

                            <Input onChange={handleChange} label="Enter Old Pin" size="lg" 
                           name="existingPin" 
                        //    type="password"
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
<div className="text-red-600 mt-2 text-sm"> {errorMessage} </div>
                         <Button
                     className=""
                     onClick={changePin}   
                      >
                            Change Pin
                        </Button>
                    </form>
                    
          
                            </CardBody>
               
             </Card>
          {/*  {pinError && <p>Your pin is invalid</p>}
            {AccError && <p>Your Account Number is invalid</p>} */}
            <ToastContainer/>
        </div>
                        </>
                  

  )
}
