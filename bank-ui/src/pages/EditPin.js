import React from 'react'

export default function EditPin() {
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
                            <Input label="Enter Old Pin" size="lg" 
                           
                            type="number"
                            
                            required />

                        <Input label="Enter New Pin" size="lg" 
                           
                            type="number"
                            required />

                         <Button 
                     
                     className="mt-4 "
                    //  type="submit"
                    
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
