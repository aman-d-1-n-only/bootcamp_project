import { CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useState } from 'react'
import Navbar from './Navbar';

export default function CurrencyChange() {
  const [symbols,setSymbols]=useState([]);
  const[result,setResult]=useState("");
  const currencyInitialValues={
    amount:"",
    from:"",
    to:""
  }
  const [currency,setCurrency]=useState(currencyInitialValues)
 
  useEffect(() => {
    const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
    axios.post(`http://data.fixer.io/api/symbols?access_key=${API_KEY}`)
    .then(res => {
      console.log(res.data.symbols);
      setSymbols(Object.keys(res.data.symbols))
  
  })
}, []);
const handleClick=()=>{
  console.log(currency);
  const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
  axios.post(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base =${currency.from}`) 
  .then(res => {
    let temp=currency.amount+' '+currency.from+' = '+(currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from]))+' '+currency.to
    setResult(temp);
    console.log(temp);
//  axios.post(`http://data.fixer.io/api/convert?access_key=${API_KEY}& from = ${currency.from}& to = ${currency.to}& amount = ${currency.amount}`)
// axios.post(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currency.from}&symbols=${currency.to}`)
  // alert(`${currency.amount} ${currency.from} = ${currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from])} ${currency.to}`);
  // alert(res.data.error.info)
  // result=`${currency.amount} ${currency.from} = ${currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from])} ${currency.to}`;
})
}
const handleChange=(e)=>
{
  setCurrency({ ...currency, [e.target.id]: e.target.value });


}

  return (
    <>
          
          <Navbar/>
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
                            onChange={handleChange} 
                            value={currency.amount}
                            label="Enter Amount" size="lg" 
                            type="number"
                            id="amount"
                            required />    

<select
      id="from"
      label="From"
      onChange={handleChange}
      value={currency.from}
        >
          {symbols.map((item,index)=>{
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
        {/* <Option value="dollar">Dollar</Option> */}
      </select>
      
      <select
      id="to"
      label="To"
      value={currency.to}
      onChange={handleChange}
        >
        {symbols.map((item,index)=>{
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
      </select>
    

                         <Button
                     className="mt-4"
                     onClick={handleClick}                   
                      >
                            Convert
                        </Button>
                    </form>
                            
                            </CardBody>
               
            </Card>
           
        </div>
        <div>
        {(result!=="") ? 
                        (<Card className='mb-2 mt-6 outline-single shadow-lg mx-6 bg-gradient-to-t from-gray-300'>
                            <CardBody>
                                <Typography className="place-items-center">
                               {result}
                                    </Typography>
                                   
                            </CardBody>
                        </Card>)
                        :(<></>) }
        </div>

                        </>
                  

  )
}
