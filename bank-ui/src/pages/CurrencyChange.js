import { ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, CurrencyRupeeIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from '@material-tailwind/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Nav } from '../components/Nav';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import {ToastContainer, toast} from 'react-toastify';


export default function CurrencyChange() {
  const [symbols,setSymbols]=useState([]);
  const[result,setResult]=useState("");
  const currencyInitialValues={
    amount:"",
    from:"",
    to:""
  }
  const [currency,setCurrency]=useState(currencyInitialValues)
  
  const flip=()=> {
    
    var temp = currency.from;
    currency.from=currency.to;
    currency.to=temp;
    console.log(currency);
}
 
  const [errorMessage, setErrorMessage] = useState("");
  const [symbolFrom, setSymbolFrom] = useState("");
  const [symbolTo, setSymbolTo] = useState("");
  useEffect(() => {
    const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
    axios.post(`http://data.fixer.io/api/symbols?access_key=${API_KEY}`)
    .then(res => {
      console.log(res.data.symbols);
      setSymbols(Object.keys(res.data.symbols))
  
  })
}, []);

const handleExchange=()=>{
  console.log("inside exchange");
  setSymbolFrom =currency.from;
  setSymbolTo=currency.to;
}

const handleClick=()=>{
  if ((currency.amount === "") || (currency.from 
    === "") || (currency.to === ""))
    {
setErrorMessage("All quatities are required");
    }
    else {
  console.log("currency",currency);
  const API_KEY='1ffa00d5eeb5f22671e4cdeb120dca07'
  axios.post(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base =${currency.from}`) 
  .then(res => {
    let temp=currency.amount+' '+currency.from+' = '+(currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from]))+' '+currency.to
    setResult(temp);
    console.log(temp);
    
setErrorMessage("");
//  axios.post(`http://data.fixer.io/api/convert?access_key=${API_KEY}& from = ${currency.from}& to = ${currency.to}& amount = ${currency.amount}`)
// axios.post(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base=${currency.from}&symbols=${currency.to}`)
  // alert(`${currency.amount} ${currency.from} = ${currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from])} ${currency.to}`);
  // alert(res.data.error.info)
  // result=`${currency.amount} ${currency.from} = ${currency.amount*(res.data.rates[currency.to]/res.data.rates[currency.from])} ${currency.to}`;
}
  )
 .catch(function(error) {
                console.log(error)
                // alert(error.response.data)
                    // toast.error(error.response.data)
                
              })
}}
const handleChange=(e)=>
{
  setCurrency({ ...currency, [e.target.id]: e.target.value });


}

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
                        {/* <BanknotesIcon className="h-14 w-14" /> */}
                        <CurrencyRupeeIcon className="h-16 w-16" />
                    </div>
                    <Typography variant="h3" color="white">
                      Currency Change
                    </Typography>
                </CardHeader>
              
                <CardBody className='px-10'>
                            
                            <form className="flex flex-col gap-y-6 my-4">
                            <Input 
                            onChange={handleChange} 
                            value={currency.amount}
                            label="Enter Amount" size="lg" 
                            type="number"
                            id="amount"
                            required />    
<div className=' w-full flex  items-end justify-around'>
{/* <Select
      id="from"
      label="From"
      onChange={handleChange}
      value={currency.from}
      required 
        >
          {symbols.map((item,index)=>{
            return(
              <Option key={index} value={item}>{item}</Option>
            )
          })}
          
        {/* <Option value="dollar">Dollar</Option> */}
      {/* </Select> */} 
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
       value={symbolFrom}
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

     <ArrowsRightLeftIcon className='h-6 w-6 m-2 '  onClick={handleExchange}   />     
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
      value={symbolTo}
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

      <div className="text-red-600 text-sm ml-2"> {errorMessage} </div>
                         <Button
                     className=""
                     onClick={handleClick}                   
                      >
                            Convert
                        </Button>
                    </form>
                    <div>

        {((result!=="") && (currency.amount!=="") && (currency.from 
        !== "") && (currency.to!=="")) ? 
                        (<Card className='mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300'>
                            <CardBody>
                                <Typography className="place-items-center">
                               {result}
                                    </Typography>
                                   
                            </CardBody>
                        </Card>)
                        :(<></>) }
        </div>
                            </CardBody>
               
            </Card>
           
        </div>
       

                        </>
                  

  )
}
