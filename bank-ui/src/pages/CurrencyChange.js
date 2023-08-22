import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'

export default function CurrencyChange() {

  return (
    <>
                               <div className="relative min-h-fit  h-full flex justify-center items-center pt-16"
             >
            <Card className="w-96 ">
                <CardHeader
                    color="gray"
                    className="py-6 mb-8 grid place-items-center"
                >
                    <div className="text-white mb-4">
                        {/* <BanknotesIcon className="h-14 w-14" /> */}
                        <CurrencyRupeeIcon className="h-16 w-16" />
                    </div>
                    <Typography variant="h3" color="white">
                      Currency Change
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                            
                            <form className="mt-12 flex flex-col gap-4">
                            <Input 
                            // onChange={handleChange} 
                            label="Enter Account Number" size="lg" 
                            type="number"
                            name="accNo"
                            required />    

<Select
      name="from"
      label="From"
      value="rupee"
        >
        <Option value="rupee">Rupee</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
      
      <Select
      name="to"
      label="To"
      value="dollar"
        >
        <Option value="rupee">Rupee</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    

                         <Button
                     className="mt-4"                   
                      >
                            Confirm Change
                        </Button>
                    </form>
                            
                            </CardBody>
               
            </Card>
        </div>
                        </>
                  

  )
}
