import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function EditPin() {
    const pinInitialValues = {
        accNo: 0,
       existingPin:"",
       newPin:"",
       confirmNewPin:""
    };
    const [pinDetails,setPinDetails]=useState(pinInitialValues)
    const handleChange = (e) => {
        setPinDetails({ ...pinDetails, [e.target.name]: e.target.value });
    }
    const changePin=()=>{
        const jwtToken=sessionStorage.getItem("jwtToken")
        if(pinDetails.newPin!==pinDetails.confirmNewPin)
        {
            alert("New pin and confirm new pin should be same")
        }
        else{
        delete pinDetails["confirmNewPin"];
        axios.post(`http://localhost:5165/changePin`,pinDetails,{
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        })
        .then((res) => {
          console.log(res.data);
          alert(`Pin Changed successfully for Account Number : ${res.data.accId}`)
          window.location.reload();
        }
        )
    };
    }
  return (
    <>
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
                        Change Pin
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                            
                            <form className="mt-12 flex flex-col gap-4">
                            <Input onChange={handleChange} label="Enter Account Number" size="lg" 
                            type="number"
                            name="accNo"
                            
                            required />     
                            <Input onChange={handleChange} label="Enter Old Pin" size="lg" 
                           name="existingPin"
                            type="number"
                            
                            required />

                        <Input onChange={handleChange} label="Enter New Pin" size="lg"
                        name= "newPin"
                            required />

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
        </div>
                        </>
                  

  )
}
