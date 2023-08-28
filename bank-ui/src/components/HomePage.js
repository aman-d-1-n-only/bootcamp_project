import React from "react";
import { CustomerCard } from "./Cards";
import Card1 from "../img/Cards/Card1.png";
import Card2 from "../img/Cards/Card2.png";
import Card3 from "../img/Cards/Card3.png";
import Card4 from "../img/Cards/Card4.png";
import Card5 from "../img/Cards/Card5.png";
import Card6 from "../img/Cards/Card6.png";
import Card7 from "../img/Cards/Card7.png";
import Card8 from "../img/Cards/Card8.png";
import { Nav } from "./Nav";

import LoginImage from "../img/LoginImage.png";
import { Button } from "@material-tailwind/react";

export const Customer = () => {
  return (
    <>
    {/* <Nav/> */}
    <div className=" lg:h-full sm:min-h-screen max-w-full bg-gray-100 overflow-x-none">
  <div className="py-32 bg-cover bg-no-repeat bg-fixed" 
  
  style={{ backgroundImage: `url(${LoginImage})` }}>
      
  {/* style={{ backgroundImage: `url(${Card1})` }}> */}
    {/* style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')" }}> */}
    <div className="container m-auto text-center opacity-100 ">
      <h1 className="text-4xl font-bold mb-2 text-gray-800">Welcome!!!</h1>
      <h3 className="text-2xl mb-8 text-gray-600 ont-normal leading-wide ">Thank you for choosing us for your financial needs.</h3>
      <Button size="lg" className="rounded-full">View Services</Button>
    </div>
  </div>
        <div className="w-full h-full bg-gray-100 py-6 overflow-x-none">
        <section className="container mx-auto p-10 bg-white  shadow-md my-8 overflow-x-none">
          <h4 className="text-3xl font-bold text-center text-gray-600 mb-8">Our Services</h4>
          <div className="flex flex-wrap items-center justify-center ">  <CustomerCard
          cardName="add-customer"
          img={Card1}
          />
        <CustomerCard
          cardName="view-customer"
          img={Card2}
        />
        <CustomerCard
          cardName="transactions"
          img={Card3}
        />
        <CustomerCard
          cardName="cash-withdraw"
          img={Card4}
        />
        <CustomerCard
          cardName="changepin"
          img={Card5}
        />
        <CustomerCard
          cardName="fund-transfer"
          img={Card6}
        />
         <CustomerCard
          cardName="currency-change"
          img={Card7}
        />
        <CustomerCard
          cardName="cheque-deposit"
          img={Card8}
          />
     </div> 
        
        </section>
        
{/*         
        <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Services</h2>
            <div className="flex flex-wrap items-center justify-center ">  <CustomerCard
          cardName="add-customer"
          img={Card1}
          />
        <CustomerCard
          cardName="view-customer"
          img={Card2}
        />
        <CustomerCard
          cardName="transactions"
          img={Card3}
        />
        <CustomerCard
          cardName="cash-withdraw"
          img={Card4}
        />
        <CustomerCard
          cardName="changepin"
          img={Card5}
        />
        <CustomerCard
          cardName="fund-transfer"
          img={Card6}
        />
         <CustomerCard
          cardName="currency-change"
          img={Card7}
        />
        <CustomerCard
          cardName="cheque-deposit"
          img={Card8}
          />
     </div>
          </div>
        </section> */}
         {/* <footer className="bg-gray-200 text-center lg:text-left fixed bottom-0 w-full shadow-shade justify-center flex items-center  h-10">
        <div className="text-gray-700 text-center p-1 z-100 ">
          &copy; Copyright: {new Date().getFullYear()}
        </div>
      </footer> */}
        </div>
        
     
 </div>
        </>
  );
};