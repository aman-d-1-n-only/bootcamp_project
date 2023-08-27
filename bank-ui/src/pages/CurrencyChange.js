import { ArrowsRightLeftIcon, CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CurrencyChange() {
  const [symbols,setSymbols]=useState([]);
  const[result,setResult]=useState("");
  const currencyInitialValues={
    amount:"",
    from:"",
    to:""
  }
  const [currency,setCurrency]=useState(currencyInitialValues)
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
    axios.post(`http://data.fixer.io/api/symbols?access_key=${API_KEY}`)
    .then(res => {
      console.log(res.data.symbols);
      setSymbols(Object.keys(res.data.symbols))
  })
}, []);

const handleClick=()=>{
  if(currency.amount === "" || currency.from === ""  || currency.to === "" ) {
console.log("empty")
setErrorMessage("All quatities are required")
  } else if (isNaN(currency.amount) || parseFloat(currency.amount) <= 0) {
  setErrorMessage("Please enter a valid amount value");
} else {
    setErrorMessage("");
      convertCurrency();
  }
};

const convertCurrency = () => {
  console.log(currency);
  const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
  axios.post(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base =${currency.from}`) 
  .then(res => {
    // let temp=currency.amount+' '+currency.from+' = '+(currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from]))+' '+currency.to
    const temp = `${currency.amount} ${currency.from} = ${(currency.amount * (res.data.rates[currency.to] / res.data.rates[currency.from]))} ${currency.to}`;
        
    setResult(temp);
    console.log(temp);
})
};

const handleChange=(e)=>
{
  setCurrency({ ...currency, [e.target.id]: e.target.value });
}

const handleSwap = () => {
  setCurrency({
    ...currency,
    from: currency.to,
    to: currency.from
  });
};

const handleReset = () => {
  setCurrency(currencyInitialValues);
  setResult("");
  setErrorMessage("");
};


  return (
    <>
          
          {/* <Nav/> */}
          <div className=" min-h-fit  h-full flex justify-center items-center "
             >
            <Card className="w-96 ">
                <CardHeader
                    color="gray"
                    className="py-6 mb-4 grid place-items-center"
                >
                    <div className="text-white mb-4">
                        
                        <CurrencyRupeeIcon className="h-16 w-16" />
                    </div>
                    <Typography variant="h3" color="white">
                      Currency Change
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                            
                            <form className="flex flex-col gap-y-6">
                            <Input 
                            onChange={handleChange} 
                            value={currency.amount}
                            label="Enter Amount" size="lg" 
                            type="number"
                            id="amount"
                            required />    
<div className=' w-full flex  items-end justify-around'>

<div >
      <Typography
        variant="small"
        color="gray"
        className="my-1  font-normal"
      >From</Typography>

      <select
       id="from"
       label="From"
       onChange={handleChange}
       value={currency.from}
      placeholder='From'
      className='p-2 border-2 border-blue-gray-100 rounded-lg w-28'
        >
           <option value="" hidden disabled>
          From
        </option>
        {symbols.map((item,index)=>{
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
      </select>
      </div>

     <ArrowsRightLeftIcon className='h-8 w-8 mb-1 p-1 cursor-pointer hover:scale-110 rounded-lg hover:shadow hover:bg-gray-50' onClick={handleSwap}/>     
      {/* <Select
      id="to"
      label="To"
      value={currency.to}
      onChange={handleChange}
      required 
        >
        {symbols.map((item,index)=>{
            return(
              <Option key={index} value={item}>{item}</Option>
            )
          })}
      </Select> */}
      <div><Typography
        variant="small"
        color="gray"
        className="my-1 font-normal"
      >To</Typography>
      <select
      id="to"
      label="To"
      value={currency.to}
      onChange={handleChange}
      className='p-2 border-2 border-blue-gray-100 rounded-lg w-28'
        >
          <option value="" hidden disabled>
          To
        </option>
        {symbols.map((item,index)=>{
            return(
              <option key={index} value={item}>{item}</option>
            )
          })}
      </select></div>
      
    
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
       
                         <Button
                     className="my-2"
                     onClick={handleClick}                   
                      >
                            Convert
                        </Button>
                    </form>
                    <div>

        {result && 
                        (<Card className='mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300'>
                            <CardBody>
                                <Typography className="place-items-center">
                               {result}
                                    </Typography>
                                   
                            </CardBody>
                        </Card>)
                 }
        </div>
                            </CardBody>
               
            </Card>
           
        </div>
       

                        </>
                  

  )
}
